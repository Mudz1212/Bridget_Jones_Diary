const Diary = require("../models/Diary");

async function index(req, res) {
    try{
        const diary = await Diary.getAll();
        res.status(200).send(diary);
    } catch(err){
        res.status(500).send({error: err})
    }
}

async function showId(req, res) {
    try {
        let id = req.params.id;
        const entry = await Diary.getById(id);
        res.status(200).json(entry)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showDate(req, res) {
    try {
        let date = req.params.date;
        const entry = await Diary.getByDate(date);
        res.status(200).json(entry)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function showCategory(req, res) {
    try {
        let category = req.params.category;
        const entry = await Diary.getByCategory(category);
        res.status(200).json(entry)
    } catch(err) {
        res.status(404).json({error: err.message})
    }
}

async function create(req, res) {
  try {
    const data = req.body;
    const entry = await Diary.create(data);
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
}

async function remove(req, res) {
  try {
    const id = parseInt(req.params.id);
    const entry = await Diary.getById(id);
    const result = await entry.remove();
    res.status(204).json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const entry = await Diary.getById(id);
    const result = await entry.update(data);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ "error": err.message })
  }
}


module.exports = { index, showId, showDate, showCategory, create, remove, update }