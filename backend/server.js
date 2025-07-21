const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

// === Initialize Supabase Client ===
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    database: supabase ? 'connected' : 'disconnected'
  });
});

// === ROUTES ===
// Inject supabase client into routes
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

try {
  app.use('/api/auth', require('./routes/auth'));
  // ... other routes ...
} catch (err) {
  console.error('❌ Route error:', err.message);
}

// === SERVER LISTENER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Supabase connected to ${supabaseUrl}`);
});
