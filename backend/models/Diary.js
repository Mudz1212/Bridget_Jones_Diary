const db = require("../db/connect")

class Diary {
    constructor({entry_id, title, category, text, date_time}) {
        this.entry_id = entry_id
        this.title - title
        this.category = category
        this.text = text
        this.date_time = date_time
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM diary;")
        if(response.rows.length === 0) {
            throw new Error("No entries available");
        }
        return response.rows.map(c => new Diary(c));
    }
}

module.exports = Diary