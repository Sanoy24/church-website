const pool = require('../config/database');

class Sermon {
  static async getAll(limit = 100, offset = 0, search = '') {
    let query = 'SELECT * FROM sermons';
    const params = [];

    if (search) {
      query += ' WHERE title LIKE ? OR preacher LIKE ? OR series LIKE ?';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async getRecent(limit = 5) {
    const [rows] = await pool.query(
      'SELECT * FROM sermons ORDER BY date DESC LIMIT ?',
      [limit]
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM sermons WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { title, series, preacher, date, image_url, video_url } = data;
    const [result] = await pool.query(
      'INSERT INTO sermons (title, series, preacher, date, image_url, video_url) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
      [title, series, preacher, date, image_url, video_url]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { title, series, preacher, date, image_url, video_url } = data;
    const [result] = await pool.query(
      'UPDATE sermons SET title = ?, series = ?, preacher = ?, date = ?, image_url = ?, video_url = ? WHERE id = ?',
      [title, series, preacher, date, image_url, video_url, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM sermons WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Sermon;
