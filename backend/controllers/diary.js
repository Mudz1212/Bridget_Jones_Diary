const Diary = require("../models/Diary");

async function index(req, res) {
    try{
        const diary = await Diary.getAll();
        res.status(200).send(diary);
    } catch(err){
        res.status(500).send({error: err})
    }
}

module.exports = { index }