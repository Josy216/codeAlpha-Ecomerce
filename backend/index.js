import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './routes/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.use('/api', router); // Changed to use 'router'

// Root test router
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});