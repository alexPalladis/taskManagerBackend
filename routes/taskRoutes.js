const express = require("express");
const {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  testApi,
  updateTask,
} = require("../controllers/TaskController");

const router = express.Router();

router.get("/test", testApi);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
