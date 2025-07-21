import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import coursesRoutes from './routes/courses.js';
import servicesRoutes from './routes/services.js';
import teamRoutes from './routes/team.js';
import testimonialsRoutes from './routes/testimonials.js';
import contactRoutes from './routes/contact.js';
import missionRoutes from './routes/mission.js';
import overviewRoutes from './routes/overview.js';
import couponsRoutes from './routes/coupons.js';
import meetOurTeamRoutes from './routes/meetOurTeam.js';
import faqsRoutes from './routes/faqs.js';
import clientsRoutes from './routes/clients.js';
import authRoutes from './routes/auth.js';

import { connectDB } from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Needed for __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', coursesRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/mission', missionRoutes);
app.use('/api/overview', overviewRoutes);
app.use('/api/coupons', couponsRoutes);
app.use('/api/meet-our-team', meetOurTeamRoutes);
app.use('/api/faqs', faqsRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/auth', authRoutes);

// Serve frontend (optional for fullstack deploy)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
