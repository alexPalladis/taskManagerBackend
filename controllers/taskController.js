const Task = require("../models/Task");

// GET /api/tasks/test
const testApi = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "API is working!",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks
const getAllTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const queryOptions = { order: [["createdAt", "DESC"]] };
    if (status) queryOptions.where = { status };

    const tasks = await Task.findAll(queryOptions);

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title || title.trim() === "")
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });

    const validStatuses = ["pending", "in-progress", "completed"];
    const taskStatus = status || "pending";
    if (!validStatuses.includes(taskStatus))
      return res.status(400).json({
        success: false,
        message: "Status must be one of: pending, in-progress, completed",
      });

    const newTask = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : "",
      status: taskStatus,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findByPk(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    if (status) {
      const validStatuses = ["pending", "in-progress", "completed"];
      if (!validStatuses.includes(status))
        return res.status(400).json({
          success: false,
          message: "Status must be one of: pending, in-progress, completed",
        });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (status !== undefined) updateData.status = status;

    await task.update(updateData);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    await task.destroy();
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  testApi,
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
