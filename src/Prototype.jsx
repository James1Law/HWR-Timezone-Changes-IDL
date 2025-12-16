import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Clock, ArrowLeft, ArrowRight, Plus, Trash2, Settings, AlertTriangle } from 'lucide-react';

const Prototype = () => {
  // Settings state
  const [currentOffset, setCurrentOffset] = useState('+9:00');
  const [clockChangeType, setClockChangeType] = useState('timezone'); // 'timezone' or 'idl'
  const [clockChangeDirection, setClockChangeDirection] = useState('forward'); // 'forward'/'back' for TZ, 'west-east'/'east-west' for IDL
  const [clockChangeAmount, setClockChangeAmount] = useState(60); // minutes for timezone changes
  const [clockChangeTime, setClockChangeTime] = useState('02:00');
  const [clockChangeEnabled, setClockChangeEnabled] = useState(true);

  // Work entries for each day - array of {start, end} times
  const [day1Entries, setDay1Entries] = useState([{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }]);
  const [day2Entries, setDay2Entries] = useState([{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }]);
  const [day3Entries, setDay3Entries] = useState([{ start: '08:00', end: '12:00' }, { start: '13:00', end: '17:00' }]);

  // Handle clock change type switch - set sensible defaults for IDL
  const handleTypeChange = (newType) => {
    setClockChangeType(newType);
    if (newType === 'idl') {
      // Set offset to +12 for west-east (default), -12 for east-west
      setCurrentOffset(clockChangeDirection === 'east-west' ? '-12:00' : '+12:00');
      setClockChangeTime('12:00'); // IDL crossings typically at noon
    } else {
      // Reset to typical timezone change defaults
      setClockChangeTime('02:00');
    }
  };

  // Handle IDL direction change - update offset to match
  const handleDirectionChange = (newDirection) => {
    setClockChangeDirection(newDirection);
    if (clockChangeType === 'idl') {
      // West→East starts at +12, East→West starts at -12
      setCurrentOffset(newDirection === 'east-west' ? '-12:00' : '+12:00');
    }
  };

  // Calculate day length based on clock change
  const getDayLength = (dayNum) => {
    if (!clockChangeEnabled || dayNum !== 2) return 24;

    if (clockChangeType === 'timezone') {
      const hours = clockChangeAmount / 60;
      return clockChangeDirection === 'forward' ? 24 - hours : 24 + hours;
    } else {
      // IDL crossing
      return 24; // Day length stays 24h for IDL, but date changes
    }
  };

  // Calculate resulting offset
  const getResultingOffset = () => {
    if (!clockChangeEnabled) return currentOffset;

    const parseOffset = (offset) => {
      const sign = offset.startsWith('-') ? -1 : 1;
      const [hours, minutes] = offset.replace(/[+-]/, '').split(':').map(Number);
      return sign * (hours * 60 + minutes);
    };

    const formatOffset = (totalMinutes) => {
      const sign = totalMinutes >= 0 ? '+' : '-';
      const absMinutes = Math.abs(totalMinutes);
      const hours = Math.floor(absMinutes / 60);
      const mins = absMinutes % 60;
      return `${sign}${hours}:${mins.toString().padStart(2, '0')}`;
    };

    const currentMinutes = parseOffset(currentOffset);

    if (clockChangeType === 'timezone') {
      const change = clockChangeDirection === 'forward' ? clockChangeAmount : -clockChangeAmount;
      return formatOffset(currentMinutes + change);
    } else {
      // IDL crossing: offset wraps around the dateline
      // West → East: going from +side to -side (e.g., +12 becomes -12)
      // East → West: going from -side to +side (e.g., -12 becomes +12)
      let newMinutes = currentMinutes;

      if (clockChangeDirection === 'west-east') {
        // Crossing west to east: subtract 24h and wrap into valid range
        newMinutes = currentMinutes - 24 * 60;
        // Wrap to keep in range -12:00 to +14:00
        if (newMinutes < -12 * 60) {
          newMinutes += 24 * 60;
        }
      } else {
        // Crossing east to west: add 24h and wrap into valid range
        newMinutes = currentMinutes + 24 * 60;
        // Wrap to keep in range -12:00 to +14:00
        if (newMinutes > 14 * 60) {
          newMinutes -= 24 * 60;
        }
      }

      return formatOffset(newMinutes);
    }
  };

  // Get day label based on clock change
  const getDayLabel = (dayNum) => {
    const baseDate = new Date(2025, 10, 25); // Nov 25, 2025

    if (dayNum === 1) {
      return formatDate(baseDate);
    } else if (dayNum === 2) {
      const day2Date = new Date(baseDate);
      day2Date.setDate(day2Date.getDate() + 1);

      if (clockChangeEnabled && clockChangeType === 'idl') {
        const day2After = new Date(day2Date);
        if (clockChangeDirection === 'west-east') {
          // Day repeats - goes back to same date
          return `${formatDate(day2Date)} → ${formatDate(baseDate)}`;
        } else {
          // Day skips - jumps forward
          day2After.setDate(day2After.getDate() + 1);
          return `${formatDate(day2Date)} → ${formatDate(day2After)}`;
        }
      }
      return formatDate(day2Date);
    } else {
      const day3Date = new Date(baseDate);
      if (clockChangeEnabled && clockChangeType === 'idl') {
        if (clockChangeDirection === 'west-east') {
          // After day repeat, we're still on "day 2" from calendar perspective
          day3Date.setDate(day3Date.getDate() + 1);
        } else {
          // After day skip, we jumped ahead
          day3Date.setDate(day3Date.getDate() + 3);
        }
      } else {
        day3Date.setDate(day3Date.getDate() + 2);
      }
      return formatDate(day3Date);
    }
  };

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Calculate duration of a single entry, accounting for clock changes on day 2
  const calculateEntryDuration = (entry, dayNum) => {
    const [startH, startM] = entry.start.split(':').map(Number);
    const [endH, endM] = entry.end.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    let durationMinutes = endMinutes - startMinutes;

    // Account for clock change on day 2
    if (clockChangeEnabled && dayNum === 2 && clockChangeType === 'timezone') {
      const [changeH, changeM] = clockChangeTime.split(':').map(Number);
      const changeMinutes = changeH * 60 + changeM;

      // Check if work period spans the clock change time
      if (startMinutes < changeMinutes && endMinutes > changeMinutes) {
        // Work period spans the clock change
        if (clockChangeDirection === 'back') {
          // Clocks go back = extra time worked
          durationMinutes += clockChangeAmount;
        } else {
          // Clocks go forward = less time worked
          durationMinutes -= clockChangeAmount;
        }
      }
    }

    return durationMinutes / 60;
  };

  // Calculate total hours for a day
  const calculateTotalHours = (entries, dayNum) => {
    return entries.reduce((total, entry) => {
      return total + calculateEntryDuration(entry, dayNum);
    }, 0);
  };

  // Add entry to a day
  const addEntry = (dayNum) => {
    const newEntry = { start: '09:00', end: '10:00' };
    if (dayNum === 1) setDay1Entries([...day1Entries, newEntry]);
    else if (dayNum === 2) setDay2Entries([...day2Entries, newEntry]);
    else setDay3Entries([...day3Entries, newEntry]);
  };

  // Remove entry from a day
  const removeEntry = (dayNum, index) => {
    if (dayNum === 1) setDay1Entries(day1Entries.filter((_, i) => i !== index));
    else if (dayNum === 2) setDay2Entries(day2Entries.filter((_, i) => i !== index));
    else setDay3Entries(day3Entries.filter((_, i) => i !== index));
  };

  // Update entry
  const updateEntry = (dayNum, index, field, value) => {
    const updateFn = (entries) => entries.map((e, i) => i === index ? { ...e, [field]: value } : e);
    if (dayNum === 1) setDay1Entries(updateFn(day1Entries));
    else if (dayNum === 2) setDay2Entries(updateFn(day2Entries));
    else setDay3Entries(updateFn(day3Entries));
  };

  // Drag state for timeline blocks
  const [dragState, setDragState] = useState(null);
  // dragState: { dayNum, entryIndex, type: 'move' | 'resize-start' | 'resize-end', startX, originalEntry, timelineRect }

  // Convert pixel position to time string
  const pixelToTime = useCallback((pixelX, timelineRect, dayLength) => {
    const percent = Math.max(0, Math.min(1, (pixelX - timelineRect.left) / timelineRect.width));
    const totalMinutes = percent * dayLength * 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60 / 30) * 30; // Snap to 30-min intervals
    const clampedHours = Math.min(hours, Math.floor(dayLength));
    const clampedMinutes = clampedHours === Math.floor(dayLength) ? 0 : minutes;
    return `${clampedHours.toString().padStart(2, '0')}:${clampedMinutes.toString().padStart(2, '0')}`;
  }, []);

  // Handle mouse move during drag
  const handleMouseMove = useCallback((e) => {
    if (!dragState) return;

    const { dayNum, entryIndex, type, originalEntry, timelineRect } = dragState;
    const dayLength = getDayLength(dayNum);
    const currentTime = pixelToTime(e.clientX, timelineRect, dayLength);
    const [currentH, currentM] = currentTime.split(':').map(Number);
    const currentMinutes = currentH * 60 + currentM;

    const [origStartH, origStartM] = originalEntry.start.split(':').map(Number);
    const [origEndH, origEndM] = originalEntry.end.split(':').map(Number);
    const origStartMinutes = origStartH * 60 + origStartM;
    const origEndMinutes = origEndH * 60 + origEndM;
    const duration = origEndMinutes - origStartMinutes;

    let newStart, newEnd;

    if (type === 'resize-start') {
      // Dragging the left edge - change start time, keep end fixed
      const newStartMinutes = Math.min(currentMinutes, origEndMinutes - 30);
      const h = Math.floor(newStartMinutes / 60);
      const m = newStartMinutes % 60;
      newStart = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
      newEnd = originalEntry.end;
    } else if (type === 'resize-end') {
      // Dragging the right edge - change end time, keep start fixed
      const newEndMinutes = Math.max(currentMinutes, origStartMinutes + 30);
      const h = Math.floor(newEndMinutes / 60);
      const m = newEndMinutes % 60;
      newStart = originalEntry.start;
      newEnd = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    } else if (type === 'move') {
      // Moving the whole block - keep duration, change both start and end
      let newStartMinutes = currentMinutes - duration / 2;
      newStartMinutes = Math.max(0, Math.min(newStartMinutes, dayLength * 60 - duration));
      newStartMinutes = Math.round(newStartMinutes / 30) * 30; // Snap to 30-min
      const newEndMinutes = newStartMinutes + duration;

      const startH = Math.floor(newStartMinutes / 60);
      const startM = newStartMinutes % 60;
      const endH = Math.floor(newEndMinutes / 60);
      const endM = newEndMinutes % 60;
      newStart = `${startH.toString().padStart(2, '0')}:${startM.toString().padStart(2, '0')}`;
      newEnd = `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
    }

    if (newStart && newEnd) {
      const updateFn = (entries) => entries.map((e, i) =>
        i === entryIndex ? { start: newStart, end: newEnd } : e
      );
      if (dayNum === 1) setDay1Entries(updateFn(day1Entries));
      else if (dayNum === 2) setDay2Entries(updateFn(day2Entries));
      else setDay3Entries(updateFn(day3Entries));
    }
  }, [dragState, day1Entries, day2Entries, day3Entries, pixelToTime, getDayLength]);

  // Handle mouse up - end drag
  const handleMouseUp = useCallback(() => {
    setDragState(null);
  }, []);

  // Add/remove global mouse event listeners
  useEffect(() => {
    if (dragState) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState, handleMouseMove, handleMouseUp]);

  // Start drag operation
  const startDrag = (e, dayNum, entryIndex, type, entry, timelineRect) => {
    e.preventDefault();
    setDragState({
      dayNum,
      entryIndex,
      type,
      startX: e.clientX,
      originalEntry: { ...entry },
      timelineRect
    });
  };

  // Render timeline bar for a day
  const renderTimeline = (entries, dayNum) => {
    const dayLength = getDayLength(dayNum);
    const clockChangeHour = parseInt(clockChangeTime.split(':')[0]);
    const showClockChange = clockChangeEnabled && dayNum === 2;
    const timelineRef = useRef(null);

    const handleBlockMouseDown = (e, idx, entry) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const blockRect = e.currentTarget.getBoundingClientRect();
      const relativeX = e.clientX - blockRect.left;
      const blockWidth = blockRect.width;

      // Determine if we're on an edge (within 8px) or center
      let type;
      if (relativeX < 8) {
        type = 'resize-start';
      } else if (relativeX > blockWidth - 8) {
        type = 'resize-end';
      } else {
        type = 'move';
      }

      startDrag(e, dayNum, idx, type, entry, rect);
    };

    const getCursor = (e) => {
      const blockRect = e.currentTarget.getBoundingClientRect();
      const relativeX = e.clientX - blockRect.left;
      const blockWidth = blockRect.width;

      if (relativeX < 8 || relativeX > blockWidth - 8) {
        return 'ew-resize';
      }
      return 'grab';
    };

    return (
      <div ref={timelineRef} className="relative h-12 bg-gray-100 rounded select-none">
        {/* Hour markers */}
        <div className="absolute inset-0 flex">
          {[...Array(Math.ceil(dayLength) + 1)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-gray-200 last:border-r-0" />
          ))}
        </div>

        {/* Work blocks */}
        {entries.map((entry, idx) => {
          const [startH, startM] = entry.start.split(':').map(Number);
          const [endH, endM] = entry.end.split(':').map(Number);
          const startPercent = ((startH + startM / 60) / dayLength) * 100;
          const widthPercent = (((endH - startH) + (endM - startM) / 60) / dayLength) * 100;
          const isDragging = dragState && dragState.dayNum === dayNum && dragState.entryIndex === idx;

          return (
            <div
              key={idx}
              className={`absolute top-1 bottom-1 bg-teal-500 rounded group transition-shadow ${
                isDragging ? 'shadow-lg ring-2 ring-teal-300' : 'hover:shadow-md'
              }`}
              style={{
                left: `${startPercent}%`,
                width: `${widthPercent}%`,
                cursor: isDragging ? (dragState.type === 'move' ? 'grabbing' : 'ew-resize') : 'grab'
              }}
              onMouseDown={(e) => handleBlockMouseDown(e, idx, entry)}
              onMouseMove={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.cursor = getCursor(e);
                }
              }}
            >
              {/* Left resize handle */}
              <div className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-teal-600 rounded-l" />
              {/* Right resize handle */}
              <div className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-teal-600 rounded-r" />
              {/* Time tooltip on hover/drag */}
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap transition-opacity ${
                isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {entry.start} - {entry.end}
              </div>
            </div>
          );
        })}

        {/* Clock change marker */}
        {showClockChange && (
          <div
            className="absolute top-0 bottom-0 w-1 flex items-center justify-center z-10"
            style={{ left: `${(clockChangeHour / dayLength) * 100}%` }}
          >
            <div className={`rounded-full p-1 ${clockChangeType === 'idl' ? 'bg-blue-500' : 'bg-orange-500'}`}>
              {clockChangeType === 'idl' ? (
                <Globe className="w-3 h-3 text-white" />
              ) : (
                <Clock className="w-3 h-3 text-white" />
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render day card
  const renderDayCard = (dayNum, entries, setEntries) => {
    const dayLength = getDayLength(dayNum);
    const isClockChangeDay = clockChangeEnabled && dayNum === 2;
    const totalWork = calculateTotalHours(entries, dayNum);
    const totalRest = dayLength - totalWork;

    return (
      <div className={`bg-white rounded-lg shadow-sm p-5 ${isClockChangeDay ? 'ring-2 ring-offset-2 ' + (clockChangeType === 'idl' ? 'ring-blue-500' : 'ring-orange-500') : ''}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Period {dayNum}</div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-800">{getDayLabel(dayNum)}</span>
              {isClockChangeDay && (
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  clockChangeType === 'idl' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {clockChangeType === 'idl' ? (
                    <><Globe className="w-3 h-3 inline mr-1" />IDL</>
                  ) : (
                    <><Clock className="w-3 h-3 inline mr-1" />{dayLength}h day</>
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Day length</div>
            <div className="text-lg font-semibold text-gray-800">{dayLength}h</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-4 pt-6">
          {renderTimeline(entries, dayNum)}
          <div className="relative text-xs text-gray-400 mt-1">
            <span>00:00</span>
            <span className="absolute right-0">{dayLength}:00</span>
            {isClockChangeDay && clockChangeEnabled && (
              <span
                className={`absolute ${clockChangeType === 'idl' ? 'text-blue-500' : 'text-orange-500'}`}
                style={{
                  left: `${(parseInt(clockChangeTime.split(':')[0]) / dayLength) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                {clockChangeTime}
              </span>
            )}
          </div>
        </div>

        {/* Work entries */}
        <div className="space-y-2 mb-4">
          {entries.map((entry, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-teal-500 rounded" />
              <input
                type="time"
                value={entry.start}
                onChange={(e) => updateEntry(dayNum, idx, 'start', e.target.value)}
                className="border rounded px-2 py-1 text-sm w-24"
              />
              <span className="text-gray-400">→</span>
              <input
                type="time"
                value={entry.end}
                onChange={(e) => updateEntry(dayNum, idx, 'end', e.target.value)}
                className="border rounded px-2 py-1 text-sm w-24"
              />
              <span className="text-sm text-gray-500 flex-1">
                {calculateEntryDuration(entry, dayNum).toFixed(1)}h
              </span>
              <button
                onClick={() => removeEntry(dayNum, idx)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() => addEntry(dayNum)}
            className="flex items-center space-x-1 text-sm text-teal-600 hover:text-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add work period</span>
          </button>
        </div>

        {/* Compliance Check */}
        {(() => {
          const tooMuchWork = totalWork > 14;
          const notEnoughRest = totalRest < 10;
          const hasViolation = tooMuchWork || notEnoughRest;

          return (
            <>
              {hasViolation && (
                <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-4 flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-amber-800">Non-Compliance Detected</div>
                    <div className="text-sm text-amber-700">
                      {tooMuchWork && <div>• Too much work: exceeds 14h limit</div>}
                      {notEnoughRest && <div>• Not enough rest: below 10h minimum</div>}
                    </div>
                  </div>
                </div>
              )}

              {/* Summary */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className={`text-xs ${tooMuchWork ? 'text-amber-600' : 'text-teal-600'}`}>Work</div>
                  <div className={`text-xl font-semibold ${tooMuchWork ? 'text-amber-600' : ''}`}>
                    {totalWork.toFixed(1)}<span className="text-xs text-gray-400">h</span>
                    {tooMuchWork && <AlertTriangle className="w-4 h-4 inline ml-1 text-amber-500" />}
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-xs ${notEnoughRest ? 'text-amber-600' : 'text-gray-400'}`}>Rest</div>
                  <div className={`text-xl font-semibold ${notEnoughRest ? 'text-amber-600' : ''}`}>
                    {totalRest.toFixed(1)}<span className="text-xs text-gray-400">h</span>
                    {notEnoughRest && <AlertTriangle className="w-4 h-4 inline ml-1 text-amber-500" />}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-400">Total</div>
                  <div className="text-xl font-semibold">{dayLength}<span className="text-xs text-gray-400">h</span></div>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    );
  };

  // Offset options
  const offsetOptions = [];
  for (let h = 14; h >= -12; h--) {
    for (let m of [0, 30]) {
      if (h === 14 && m === 30) continue;
      if (h === -12 && m === 30) continue;
      const sign = h >= 0 ? '+' : '';
      offsetOptions.push(`${sign}${h}:${m.toString().padStart(2, '0')}`);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explainer</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Interactive Prototype</h1>
          <p className="text-gray-600">Configure a clock change and see how it affects timesheet entry across 3 days.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-6">
              <h2 className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </h2>

              {/* Current Offset */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Offset</label>
                <select
                  value={currentOffset}
                  onChange={(e) => setCurrentOffset(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {offsetOptions.map(opt => (
                    <option key={opt} value={opt}>UTC{opt}</option>
                  ))}
                </select>
              </div>

              {/* Scheduled Clock Changes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Clock Changes</label>
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  {/* Past changes */}
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2" />
                    <span className="flex-1">Wed 19 Nov</span>
                    <span className="text-gray-400">+1h at 02:00</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-gray-300 mr-2" />
                    <span className="flex-1">Sat 22 Nov</span>
                    <span className="text-gray-400">+1h at 02:00</span>
                  </div>
                  {/* Current - being edited */}
                  <div className="flex items-center text-xs font-medium text-teal-700 bg-teal-50 -mx-3 px-3 py-1.5 border-l-2 border-teal-500">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mr-2" />
                    <span className="flex-1">Wed 26 Nov</span>
                    <span className="text-teal-600">Editing...</span>
                  </div>
                  {/* Future change */}
                  <div className="flex items-center text-xs text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-2" />
                    <span className="flex-1">Sun 30 Nov</span>
                    <span className="text-gray-400">+1h at 02:00</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Showing planned changes for this voyage</p>
              </div>

              {/* Clock Change Toggle */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={clockChangeEnabled}
                    onChange={(e) => setClockChangeEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable clock change on Day 2</span>
                </label>
              </div>

              {clockChangeEnabled && (
                <>
                  {/* Change Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleTypeChange('timezone')}
                        className={`flex-1 py-2 px-2 border-2 rounded-lg text-xs font-medium transition-all ${
                          clockChangeType === 'timezone'
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Clock className="w-3 h-3 inline mr-1" />
                        Timezone
                      </button>
                      <button
                        onClick={() => handleTypeChange('idl')}
                        className={`flex-1 py-2 px-2 border-2 rounded-lg text-xs font-medium transition-all ${
                          clockChangeType === 'idl'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-600'
                        }`}
                      >
                        <Globe className="w-3 h-3 inline mr-1" />
                        IDL
                      </button>
                    </div>
                  </div>

                  {/* Date of Change */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Change</label>
                    <input
                      type="date"
                      value="2025-11-26"
                      readOnly
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">Fixed for prototype</p>
                  </div>

                  {/* Time of Change */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time of Change</label>
                    <input
                      type="time"
                      value={clockChangeTime}
                      onChange={(e) => setClockChangeTime(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>

                  {/* Direction */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                    {clockChangeType === 'timezone' ? (
                      <select
                        value={clockChangeDirection}
                        onChange={(e) => setClockChangeDirection(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="forward">Forward (clocks ahead)</option>
                        <option value="back">Back (clocks behind)</option>
                      </select>
                    ) : (
                      <select
                        value={clockChangeDirection}
                        onChange={(e) => handleDirectionChange(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="west-east">West → East (day repeated)</option>
                        <option value="east-west">East → West (day skipped)</option>
                      </select>
                    )}
                  </div>

                  {/* Amount (timezone only) */}
                  {clockChangeType === 'timezone' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                      <select
                        value={clockChangeAmount}
                        onChange={(e) => setClockChangeAmount(Number(e.target.value))}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                      >
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1 hour 30 min</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  )}

                  {/* Offset Summary */}
                  <div className="bg-gray-50 rounded-lg p-3 mt-4">
                    <div className="text-xs text-gray-500 mb-2">Offset Change</div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-xs text-gray-400">Before</div>
                        <div className="font-semibold">UTC{currentOffset}</div>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${clockChangeType === 'idl' ? 'text-blue-500' : 'text-orange-500'}`} />
                      <div className="text-center">
                        <div className="text-xs text-gray-400">After</div>
                        <div className="font-semibold">UTC{getResultingOffset()}</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Day Cards */}
          <div className="lg:col-span-3 space-y-4">
            {renderDayCard(1, day1Entries, setDay1Entries)}

            {/* Clock Change Indicator between Day 1 and Day 2 */}
            {clockChangeEnabled && (
              <div className="flex items-center justify-center py-2">
                <div className={`flex-1 border-t-2 border-dashed ${clockChangeType === 'idl' ? 'border-blue-300' : 'border-orange-300'}`} />
                <div className={`px-4 py-2 rounded-full flex items-center space-x-2 text-white ${clockChangeType === 'idl' ? 'bg-blue-500' : 'bg-orange-500'}`}>
                  {clockChangeType === 'idl' ? <Globe className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {clockChangeType === 'idl'
                      ? `IDL at ${clockChangeTime}`
                      : `${clockChangeDirection === 'forward' ? '+' : '-'}${clockChangeAmount / 60}h at ${clockChangeTime}`
                    }
                  </span>
                </div>
                <div className={`flex-1 border-t-2 border-dashed ${clockChangeType === 'idl' ? 'border-blue-300' : 'border-orange-300'}`} />
              </div>
            )}

            {renderDayCard(2, day2Entries, setDay2Entries)}
            {renderDayCard(3, day3Entries, setDay3Entries)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prototype;
