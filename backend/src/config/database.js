const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Helper to convert '?' placeholders to '$1, $2, ...' for Postgres
function convertPlaceholders(sql) {
  let index = 1;
  return sql.replace(/\?/g, () => `$${index++}`);
}

/**
 * Compatibility wrapper exposing a `query` method
 * that returns `[rows, fields]` similar to mysql2/promise.
 */
async function query(sql, params = []) {
  const pgSql = convertPlaceholders(sql);
  
  try {
    const res = await pool.query(pgSql, params);
    
    // Mimic mysql2/promise return format: [rows, fields]
    // For SELECT: rows is an array of data
    // For INSERT/UPDATE/DELETE: mimic properties like insertId/affectedRows
    if (res.command === 'SELECT') {
      return [res.rows, res.fields];
    } else if (res.command === 'INSERT') {
      // In Postgres, insertId isn't automatically returned unless using RETURNING.
      // However, we return the usual mysql2-style object if needed.
      return [{ affectedRows: res.rowCount, insertId: res.rows[0]?.id }, undefined];
    } else {
      return [{ affectedRows: res.rowCount }, undefined];
    }
  } catch (err) {
    console.error('❌ Database error:', err.message);
    throw err;
  }
}

async function getConnection() {
  const client = await pool.connect();
  return {
    ...client,
    release: () => client.release()
  };
}

module.exports = { query, getConnection, pool };

