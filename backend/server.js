const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// === ROUTES ===
try {
  app.use('/clients', require('./routes/clients'));
  app.use('/faqs', require('./routes/faqs'));
  app.use('/api/mission', require('./routes/mission'));
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/meet-our-team', require('./routes/meetOurTeam'));
  app.use('/api/services', require('./routes/services'));
  app.use('/api/courses', require('./routes/courses'));
  app.use('/api/contact', require('./routes/contact'));
  app.use('/api/overview', require('./routes/overview'));
  app.use('/api/coupons', require('./routes/coupons'));
  app.use('/api/testimonials', require('./routes/testimonials'));
} catch (err) {
  console.error('❌ Route error:', err.message);
}

// === DEPLOYMENT (optional static serve) ===
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, '..', 'frontend', 'dist');
  app.use(express.static(publicPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
