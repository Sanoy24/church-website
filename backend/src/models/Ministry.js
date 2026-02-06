const pool = require('../config/database');

class Ministry {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM ministries ORDER BY id');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM ministries WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { title, description, detailed_description, schedule, leader, image_url } = data;
    const [result] = await pool.query(
      'INSERT INTO ministries (title, description, detailed_description, schedule, leader, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, detailed_description, schedule, leader, image_url]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { title, description, detailed_description, schedule, leader, image_url } = data;
    const [result] = await pool.query(
      'UPDATE ministries SET title = ?, description = ?, detailed_description = ?, schedule = ?, leader = ?, image_url = ? WHERE id = ?',
      [title, description, detailed_description, schedule, leader, image_url, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM ministries WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Ministry;
