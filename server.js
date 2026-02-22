import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
const songsPath = path.join(__dirname, 'songs.json');

app.use(cors());
app.use(express.json());
app.use('/music', express.static(path.join(publicDir, 'music')));

app.get('/api/songs', async (_req, res) => {
  try {
    const songsFile = await fs.readFile(songsPath, 'utf8');
    const songs = JSON.parse(songsFile);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load songs.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`Music API running on http://localhost:${port}`);
});
