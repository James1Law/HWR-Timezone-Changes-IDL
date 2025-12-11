# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React component project for explaining and visualizing International Date Line (IDL) crossings and timezone changes in a maritime context. The main component (`IDLExplainer`) is an interactive educational tool for seafarers and maritime compliance systems.

## Technology Stack

- React 18 with hooks (useState)
- Vite for build tooling
- Tailwind CSS for styling
- lucide-react for icons (Globe, ArrowRight, Clock, FileText)

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Architecture

The main component is `src/IDLExplainer.jsx` which demonstrates:

1. **IDL Crossings** - Two scenarios:
   - West → East (day repeated): Ship clocks go back 24 hours
   - East → West (day skipped): Ship clocks go forward 24 hours

2. **Clock Change Events** - Timezone adjustments:
   - Hourly changes (±1 hour) creating 23 or 25-hour days
   - 30/45-minute changes for non-standard timezone offsets

3. **Key Concepts**:
   - UTC time flows continuously regardless of ship time changes
   - Records are sorted by UTC start time, not calendar date
   - Multiple records can reference the same calendar date after IDL crossing
   - Compliance engine operates on continuous UTC time

## Domain Knowledge

- Ship time changes are recorded as "Clock Change Events"
- IDL crossings use blue globe icon; timezone changes use orange clock icon
- Day lengths can be 23h, 23.5h, 24h, 24.5h, or 25h depending on clock changes
- Repeated hours from clock-back events are labeled with (a)/(b) or (1st)/(2nd) suffixes

## Workflow Rules

1. **Plan before implementing** - Always discuss and get approval on proposed changes before writing code
2. **Local development only** - Do not push to GitHub unless explicitly instructed
3. **Follow best practices** - Adhere to Claude Code best practices and general coding standards
