const pool = require('../config/database');

class Donation {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM donation_accounts ORDER BY id');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM donation_accounts WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { bank_name, account_name, account_number, account_type, color } = data;
    const [result] = await pool.query(
      'INSERT INTO donation_accounts (bank_name, account_name, account_number, account_type, color) VALUES (?, ?, ?, ?, ?) RETURNING id',
      [bank_name, account_name, account_number, account_type, color]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { bank_name, account_name, account_number, account_type, color } = data;
    const [result] = await pool.query(
      'UPDATE donation_accounts SET bank_name = ?, account_name = ?, account_number = ?, account_type = ?, color = ? WHERE id = ?',
      [bank_name, account_name, account_number, account_type, color, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query('DELETE FROM donation_accounts WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Donation;
