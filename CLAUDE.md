# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application that provides live closed captions using Deepgram's real-time speech-to-text API. The app features user authentication via Supabase, customizable themes for caption display, and WebSocket-based audio streaming.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server
node .output/server/index.mjs
```

## Architecture Overview

### Core Components
- **Nuxt 3 Framework**: Full-stack Vue.js application with server-side rendering
- **Supabase Integration**: Authentication and user profile management via `@nuxtjs/supabase`
- **Deepgram API**: Real-time speech-to-text transcription via WebSocket connection
- **PrimeVue UI Library**: Component library for UI elements and theming

### Key Directories
- `/pages/` - Vue pages with file-based routing (dashboard.vue is the main caption interface)
- `/components/` - Reusable Vue components including Supabase auth components
- `/server/api/` - Nuxt server API routes (deepgram.get.ts provides temporary API keys)
- `/composables/` - Global state management (user and profile state)
- `/middleware/` - Route middleware for authentication
- `/assets/styles/` - SCSS styling with theme variables

### Authentication Flow
The app uses Supabase for authentication with route middleware protection:
1. `middleware/auth.js` checks for authenticated users on protected routes
2. User state managed via `composables/states.js` 
3. Profile data stored in Supabase `profiles` table with theme preferences

### Real-time Caption System
1. **API Key Management**: `server/api/deepgram.get.ts` generates temporary Deepgram keys
2. **WebSocket Connection**: Dashboard connects to `wss://api.deepgram.com/v1/listen`
3. **Audio Streaming**: MediaRecorder captures microphone input and streams to Deepgram
4. **Caption Display**: Real-time transcripts displayed with customizable themes

### Environment Configuration
- `DEEPGRAM_API_KEY`: Required for Deepgram API access
- Supabase keys are configured in `nuxt.config.ts` (both public and server-side)
- Environment-specific redirects handled via `runtimeConfig`

### Styling System
- SCSS with CSS custom properties for theming
- Theme variants: Swift, Light, Dark, Contrast
- Responsive design with PrimeFlex utility classes
- Full-screen caption display with fixed control bar

## Important Notes

- The dashboard uses hardcoded localhost URLs in `pages/dashboard.vue:189` that should be made environment-aware
- Theme management allows users to customize caption appearance stored in their profile
- WebSocket connection management includes proper error handling and reconnection logic
- The app supports pause/resume functionality for live transcription sessions