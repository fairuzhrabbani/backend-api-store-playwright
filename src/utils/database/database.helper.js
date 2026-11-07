import pg from "pg";

const { Pool } = pg;

export class DatabaseHelper {
  static pool;

  static initialize() {
    if (!this.pool) {
      this.pool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
    }

    return this.pool;
  }

  static async query(sql, params = []) {
    const pool = this.initialize();
    const result = await pool.query(sql, params);

    return result;
  }

  static async findOne(sql, params = []) {
    const result = await this.query(sql, params);

    return result.rows[0] ?? null;
  }

  static async findAll(sql, params = []) {
    const result = await this.query(sql, params);

    return result.rows;
  }

  static async close() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
