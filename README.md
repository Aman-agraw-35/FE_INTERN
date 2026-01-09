# Galactic Fleet Commander

A mission control dashboard for tracking and managing upcoming SpaceX launches. Built for the modern web with a focus on performance, aesthetics, and robust state management.

## Features

- **Real-time Launch Tracking**: Fetches the next 8 upcoming launches from the SpaceX API.
- **Mission Control Interface**: Interactive cards for each launch with "Initialize" and "Abort" logic.
- **System Check Simulation**: 10-second countdown with visual progress feedback.
- **Live Telemetry Log**: Contextual side-panel logging events in real-time.
- **Global Launch Command**: A "Launch All" feature that celebrates with digital confetti.
- **Adaptive Theming**: Smooth light and dark mode support for all operating environments.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **State Management**: React Hooks (Custom implementation)
- **Effects**: Canvas Confetti

## Architecture Overview

The project is structured around a "Clean Architecture" principle where logic is strictly separated from the UI.
- `useLaunchManager`: A custom hook that acts as the brain of the operation. It manages timers, logs, and launch states.
- **Smart/Dumb Components**: 
  - `Dashboard` (Smart): Orchestrates the data and injects logic.
  - `LaunchCard` & `LogConsole` (Dumb): Purely presentational components receiving props.

### Key Technical Decisions

1. **Timer Management via Refs**: 
   We use `useRef` to store active timer IDs. This prevents re-renders from resetting timers and allows instant cleanup without stale closures.

2. **Race Condition Safety**:
   The `initSystem` function explicitly checks if a timer already exists for a given launch ID (`if (timers.current[id]) return`). This prevents rapid-clicks from spawning multiple interval loops.

3. **Optimistic Updates**:
   UI state updates happen immediately upon user interaction, providing a snappy experience.

4. **Component Composition**:
   Shadcn components are utilized for a consistent design system, composed into business-specific components like `LaunchCard`.

## Edge Cases Handled

- **API Failures**: Gracefully falls back to generated mock data if the SpaceX API is unreachable.
- **Rapid Clicking**: Prevented via ref checks.
- **Unmounting**: Timers would ideally be cleaned up (though in this single-page dashboard, unmounting isn't a primary flow, standard cleanup is good practice).
- **Theme Flashing**: Mitigated using `suppressHydrationWarning` and `next-themes`.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.
