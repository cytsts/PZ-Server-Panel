import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const CONFIG_FILE = path.resolve(__dirname, 'server-config.json');

// Default configuration
const defaultConfig = {
  serverName: 'My PZ Server',
  maxPlayers: 32,
  password: '',
  port: 16261,
  version: 'latest',
  mods: [
    { workshopId: '2616986064', modId: 'TsarLib' },
    { workshopId: '2392709985', modId: 'tsarslib' }
  ],
  world: {
    zombieCount: 4, // 1=Insane, 2=Very High, 3=High, 4=Normal, 5=Low
    lootRarity: 3, // 1=Extremely Rare, 2=Rare, 3=Normal, 4=Common
    dayLength: 2, // hours
    waterShutoff: 2, // 1=0-30 days, 2=0-2 months, etc.
    elecShutoff: 2,
    xpMultiplier: 1.0,
    pvp: false
  },
  status: 'stopped' // mock status
};

// Initialize config file if it doesn't exist
if (!fs.existsSync(CONFIG_FILE)) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
}

// API Routes
app.get('/api/config', (req, res) => {
  try {
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to read config' });
  }
});

app.post('/api/config', (req, res) => {
  try {
    const newConfig = { ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8')), ...req.body };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2));
    res.json(newConfig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save config' });
  }
});

app.post('/api/server/start', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config.status = 'running';
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    res.json({ message: 'Server started', status: 'running' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start server' });
  }
});

app.post('/api/server/stop', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    config.status = 'stopped';
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    res.json({ message: 'Server stopped', status: 'stopped' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to stop server' });
  }
});

app.post('/api/server/install-mods', (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    // In a real scenario, this would trigger SteamCMD to download the mods
    // For now, we simulate a delay and return success
    setTimeout(() => {
      res.json({ message: 'Mods instalados com sucesso', mods: config.mods });
    }, 3000);
  } catch (error) {
    res.status(500).json({ error: 'Failed to install mods' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
