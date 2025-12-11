import React, { useState } from 'react';
import { Globe, ArrowRight, Clock, FileText } from 'lucide-react';

const IDLExplainer = () => {
  const [highlightPeriod, setHighlightPeriod] = useState(null);
  const [clockChangeType, setClockChangeType] = useState('timezone'); // 'timezone' or 'idl'

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Understanding IDL Crossings</h1>
          <p className="text-gray-600">
            When crossing the International Date Line going <strong>West → East</strong> (e.g., Japan to USA), 
            the ship "repeats" a day. But this creates <strong>two separate 24-hour periods</strong>, not a merged 48-hour day.
          </p>
        </div>

        {/* Scenario Setup */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">📍 The Scenario</h2>
          <ul className="space-y-2 text-blue-900">
            <li>• Ship is sailing from <strong>Tokyo → San Francisco</strong></li>
            <li>• On <strong>Wednesday 26th at 12:00 ship time</strong>, vessel crosses the IDL</li>
            <li>• Ship clocks go back 24 hours to <strong>Tuesday 25th at 12:00</strong></li>
            <li>• The seafarer has already worked and submitted their record for the original Tuesday 25th</li>
          </ul>
        </div>

        {/* UTC Timeline - The Truth */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <Clock className="inline w-5 h-5 mr-2 text-gray-600" />
            Reality: Continuous UTC Time
          </h2>
          <p className="text-gray-600 mb-4">
            Underneath everything, time flows continuously. The compliance engine sees this:
          </p>
          
          {/* UTC Timeline Bar */}
          <div className="relative">
            <div className="flex h-16 rounded-lg overflow-hidden border-2 border-gray-300">
              {/* Period 1: Original Tue 25 */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 1 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 hover:bg-emerald-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(1)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #1</div>
                  <div className="text-xs opacity-75">UTC: Mon 24 12:00 → Tue 25 12:00</div>
                </div>
              </div>
              
              {/* Period 2: Original Wed 26 morning + "repeated" Tue 25 afternoon */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 2 ? 'bg-purple-500 text-white' : 'bg-purple-100 hover:bg-purple-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(2)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #2</div>
                  <div className="text-xs opacity-75">UTC: Tue 25 12:00 → Wed 26 12:00</div>
                </div>
              </div>
              
              {/* Period 3: After crossing */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 3 ? 'bg-amber-500 text-white' : 'bg-amber-100 hover:bg-amber-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(3)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #3</div>
                  <div className="text-xs opacity-75">UTC: Wed 26 12:00 → Thu 27 12:00</div>
                </div>
              </div>
            </div>
            
            {/* Time markers */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mon 24 12:00 UTC</span>
              <span>Tue 25 12:00 UTC</span>
              <span>Wed 26 12:00 UTC</span>
              <span>Thu 27 12:00 UTC</span>
            </div>
          </div>
        </div>

        {/* Ship Time View - What Seafarers Experience */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <Globe className="inline w-5 h-5 mr-2 text-blue-600" />
            What the Seafarer Experiences (Ship Time)
          </h2>
          
          <div className="space-y-4">
            {/* Period 1 */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 1 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHighlightPeriod(1)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-sm font-medium">Record #1</span>
                    <span className="text-lg font-semibold">Tuesday 25 Nov</span>
                    <span className="text-sm text-gray-500">(The original Tuesday)</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Tue 25th 00:00 → Tue 25th 23:59</strong>
                  </div>
                  
                  {/* Mini timeline */}
                  <div className="flex h-8 rounded overflow-hidden border text-xs">
                    <div className="w-1/3 bg-gray-100 flex items-center justify-center">Rest</div>
                    <div className="w-1/3 bg-teal-500 text-white flex items-center justify-center">Work 08-16</div>
                    <div className="w-1/3 bg-gray-100 flex items-center justify-center">Rest</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved ✓</span>
                  <div className="text-xs text-gray-500 mt-1">Submitted yesterday</div>
                </div>
              </div>
            </div>

            {/* IDL Crossing Indicator */}
            <div className="flex items-center justify-center py-2">
              <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
              <div className="px-4 py-2 bg-blue-500 text-white rounded-full flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">IDL Crossed at Wed 26th 12:00</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-blue-300"></div>
            </div>

            {/* Period 2 - The IDL crossing day */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 2 ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHighlightPeriod(2)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm font-medium">Record #2</span>
                    <span className="text-lg font-semibold">Wed 26 → Tue 25</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center">
                      <Globe className="w-3 h-3 mr-1" /> IDL Crossing
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Wed 26th 00:00 → Wed 26th 12:00</strong> 
                    <span className="text-blue-600 mx-2">⟫ IDL ⟫</span>
                    <strong>Tue 25th 12:00 → Tue 25th 23:59</strong>
                  </div>
                  
                  {/* Mini timeline with IDL marker - 24 hour day, work 08:00-16:00 */}
                  <div className="relative">
                    <div className="flex h-8 rounded overflow-hidden border text-xs">
                      {/* 00:00-08:00 Rest (8hrs = 1/3) */}
                      <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 00-08</div>
                      {/* 08:00-16:00 Work (8hrs = 1/3) - spans across IDL at 12:00 */}
                      <div className="w-1/3 bg-teal-500 text-white flex items-center justify-center font-medium">Work 08-16</div>
                      {/* 16:00-24:00 Rest (8hrs = 1/3) */}
                      <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 16-24</div>
                    </div>
                    {/* IDL marker at 12:00 (halfway through the day, which falls in the middle of the work block) */}
                    <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 flex items-center justify-center">
                      <div className="bg-blue-500 rounded-full p-1">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Wed 26 00:00</span>
                    <span className="text-blue-600 font-medium">← IDL 12:00 →</span>
                    <span>Tue 25 23:59</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">
                    The seafarer worked 08:00-16:00 as normal. The IDL crossing at 12:00 happened mid-shift but doesn't affect the hours worked.
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">Submitted</span>
                  <div className="text-xs text-gray-500 mt-1">Today's record</div>
                </div>
              </div>
            </div>

            {/* Period 3 - After crossing */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 3 ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHighlightPeriod(3)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-amber-500 text-white px-2 py-1 rounded text-sm font-medium">Record #3</span>
                    <span className="text-lg font-semibold">Wednesday 26 Nov</span>
                    <span className="text-sm text-gray-500">(After IDL crossing)</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Wed 26th 00:00 → Wed 26th 23:59</strong> (in new timezone)
                  </div>
                  
                  {/* Mini timeline */}
                  <div className="flex h-8 rounded overflow-hidden border text-xs bg-gray-50">
                    <div className="w-full flex items-center justify-center text-gray-400">Tomorrow's record...</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">Not yet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Key Insight */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-teal-800 mb-3">💡 The Key Insight</h2>
          <div className="space-y-3 text-teal-900">
            <p>
              <strong>Record #1</strong> (original Tuesday) and <strong>Record #2</strong> (the IDL crossing day)
              are <strong>two completely separate 24-hour periods</strong>.
            </p>
            <p>
              They both have "Tuesday 25th" in their date labels, but they don't overlap or merge.
              Think of them as <strong>two different "ship days"</strong> that happen to share a calendar date.
            </p>
            <p>
              The seafarer signs off each record independently. The compliance engine sees continuous UTC time
              flowing through both periods with no gaps or overlaps.
            </p>
          </div>
        </div>

        {/* Table View Example */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <FileText className="inline w-5 h-5 mr-2 text-gray-600" />
            How This Looks in the Table View
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Notes</th>
                  <th className="pb-3 font-medium">Work</th>
                  <th className="pb-3 font-medium">Rest</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 3 ? 'bg-amber-50' : ''}`}
                  onMouseEnter={() => setHighlightPeriod(3)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">Pending</span></td>
                  <td className="py-3 font-medium">Wed 26 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs">Tomorrow (after IDL)</td>
                  <td className="py-3">-</td>
                  <td className="py-3">-</td>
                </tr>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 2 ? 'bg-purple-50' : 'bg-blue-50'}`}
                  onMouseEnter={() => setHighlightPeriod(2)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">Submitted</span></td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-700">Wed 26 → Tue 25</span>
                      <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded text-xs">IDL</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500 text-xs">Today's record (IDL crossing)</td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">16h 00m</td>
                </tr>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 1 ? 'bg-emerald-50' : ''}`}
                  onMouseEnter={() => setHighlightPeriod(1)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved</span></td>
                  <td className="py-3 font-medium">Tue 25 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs">Yesterday (original Tuesday)</td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">15h 30m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved</span></td>
                  <td className="py-3 font-medium">Mon 24 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs"></td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">15h 30m</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Notice:</strong> "Tue 25 Nov" appears in the table as a normal day, AND "Wed 26 → Tue 25" 
            appears as a separate IDL crossing record. These are two different 24-hour periods, 
            both legitimately involving the date "Tuesday 25th".
          </div>
        </div>

        {/* Sorting Note */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">📋 Sorting & Ordering</h2>
          <p className="text-gray-600">
            Records should be sorted by <strong>UTC start time</strong>, not by calendar date label. 
            This ensures the chronological order is always correct regardless of IDL crossings or timezone changes.
          </p>
          <div className="mt-3 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-emerald-500 rounded"></div>
              <span>Period #1 (earliest)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span>Period #2</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded"></div>
              <span>Period #3 (latest)</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* EAST TO WEST IDL CROSSING (DAY SKIPPED) */}
        {/* ============================================ */}
        
        <div className="border-t-4 border-blue-300 my-8"></div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">IDL Crossing: East → West (Day Skipped)</h1>
          <p className="text-gray-600">
            When crossing the International Date Line going <strong>East → West</strong> (e.g., USA to Japan), 
            the ship "skips" a day. The calendar jumps forward, and one date never exists on this vessel.
          </p>
        </div>

        {/* Scenario Setup - East to West */}
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-rose-800 mb-3">📍 The Scenario</h2>
          <ul className="space-y-2 text-rose-900">
            <li>• Ship is sailing from <strong>San Francisco → Tokyo</strong></li>
            <li>• On <strong>Tuesday 25th at 12:00 ship time</strong>, vessel crosses the IDL</li>
            <li>• Ship clocks go forward 24 hours to <strong>Wednesday 26th at 12:00</strong></li>
            <li>• Tuesday 25th only existed for half a day (00:00-12:00), then it vanished</li>
            <li>• Wednesday 26th begins at 12:00 and continues to 23:59</li>
          </ul>
        </div>

        {/* UTC Timeline - East to West */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <Clock className="inline w-5 h-5 mr-2 text-gray-600" />
            Reality: Continuous UTC Time (Day Skipped)
          </h2>
          <p className="text-gray-600 mb-4">
            The compliance engine still sees continuous time - no gaps, no overlaps:
          </p>
          
          {/* UTC Timeline Bar */}
          <div className="relative">
            <div className="flex h-16 rounded-lg overflow-hidden border-2 border-gray-300">
              {/* Period 1: Mon 24 */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 4 ? 'bg-emerald-500 text-white' : 'bg-emerald-100 hover:bg-emerald-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(4)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #1</div>
                  <div className="text-xs opacity-75">UTC: Sun 23 12:00 → Mon 24 12:00</div>
                </div>
              </div>
              
              {/* Period 2: The IDL crossing day - Tue 25 morning + Wed 26 afternoon */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 5 ? 'bg-rose-500 text-white' : 'bg-rose-100 hover:bg-rose-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(5)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #2</div>
                  <div className="text-xs opacity-75">UTC: Mon 24 12:00 → Tue 25 12:00</div>
                </div>
              </div>
              
              {/* Period 3: After crossing */}
              <div 
                className={`flex-1 flex items-center justify-center cursor-pointer transition-all ${
                  highlightPeriod === 6 ? 'bg-amber-500 text-white' : 'bg-amber-100 hover:bg-amber-200'
                }`}
                onMouseEnter={() => setHighlightPeriod(6)}
                onMouseLeave={() => setHighlightPeriod(null)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">24-hour Period #3</div>
                  <div className="text-xs opacity-75">UTC: Tue 25 12:00 → Wed 26 12:00</div>
                </div>
              </div>
            </div>
            
            {/* Time markers */}
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Sun 23 12:00 UTC</span>
              <span>Mon 24 12:00 UTC</span>
              <span>Tue 25 12:00 UTC</span>
              <span>Wed 26 12:00 UTC</span>
            </div>
          </div>
        </div>

        {/* Ship Time View - East to West */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <Globe className="inline w-5 h-5 mr-2 text-rose-600" />
            What the Seafarer Experiences (Day Skipped)
          </h2>
          
          <div className="space-y-4">
            {/* Period 1 - Monday */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 4 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHighlightPeriod(4)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-sm font-medium">Record #1</span>
                    <span className="text-lg font-semibold">Monday 24 Nov</span>
                    <span className="text-sm text-gray-500">(Normal day before IDL)</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Mon 24th 00:00 → Mon 24th 23:59</strong>
                  </div>
                  
                  {/* Mini timeline */}
                  <div className="flex h-8 rounded overflow-hidden border text-xs">
                    <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 00-08</div>
                    <div className="w-1/3 bg-teal-500 text-white flex items-center justify-center font-medium">Work 08-16</div>
                    <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 16-24</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved ✓</span>
                </div>
              </div>
            </div>

            {/* IDL Crossing Indicator */}
            <div className="flex items-center justify-center py-2">
              <div className="flex-1 border-t-2 border-dashed border-rose-300"></div>
              <div className="px-4 py-2 bg-rose-500 text-white rounded-full flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">IDL Crossed at Tue 25th 12:00</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-rose-300"></div>
            </div>

            {/* Period 2 - The IDL crossing day */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 5 ? 'border-rose-500 bg-rose-100' : 'border-rose-300 bg-rose-50'
              }`}
              onMouseEnter={() => setHighlightPeriod(5)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-rose-500 text-white px-2 py-1 rounded text-sm font-medium">Record #2</span>
                    <span className="text-lg font-semibold">Tue 25 → Wed 26</span>
                    <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs flex items-center">
                      <Globe className="w-3 h-3 mr-1" /> IDL Crossing (skipped)
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Tue 25th 00:00 → Tue 25th 12:00</strong> 
                    <span className="text-rose-600 mx-2">⟫ IDL ⟫</span>
                    <strong>Wed 26th 12:00 → Wed 26th 23:59</strong>
                  </div>
                  
                  {/* Mini timeline with IDL marker - 24 hour period, work 08:00-16:00 */}
                  <div className="relative">
                    <div className="flex h-8 rounded overflow-hidden border text-xs">
                      {/* 00:00-08:00 Rest (8hrs = 1/3) */}
                      <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 00-08</div>
                      {/* 08:00-16:00 Work (8hrs = 1/3) - spans across IDL at 12:00 */}
                      <div className="w-1/3 bg-teal-500 text-white flex items-center justify-center font-medium">Work 08-16</div>
                      {/* 16:00-24:00 Rest (8hrs = 1/3) */}
                      <div className="w-1/3 bg-gray-100 flex items-center justify-center text-gray-500">Rest 16-24</div>
                    </div>
                    {/* IDL marker at 12:00 */}
                    <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-rose-500 flex items-center justify-center">
                      <div className="bg-rose-500 rounded-full p-1">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Tue 25 00:00</span>
                    <span className="text-rose-600 font-medium">← IDL 12:00 →</span>
                    <span>Wed 26 23:59</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 italic">
                    The seafarer worked 08:00-16:00 as normal. The IDL crossing at 12:00 skipped the rest of Tuesday and jumped to Wednesday afternoon.
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">Submitted</span>
                  <div className="text-xs text-gray-500 mt-1">Today's record</div>
                </div>
              </div>
            </div>

            {/* Period 3 - Thursday (after crossing) */}
            <div 
              className={`border-2 rounded-lg p-4 transition-all ${
                highlightPeriod === 6 ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
              }`}
              onMouseEnter={() => setHighlightPeriod(6)}
              onMouseLeave={() => setHighlightPeriod(null)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-amber-500 text-white px-2 py-1 rounded text-sm font-medium">Record #3</span>
                    <span className="text-lg font-semibold">Thursday 27 Nov</span>
                    <span className="text-sm text-gray-500">(Next day after IDL crossing)</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Ship time: <strong>Thu 27th 00:00 → Thu 27th 23:59</strong>
                  </div>
                  
                  {/* Mini timeline */}
                  <div className="flex h-8 rounded overflow-hidden border text-xs bg-gray-50">
                    <div className="w-full flex items-center justify-center text-gray-400">Tomorrow's record...</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">Not yet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insight - Day Skipped */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-teal-800 mb-3">💡 Key Insight: The Skipped Day</h2>
          <div className="space-y-3 text-teal-900">
            <p>
              <strong>Tuesday 25th never fully existed</strong> on this vessel. It started at 00:00 but at 12:00
              the clocks jumped forward to Wednesday 26th at 12:00.
            </p>
            <p>
              The record is labelled <strong>"Tue 25 → Wed 26"</strong> to show this transition.
              It represents one continuous 24-hour period that spans two calendar dates.
            </p>
            <p>
              Unlike the "day repeated" scenario, there's no previous "Tuesday 25th" record to worry about -
              Tuesday was always going to be an IDL crossing day.
            </p>
          </div>
        </div>

        {/* Table View - Day Skipped */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            <FileText className="inline w-5 h-5 mr-2 text-gray-600" />
            Table View: Day Skipped Scenario
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Notes</th>
                  <th className="pb-3 font-medium">Work</th>
                  <th className="pb-3 font-medium">Rest</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 6 ? 'bg-amber-50' : ''}`}
                  onMouseEnter={() => setHighlightPeriod(6)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">Pending</span></td>
                  <td className="py-3 font-medium">Thu 27 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs">Tomorrow</td>
                  <td className="py-3">-</td>
                  <td className="py-3">-</td>
                </tr>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 5 ? 'bg-rose-100' : 'bg-rose-50'}`}
                  onMouseEnter={() => setHighlightPeriod(5)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">Submitted</span></td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-rose-600" />
                      <span className="font-medium text-rose-700">Tue 25 → Wed 26</span>
                      <span className="bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded text-xs">IDL: skipped</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-500 text-xs">IDL crossing day</td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">16h 00m</td>
                </tr>
                <tr 
                  className={`border-b transition-all ${highlightPeriod === 4 ? 'bg-emerald-50' : ''}`}
                  onMouseEnter={() => setHighlightPeriod(4)}
                  onMouseLeave={() => setHighlightPeriod(null)}
                >
                  <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved</span></td>
                  <td className="py-3 font-medium">Mon 24 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs">Day before IDL</td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">15h 30m</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">Approved</span></td>
                  <td className="py-3 font-medium">Sun 23 Nov 2025</td>
                  <td className="py-3 text-gray-500 text-xs"></td>
                  <td className="py-3">08h 00m</td>
                  <td className="py-3">15h 30m</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <strong>Notice:</strong> There is no standalone "Tue 25 Nov" or "Wed 26 Nov" record. 
            The IDL crossing day "Tue 25 → Wed 26" covers the 24-hour period that spans both dates.
            Thursday 27th follows directly after.
          </div>
        </div>

        {/* Comparison Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📊 IDL Crossing Summary: Both Directions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-gray-700"></th>
                  <th className="pb-3 font-medium text-blue-700">West → East (Day Repeated)</th>
                  <th className="pb-3 font-medium text-rose-700">East → West (Day Skipped)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">Example route</td>
                  <td className="py-3">Tokyo → San Francisco</td>
                  <td className="py-3">San Francisco → Tokyo</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">What happens</td>
                  <td className="py-3">Clocks go <strong>back</strong> 24 hours</td>
                  <td className="py-3">Clocks go <strong>forward</strong> 24 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">Date label</td>
                  <td className="py-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">Wed 26 → Tue 25</span>
                  </td>
                  <td className="py-3">
                    <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs">Tue 25 → Wed 26</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">Effect on records</td>
                  <td className="py-3">Two records reference the same date (original + IDL crossing)</td>
                  <td className="py-3">One record spans two dates; one date is skipped entirely</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">Hours worked</td>
                  <td className="py-3">Normal 24-hour period</td>
                  <td className="py-3">Normal 24-hour period</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium text-gray-600">Compliance impact</td>
                  <td className="py-3">None - UTC time is continuous</td>
                  <td className="py-3">None - UTC time is continuous</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ============================================ */}
        {/* PART 2: CLOCK CHANGE EVENTS SYSTEM */}
        {/* ============================================ */}
        
        <div className="border-t-4 border-gray-300 my-8"></div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Clock Change Events</h1>
          <p className="text-gray-600">
            A unified system for recording all types of ship time changes - from hourly timezone adjustments 
            to International Date Line crossings.
          </p>
        </div>

        {/* Types of Clock Changes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🕐 Types of Clock Changes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Hourly Changes */}
            <div className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-800">Timezone Change</h3>
              </div>
              <div className="space-y-2 text-sm text-orange-900">
                <p><strong>When:</strong> Crossing ocean, approaching port in different timezone</p>
                <p><strong>Amount:</strong> Usually ±1 hour, sometimes ±30 min (India, Iran, etc.)</p>
                <p><strong>Effect:</strong> Day becomes 23h, 23.5h, 24.5h, or 25h</p>
                <p><strong>Date:</strong> Calendar date stays the same</p>
              </div>
            </div>
            
            {/* IDL Crossing */}
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">International Date Line</h3>
              </div>
              <div className="space-y-2 text-sm text-blue-900">
                <p><strong>When:</strong> Crossing 180° meridian in Pacific</p>
                <p><strong>Amount:</strong> ±24 hours (or ±25h near Kiribati)</p>
                <p><strong>Effect:</strong> Day is repeated or skipped entirely</p>
                <p><strong>Date:</strong> Calendar date changes (forward or back)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Adding a Clock Change Event - UI Mock */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">➕ Adding a Clock Change Event</h2>
          <p className="text-gray-600 mb-4">
            When a clock change occurs, it needs to be recorded in the system. The UI below shows the input form 
            (see "Decision Required" section below for options on <em>who</em> records this event).
          </p>
          
          {/* Mock UI for adding clock change */}
          <div className={`border-2 rounded-lg p-4 transition-colors ${clockChangeType === 'idl' ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Add Clock Change Event</h3>
              <button className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setClockChangeType('timezone')}
                    className={`flex-1 py-2 px-3 border-2 rounded-lg text-sm font-medium transition-all ${
                      clockChangeType === 'timezone'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="w-4 h-4 inline mr-2" />
                    Timezone Change
                  </button>
                  <button
                    onClick={() => setClockChangeType('idl')}
                    className={`flex-1 py-2 px-3 border-2 rounded-lg text-sm font-medium transition-all ${
                      clockChangeType === 'idl'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <Globe className="w-4 h-4 inline mr-2" />
                    IDL Crossing
                  </button>
                </div>
              </div>

              {/* Time of Change */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time of Change (Ship Time)</label>
                <input
                  type="time"
                  defaultValue={clockChangeType === 'idl' ? '12:00' : '02:00'}
                  key={clockChangeType}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* Timezone Change Fields */}
              {clockChangeType === 'timezone' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                    <select className="w-full border rounded-lg px-3 py-2 text-sm">
                      <option>Forward (clocks ahead)</option>
                      <option>Back (clocks behind)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <select className="w-full border rounded-lg px-3 py-2 text-sm">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>1 hour 30 minutes</option>
                      <option>2 hours</option>
                    </select>
                  </div>
                </div>
              )}

              {/* IDL Crossing Fields */}
              {clockChangeType === 'idl' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Direction of Travel</label>
                    <select className="w-full border rounded-lg px-3 py-2 text-sm">
                      <option>West → East (e.g., Japan to USA)</option>
                      <option>East → West (e.g., USA to Japan)</option>
                    </select>
                  </div>
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Globe className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <strong>West → East:</strong> Clocks go back 24 hours. The day will be <strong>repeated</strong> (same calendar date occurs twice).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Result Preview */}
              <div className={`border rounded-lg p-3 ${clockChangeType === 'idl' ? 'bg-white' : 'bg-white'}`}>
                <div className="text-xs text-gray-500 mb-1">Result</div>
                {clockChangeType === 'timezone' ? (
                  <div className="text-sm font-medium text-gray-800">
                    At 02:00, clocks move forward to 03:00. This day will be <strong>23 hours</strong> long.
                  </div>
                ) : (
                  <div className="text-sm font-medium text-gray-800">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>At 12:00 on <strong>Wed 26th</strong>, clocks go back to 12:00 on <strong>Tue 25th</strong>.</span>
                    </div>
                    <div className="mt-2 text-gray-600">
                      Record will be labelled: <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">Wed 26 → Tue 25</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-2">
                <button className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600">Add Event</button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* HOURLY CLOCK CHANGES EXPLAINED */}
        {/* ============================================ */}
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-orange-800 mb-3">
            <Clock className="inline w-5 h-5 mr-2" />
            Hourly Clock Changes Explained
          </h2>
          <p className="text-orange-900">
            When crossing an ocean (e.g., Southampton to New York), the ship adjusts clocks by 1 hour each night, 
            typically 5 times over the voyage. Each adjustment creates a day that is 23 or 25 hours long.
          </p>
        </div>

        {/* Clocks Forward Example */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">⏩ Clocks Forward (+1 Hour) = 23-Hour Day</h2>
          <p className="text-gray-600 mb-4">
            <strong>Scenario:</strong> At 02:00, clocks move forward to 03:00. The hour 02:00-03:00 never exists.
          </p>
          
          {/* Timeline visualization */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">Normal 24-hour day:</div>
            <div className="flex h-8 rounded overflow-hidden border text-xs">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="flex-1 border-r last:border-r-0 flex items-center justify-center bg-gray-100 text-gray-500">
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">23-hour day (clocks forward at 02:00):</div>
            <div className="flex h-8 rounded overflow-hidden border text-xs">
              <div className="flex-1 border-r flex items-center justify-center bg-gray-100 text-gray-500">00</div>
              <div className="flex-1 border-r flex items-center justify-center bg-gray-100 text-gray-500">01</div>
              {/* 02 is skipped */}
              <div className="w-8 border-r flex items-center justify-center bg-orange-500 text-white font-bold relative">
                <Clock className="w-3 h-3" />
                <div className="absolute -bottom-5 text-xs text-orange-600 whitespace-nowrap">02→03</div>
              </div>
              {[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((i) => (
                <div key={i} className="flex-1 border-r last:border-r-0 flex items-center justify-center bg-gray-100 text-gray-500">
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          {/* Work example */}
          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Example: Seafarer works 01:30 - 05:00</div>
            <div className="flex h-10 rounded overflow-hidden border text-xs mb-2">
              <div className="w-12 border-r flex items-center justify-center bg-gray-100 text-gray-500">00</div>
              <div className="w-12 border-r flex items-center justify-center bg-gray-100 text-gray-500">01</div>
              {/* Work starts at 01:30, spans across the clock change */}
              <div className="flex-1 flex">
                <div className="w-6 bg-gray-100"></div>
                <div className="flex-1 bg-teal-500 flex items-center justify-center text-white font-medium relative">
                  Work 01:30 - 05:00
                  {/* Clock change marker */}
                  <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-orange-500 flex items-center justify-center">
                    <div className="bg-orange-500 rounded-full p-0.5">
                      <Clock className="w-2 h-2 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-12 border-l flex items-center justify-center bg-gray-100 text-gray-500">05+</div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Actual hours worked:</strong> 2.5 hours (not 3.5 hours) — the hour from 02:00-03:00 didn't exist.
            </div>
          </div>
        </div>

        {/* Clocks Back Example */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">⏪ Clocks Back (-1 Hour) = 25-Hour Day</h2>
          <p className="text-gray-600 mb-4">
            <strong>Scenario:</strong> At 03:00, clocks move back to 02:00. The hour 02:00-03:00 happens twice.
          </p>
          
          <div className="mb-4">
            <div className="text-xs text-gray-500 mb-2">25-hour day (clocks back at 03:00):</div>
            <div className="flex h-8 rounded overflow-hidden border text-xs">
              <div className="flex-1 border-r flex items-center justify-center bg-gray-100 text-gray-500">00</div>
              <div className="flex-1 border-r flex items-center justify-center bg-gray-100 text-gray-500">01</div>
              <div className="flex-1 border-r flex items-center justify-center bg-gray-200 text-gray-600 font-medium">02(a)</div>
              {/* Clock change at 03:00 back to 02:00 */}
              <div className="w-8 border-r flex items-center justify-center bg-orange-500 text-white font-bold relative">
                <Clock className="w-3 h-3" />
                <div className="absolute -bottom-5 text-xs text-orange-600 whitespace-nowrap">03→02</div>
              </div>
              <div className="flex-1 border-r flex items-center justify-center bg-gray-200 text-gray-600 font-medium">02(b)</div>
              {[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((i) => (
                <div key={i} className="flex-1 border-r last:border-r-0 flex items-center justify-center bg-gray-100 text-gray-500">
                  {i.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mt-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Labelling the repeated hour</div>
            <p className="text-sm text-gray-600">
              When the hour 02:00-03:00 occurs twice, label them as <strong>02(a)</strong> and <strong>02(b)</strong>, 
              or <strong>02:00 (1st)</strong> and <strong>02:00 (2nd)</strong>. This allows precise recording of 
              which instance of the hour the seafarer worked.
            </p>
          </div>
        </div>

        {/* 30-Minute Changes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">🕐 30-Minute and 45-Minute Changes</h2>
          <p className="text-gray-600 mb-4">
            Some ports require non-hourly adjustments. The same principles apply:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="font-medium text-gray-700 mb-2">+30 minutes forward</div>
              <div className="text-sm text-gray-600">Day becomes <strong>23h 30m</strong></div>
              <div className="text-xs text-gray-500 mt-2">
                e.g., Arriving in India (UTC+5:30) from UAE (UTC+4)
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-medium text-gray-700 mb-2">-30 minutes back</div>
              <div className="text-sm text-gray-600">Day becomes <strong>24h 30m</strong></div>
              <div className="text-xs text-gray-500 mt-2">
                e.g., Departing India (UTC+5:30) to UAE (UTC+4)
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-sm text-amber-800">
              <strong>Key ports with non-hourly offsets:</strong> India, Sri Lanka, Myanmar, Iran, Afghanistan, 
              Newfoundland (Canada), Northern Territory & South Australia (Australia)
            </div>
          </div>
        </div>

        {/* How it Displays in the UI */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">📱 How Clock Changes Display in the UI</h2>
          
          <div className="space-y-6">
            {/* Day Summary adjustment */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Day Summary Cards</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Day summary</span>
                    <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded">23h day</span>
                    <Clock className="w-3 h-3 text-orange-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-teal-600">Work</div>
                      <div className="text-lg font-semibold">7.5<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-violet-600">Drill</div>
                      <div className="text-lg font-semibold">0.5<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Rest</div>
                      <div className="text-lg font-semibold">15.0<span className="text-xs text-gray-400">h</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">7.5 + 0.5 + 15 = 23h ✓</div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Day summary</span>
                    <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">24h day</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-teal-600">Work</div>
                      <div className="text-lg font-semibold">8.0<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-violet-600">Drill</div>
                      <div className="text-lg font-semibold">0.5<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Rest</div>
                      <div className="text-lg font-semibold">15.5<span className="text-xs text-gray-400">h</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">Normal day</div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Day summary</span>
                    <span className="bg-emerald-500 text-white px-2 py-0.5 rounded text-xs">Compliant</span>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">IDL</span>
                    <Globe className="w-3 h-3 text-blue-500" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xs text-teal-600">Work</div>
                      <div className="text-lg font-semibold">8.0<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-violet-600">Drill</div>
                      <div className="text-lg font-semibold">0.0<span className="text-xs text-gray-400">h</span></div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Rest</div>
                      <div className="text-lg font-semibold">16.0<span className="text-xs text-gray-400">h</span></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-center">Wed 26 → Tue 25</div>
                </div>
              </div>
            </div>
            
            {/* Timeline markers */}
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Timeline Block Colors</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-teal-500 rounded"></div>
                  <span className="text-sm text-gray-600">Work</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-violet-500 rounded"></div>
                  <span className="text-sm text-gray-600">Drill</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  <span className="text-sm text-gray-600">Rest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                    <Clock className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Timezone change</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Globe className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">IDL crossing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* OPTIONS: WHO RECORDS THE CLOCK CHANGE? */}
        {/* ============================================ */}
        
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">⚖️ Decision Required: Who Records Clock Changes?</h2>
          <p className="text-yellow-900">
            We need to determine who is responsible for recording clock change events. 
            Two options are presented below for user research and stakeholder input.
          </p>
        </div>

        {/* Option A: Central Recording */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">Option A</span>
              <h2 className="text-lg font-semibold text-gray-800 mt-2">Central Recording by OOW / Master</h2>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Clock change events are recorded once at the vessel level by the Officer of the Watch or Master. 
            The event automatically applies to all crew timesheets for that day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">✓ Advantages</h4>
              <ul className="text-sm text-green-900 space-y-1">
                <li>• Single source of truth for clock changes</li>
                <li>• Consistency across all crew records</li>
                <li>• Reduces burden on individual seafarers</li>
                <li>• Mirrors how ship's logbook works</li>
                <li>• Less risk of conflicting/incorrect entries</li>
                <li>• OOW/Master already tracks this officially</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">✗ Disadvantages</h4>
              <ul className="text-sm text-red-900 space-y-1">
                <li>• Requires OOW/Master to use the system</li>
                <li>• Creates dependency - seafarers can't submit until event is recorded</li>
                <li>• Additional step in OOW/Master workflow</li>
                <li>• May not align with current vessel processes</li>
                <li>• What if OOW/Master forgets to record it?</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">User Flow</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap gap-y-2">
              <span className="bg-white border rounded px-2 py-1">OOW/Master adds clock change event</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="bg-white border rounded px-2 py-1">System applies to all crew for that day</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="bg-white border rounded px-2 py-1">Seafarers see adjusted day in their timesheet</span>
            </div>
          </div>
        </div>

        {/* Option B: Seafarer Recording */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">Option B</span>
              <h2 className="text-lg font-semibold text-gray-800 mt-2">Individual Recording by Each Seafarer</h2>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            Each seafarer records the clock change event when submitting their own timesheet. 
            The system may prompt them or they add it manually.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">✓ Advantages</h4>
              <ul className="text-sm text-green-900 space-y-1">
                <li>• No dependency on OOW/Master using the system</li>
                <li>• Seafarer has full control of their record</li>
                <li>• Simpler permissions model</li>
                <li>• Works even if vessel admin isn't using Hours module</li>
                <li>• Easier initial implementation</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">✗ Disadvantages</h4>
              <ul className="text-sm text-red-900 space-y-1">
                <li>• Risk of inconsistent entries across crew</li>
                <li>• Every seafarer must understand clock changes</li>
                <li>• Potential for errors (wrong time, wrong direction)</li>
                <li>• Duplicate effort (20+ crew entering same event)</li>
                <li>• Harder to audit/verify consistency</li>
                <li>• What if some crew forget to record it?</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">User Flow</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600 flex-wrap gap-y-2">
              <span className="bg-white border rounded px-2 py-1">Seafarer opens their timesheet</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="bg-white border rounded px-2 py-1">Adds clock change event to their record</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="bg-white border rounded px-2 py-1">Day length adjusts for their timesheet only</span>
            </div>
          </div>
        </div>

        {/* Hybrid Option Note */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">💡 Possible Hybrid Approach</h3>
          <p className="text-gray-600 mb-3">
            A combination could also be considered: OOW/Master records the event centrally, 
            but seafarers can still add/override if needed (with the central event as a default/suggestion).
          </p>
          <p className="text-gray-600">
            <strong>Further user research needed:</strong> How do seafarers currently handle this with paper records or ISF Watchkeeper? 
            Who typically records the clock change on vessels today? What is the crew's comfort level with this type of data entry?
          </p>
        </div>

        {/* Questions for Research */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-3">🔍 Questions for User Research</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="text-gray-400">1.</span>
              <span>Who currently records clock changes on your vessel? (OOW, Master, individual crew, no one?)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400">2.</span>
              <span>How often does your vessel change timezones or cross the IDL?</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400">3.</span>
              <span>Would you prefer to record this yourself, or have it set centrally for the whole crew?</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400">4.</span>
              <span>Have you experienced issues with inconsistent clock change recording across crew?</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gray-400">5.</span>
              <span>How is this currently handled in ISF Watchkeeper or your existing solution?</span>
            </li>
          </ul>
        </div>

        {/* Final Summary */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-teal-800 mb-3">✅ Summary: The Unified Approach</h2>
          <div className="space-y-3 text-teal-900">
            <p>
              <strong>1. Clock Change Events</strong> are recorded at vessel level, capturing the time, direction, and amount of any ship time adjustment.
            </p>
            <p>
              <strong>2. Two types:</strong> Timezone changes (±30min to ±2h) and IDL crossings (±24h). Same underlying system, different visual indicators.
            </p>
            <p>
              <strong>3. Day length varies:</strong> Records show adjusted day length (23h, 23.5h, 24h, 24.5h, 25h) and hours always add up correctly.
            </p>
            <p>
              <strong>4. Visual markers:</strong> Orange clock icon for timezone changes, blue globe for IDL. Both appear on the timeline at the point of change.
            </p>
            <p>
              <strong>5. Compliance engine:</strong> Works on continuous UTC time underneath — clock changes are purely a presentation/recording concern.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IDLExplainer;
