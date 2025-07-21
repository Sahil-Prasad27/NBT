const { Pool } = require('pg');
require('dotenv').config();

// Use connection string for better security
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.DB_SSL_CERT // Add if using custom CA
  },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// Test connection
pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1); // Fail fast if DB connection fails
  } else {
    console.log('✅ Connected to Supabase PostgreSQL');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('🔌 Database pool closed');
    process.exit(0);
  });
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: async () => await pool.connect()
};
