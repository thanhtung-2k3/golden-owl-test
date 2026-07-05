import express from 'express';
import cors from 'cors';
import createRouter from './routes';


const app = express();
// Use JSON middleware
app.use(express.json());
app.use(cors());
app.use('/api/', createRouter)

export default app
  