const { Router } = require("express");
const diaryController = require("../controllers/diary");

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
diaryRouter.get("/id/:id", diaryController.showId);
diaryRouter.get("/date/:date", diaryController.showDate);
diaryRouter.get("/category/:category", diaryController.showCategory);
diaryRouter.post("/", diaryController.create);
diaryRouter.delete("/:id", diaryController.remove);
diaryRouter.patch("/:id", diaryController.update);

module.exports = diaryRouter;