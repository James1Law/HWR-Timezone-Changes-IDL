# HWR Timezone Changes & IDL Explainer

An interactive visual explainer for understanding International Date Line (IDL) crossings and timezone changes in maritime contexts.

## What This Explains

### International Date Line Crossings

- **West → East (Day Repeated)**: When sailing from Japan to USA, clocks go back 24 hours, creating two separate 24-hour periods that share the same calendar date
- **East → West (Day Skipped)**: When sailing from USA to Japan, clocks go forward 24 hours, skipping a calendar date entirely

### Timezone Changes

- **Hourly adjustments**: ±1 hour changes creating 23 or 25-hour days
- **Non-standard offsets**: ±30/45 minute changes for ports like India (UTC+5:30), Iran, Sri Lanka, etc.

## Key Concepts

1. **UTC time flows continuously** - Clock changes are a presentation concern; the compliance engine always sees uninterrupted UTC time
2. **Records sorted by UTC** - Not by calendar date labels, ensuring correct chronological order
3. **Variable day lengths** - Days can be 23h, 23.5h, 24h, 24.5h, or 25h depending on clock changes
4. **Visual indicators** - Blue globe for IDL crossings, orange clock for timezone changes

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- lucide-react icons

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

Internal use only.
