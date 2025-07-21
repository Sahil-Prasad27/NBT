const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres.brxbmukalvaqcqwnmvdl',
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  database: 'postgres',
  password: 'hvh4U001xs2iWVRD',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Connected to Supabase PostgreSQL');
  }
});
module.exports = pool;