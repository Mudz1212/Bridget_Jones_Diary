const db = require("../db/connect");

class Diary {
  constructor({ entry_id, title, category, text, date_time }) {
    this.entry_id = entry_id;
    this.title = title;
    this.category = category;
    this.text = text;
    this.date_time = date_time;
  }

  static async getAll() {
    const response = await db.query("SELECT * FROM diary;");
    if (response.rows.length === 0) {
      throw new Error("No entries available");
    }
    return response.rows.map((c) => new Diary(c));
  }

  static async getById(id) {
    const response = await db.query(
      "SELECT * FROM diary WHERE entry_id = $1;",
      [id],
    );

    if (response.rows.length != 1) {
      throw new Error("Diary entry doesn't exist!");
    }

    return new Diary(response.rows[0]);
  }

  static async getByDate(date) {
    const response = await db.query(
      "SELECT * FROM diary WHERE date_time = $1;",
      [date],
    );

    if (response.rows.length != 1) {
      throw new Error("Diary entry doesn't exist!");
    }

    return new Diary(response.rows[0]);
  }

  static async getByCategory(category) {
    const response = await db.query(
      "SELECT * FROM diary WHERE LOWER(category) = LOWER($1);",
      [category],
    );

    if (response.rows.length != 1) {
      throw new Error("Diary entry doesn't exist!");
    }

    return new Diary(response.rows[0]);
  }

  static async create(data) {
    const { title, category, text, date_time} = data;

    const response = await db.query(
    "INSERT INTO diary (title, category, text, date_time) VALUES ($1, $2, $3, $4) RETURNING *;",
    [title, category, text, date_time],
    );
    return new Diary(response.rows[0]);
  }

  async remove() {
    const response = await db.query('DELETE FROM diary WHERE entry_id = $1 RETURNING *;', [this.entry_id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to delete entry.")
    }
    return new Diary(response.rows[0]);
  }

  async update(data) {
    const response = await db.query("UPDATE diary SET text = $1 WHERE entry_id = $2 RETURNING entry_id, text;",
      [data.text, this.entry_id]);

    if (response.rows.length != 1) {
      throw new Error("Unable to update entry.")
    }

    return new Diary(response.rows[0]);
  }
}

module.exports = Diary;
