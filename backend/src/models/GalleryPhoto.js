const pool = require("../config/database");

class GalleryPhoto {
    static normalizePayload(data) {
        return {
            title: data.title,
            description: data.description || null,
            category: data.category || null,
            event_date: data.event_date || null,
            image_url: data.image_url,
            display_order: Number(data.display_order) || 0,
            is_featured: data.is_featured ? 1 : 0,
        };
    }

    static async getAll() {
        const [rows] = await pool.query(
            `SELECT * FROM gallery_photos
             ORDER BY is_featured DESC, display_order ASC, event_date DESC, id DESC`,
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM gallery_photos WHERE id = ?",
            [id],
        );
        return rows[0];
    }

    static async create(data) {
        const normalized = this.normalizePayload(data);

        const [result] = await pool.query(
            `INSERT INTO gallery_photos
             (title, description, category, event_date, image_url, display_order, is_featured)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                normalized.title,
                normalized.description,
                normalized.category,
                normalized.event_date,
                normalized.image_url,
                normalized.display_order,
                normalized.is_featured,
            ],
        );

        return result.insertId;
    }

    static async bulkCreate(items) {
        const rows = items.map((item) => this.normalizePayload(item));
        const placeholders = rows.map(() => "(?, ?, ?, ?, ?, ?, ?)").join(", ");
        const values = rows.flatMap((row) => [
            row.title,
            row.description,
            row.category,
            row.event_date,
            row.image_url,
            row.display_order,
            row.is_featured,
        ]);

        const [result] = await pool.query(
            `INSERT INTO gallery_photos
             (title, description, category, event_date, image_url, display_order, is_featured)
             VALUES ${placeholders}`,
            values,
        );

        return Array.from(
            { length: result.affectedRows },
            (_, index) => result.insertId + index,
        );
    }

    static async update(id, data) {
        const normalized = this.normalizePayload(data);

        const [result] = await pool.query(
            `UPDATE gallery_photos
             SET title = ?, description = ?, category = ?, event_date = ?, image_url = ?, display_order = ?, is_featured = ?
             WHERE id = ?`,
            [
                normalized.title,
                normalized.description,
                normalized.category,
                normalized.event_date,
                normalized.image_url,
                normalized.display_order,
                normalized.is_featured,
                id,
            ],
        );

        return result.affectedRows;
    }

    static async delete(id) {
        const [result] = await pool.query(
            "DELETE FROM gallery_photos WHERE id = ?",
            [id],
        );
        return result.affectedRows;
    }
}

module.exports = GalleryPhoto;
