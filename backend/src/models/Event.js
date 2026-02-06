const pool = require('../config/database');

class Event {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM events ORDER BY date DESC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    return rows[0];
  }

  static async getByCalendar(year, month) {
    const [rows] = await pool.query(
      'SELECT * FROM events WHERE YEAR(date) = ? AND MONTH(date) = ? ORDER BY date',
      [year, month]
    );
    return rows;
  }

  static async create(data) {
    const { title, description, date, time, location, image_url } = data;
    const [result] = await pool.query(
      'INSERT INTO events (title, description, date, time, location, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, date, time, location, image_url]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { title, description, date, time, location, image_url } = data;
    const [result] = await pool.query(
      'UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, image_url = ? WHERE id = ?',
      [title, description, date, time, location, image_url, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM events WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Event;
