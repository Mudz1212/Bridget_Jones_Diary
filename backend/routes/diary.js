const { Router } = require("express");
const diaryController = require("../controllers/diary");

const diaryRouter = Router();

diaryRouter.get("/", diaryController.index);
//maybe do as query so can do id and category
diaryRouter.get("/:id", diaryController.show);
diaryRouter.post("/", diaryController.create);
diaryRouter.delete("/:id", diaryController.remove);
diaryRouter.patch("/:id", diaryController.update);

module.exports = diaryRouter;