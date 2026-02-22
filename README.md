# Minimal Vinyl Player (React + Express)

A lightweight SPA music player built for local development and free-tier environments.

## Stack

- Frontend: React + Tailwind CSS + Framer Motion
- Backend: Node.js + Express
- Data: Local `songs.json` (no external PostgreSQL)
- Audio files: Local `.mp3` files in `public/music`

## Core UX

- 3-deck carousel in the center: `[Previous] [Active Vinyl] [Next]`
- Active center deck rotates while audio is playing
- Infinite circular track logic across all 24 songs
- Vertical song info below center vinyl: title, artist, description
- Smooth transitions between tracks using Framer Motion
- Mobile-responsive centered layout
- Easy theme customization via `bgColor` in `src/App.jsx`

## Project Structure

- `server.js` – Express API and static file serving
- `songs.json` – 24 song records (`id`, `title`, `artist`, `file_url`, `description`)
- `public/music/` – place `song-01.mp3` through `song-24.mp3`
- `src/App.jsx` – SPA player UI and playback logic

## API

- `GET /api/songs` → returns songs from `songs.json`
- `GET /api/health` → health check
- `GET /music/<file>.mp3` → static audio files

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your local audio files:

   - `public/music/song-01.mp3`
   - ...
   - `public/music/song-24.mp3`

3. Start frontend + backend:

   ```bash
   npm run dev
   ```

4. Open the app at `http://localhost:3000`

## Notes

- This project intentionally avoids authentication and external databases.
- If audio files are missing, the UI still renders, but playback will fail for those tracks.
