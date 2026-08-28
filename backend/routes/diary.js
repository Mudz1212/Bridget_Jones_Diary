const { Router } = require("express");
const diaryController = require("../controllers/diary");

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);

module.exports = diaryRouter;