require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Initialize Express app
const app = express();

// ========================
// 🛡️ Middleware Setup
// ========================
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || '*'
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ========================
// 🔌 Supabase Connection
// ========================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

// ========================
// 🛣️ Route Configuration
// ========================
const routeModules = [
  { path: '/api/auth', module: './routes/auth' },
  { path: '/api/clients', module: './routes/clients' },
  { path: '/api/faqs', module: './routes/faqs' },
  { path: '/api/mission', module: './routes/mission' },
  { path: '/api/team', module: './routes/meetOurTeam' },
  { path: '/api/services', module: './routes/services' },
  { path: '/api/courses', module: './routes/courses' },
  { path: '/api/contact', module: './routes/contact' },
  { path: '/api/overview', module: './routes/overview' },
  { path: '/api/coupons', module: './routes/coupons' },
  { path: '/api/testimonials', module: './routes/testimonials' }
];

routeModules.forEach(({ path, module }) => {
  try {
    const router = require(module);
    app.use(path, router(supabase)); // Inject supabase client
    console.log(`✅ Route mounted: ${path}`);
  } catch (err) {
    console.error(`❌ Failed to load ${module}:`, err.message);
  }
});

// ========================
// 🩺 Health Check Endpoint
// ========================
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const { data, error } = await supabase
      .rpc('test_connection');
    
    if (error) throw error;
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'unhealthy',
      error: err.message
    });
  }
});

// ========================
// 🚨 Error Handling
// ========================
app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ========================
// 🚀 Server Initialization
// ========================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server launched on port ${PORT}
  🔗 Supabase URL: ${process.env.SUPABASE_URL}
  🌐 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});

// ========================
// 🛑 Graceful Shutdown
// ========================
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('🔌 HTTP server closed');
    process.exit(0);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('⚠️ Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('⚠️ Uncaught Exception:', err);
  process.exit(1);
});
