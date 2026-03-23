const pool = require("../config/database");

class StaffMember {
    static normalizePayload(data) {
        return {
            name: data.name,
            role: data.role,
            bio: data.bio || null,
            image_url: data.image_url,
            display_order: Number(data.display_order) || 0,
            is_active: data.is_active === undefined ? 1 : data.is_active ? 1 : 0,
        };
    }

    static async getPublic() {
        const [rows] = await pool.query(
            `SELECT * FROM staff_members
             WHERE is_active = 1
             ORDER BY display_order ASC, id ASC`,
        );
        return rows;
    }

    static async getAll() {
        const [rows] = await pool.query(
            `SELECT * FROM staff_members
             ORDER BY is_active DESC, display_order ASC, id ASC`,
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM staff_members WHERE id = ?",
            [id],
        );
        return rows[0];
    }

    static async create(data) {
        const normalized = this.normalizePayload(data);
        const [result] = await pool.query(
            `INSERT INTO staff_members
             (name, role, bio, image_url, display_order, is_active)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                normalized.name,
                normalized.role,
                normalized.bio,
                normalized.image_url,
                normalized.display_order,
                normalized.is_active,
            ],
        );
        return result.insertId;
    }

    static async update(id, data) {
        const normalized = this.normalizePayload(data);
        const [result] = await pool.query(
            `UPDATE staff_members
             SET name = ?, role = ?, bio = ?, image_url = ?, display_order = ?, is_active = ?
             WHERE id = ?`,
            [
                normalized.name,
                normalized.role,
                normalized.bio,
                normalized.image_url,
                normalized.display_order,
                normalized.is_active,
                id,
            ],
        );
        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            "DELETE FROM staff_members WHERE id = ?",
            [id],
        );
        return result.affectedRows;
    }
}

module.exports = StaffMember;
