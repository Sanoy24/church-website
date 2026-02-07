const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(email, password, role = 'editor') {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role]
    );
    return result.insertId;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query(
      'UPDATE users SET password_hash = ? WHERE id = ?',
      [hashedPassword, userId]
    );
    return result.affectedRows;
  }

  static async getAll() {
    const [rows] = await pool.query('SELECT id, email, role, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }

  static async delete(userId) {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    return result.affectedRows;
  }
}

module.exports = User;
