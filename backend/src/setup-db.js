const fs = require('fs');
const path = require('path');
const { pool } = require('./config/database');

async function setupDatabase() {
  try {
    console.log('Reading postgres_schema.sql...');
    const schemaPath = path.join(__dirname, '../postgres_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executing schema...');
    // We split by ';' but carefully to handle the DO block
    // Actually, pg pool.query can handle multiple statements if separated by ;
    await pool.query(schema);

    console.log('✅ Schema executed successfully!');
  } catch (err) {
    console.error('❌ Schema execution failed:', err.message);
    if (err.detail) console.error('Detail:', err.detail);
  } finally {
    await pool.end();
  }
}

setupDatabase();
