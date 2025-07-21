import pkg from 'pg';
const { Pool } = pkg;

export const connectDB = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await pool.connect();
    console.log('Connected to PostgreSQL');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }

  return pool;
};
