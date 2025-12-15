# HWR Timezone Changes & IDL Explainer

An interactive visual explainer and working prototype for understanding International Date Line (IDL) crossings and timezone changes in maritime contexts.

## Live Demo

- **Explainer**: [hwr-timezone-changes-idl.vercel.app](https://hwr-timezone-changes-idl.vercel.app)
- **Interactive Prototype**: [hwr-timezone-changes-idl.vercel.app/prototype](https://hwr-timezone-changes-idl.vercel.app/prototype)

## Features

### Explainer Page

Visual documentation covering:

- **IDL Crossings**
  - West → East (day repeated): Clocks go back 24 hours
  - East → West (day skipped): Clocks go forward 24 hours
  - Offset wrapping across the dateline (+12 ↔ -12)

- **Timezone Changes**
  - Hourly adjustments (±1h, ±2h) creating 23 or 25-hour days
  - Non-standard offsets (±30/45 min) for ports like India, Iran, Sri Lanka

- **Clock Change Event Form**
  - Date and time of change
  - Current offset display
  - Before/after offset visualization
  - Direction and amount selection

- **Initial Offset Setup**
  - Suggested solution for vessel onboarding
  - Full UTC offset dropdown (-12:00 to +14:00 in 30-min increments)

- **Edge Cases**
  - Timesheet entry before clock change is recorded
  - Recommended auto-reject on conflict solution

### Interactive Prototype (`/prototype`)

A fully functional demo for testing clock change scenarios:

- **Settings Panel**
  - Configure current UTC offset
  - Toggle between Timezone and IDL crossing modes
  - Set clock change time, direction, and amount
  - Auto-sets sensible defaults for IDL (+12/-12)

- **3-Day View (Period 1, 2, 3)**
  - Clock change occurs on Day 2
  - Day length adjusts (23h, 24h, 25h) based on changes
  - Date labels show transitions for IDL crossings

- **Draggable Work Blocks**
  - Drag edges to resize (change start/end time)
  - Drag center to move entire block
  - Times snap to 15-minute intervals
  - Live tooltip shows current times while dragging

- **Compliance Checking**
  - Amber warnings for >14h work
  - Amber warnings for <10h rest
  - Real-time validation as you edit

## Key Concepts

1. **UTC time flows continuously** - Clock changes are a presentation concern; the compliance engine always sees uninterrupted UTC time
2. **Records sorted by UTC** - Not by calendar date labels, ensuring correct chronological order
3. **Variable day lengths** - Days can be 23h, 23.5h, 24h, 24.5h, or 25h depending on clock changes
4. **Visual indicators** - Blue globe for IDL crossings, orange clock for timezone changes
5. **Work duration accounts for clock changes** - A work block spanning a clock-back gains an hour; spanning a clock-forward loses an hour

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18 with hooks
- React Router for navigation
- Vite for build tooling
- Tailwind CSS for styling
- lucide-react for icons

## Deployment

This project is configured for deployment on Vercel with SPA routing support. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

Internal use only.
