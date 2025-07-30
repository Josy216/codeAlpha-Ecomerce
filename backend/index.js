import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';

import { route } from './routes/route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', route)

// Root test route
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
