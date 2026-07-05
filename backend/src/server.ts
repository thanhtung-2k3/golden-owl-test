import app from './app';
//import { createServer as createViteServer } from 'vite';
import { initializeDatabase } from './config/database';
import dotenv from 'dotenv'
dotenv.config()

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize DB & Seeders
  try {
    await initializeDatabase();
  } catch (err) {
    console.error('Failed to initialize database on server startup:', err);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
