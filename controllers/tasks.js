const Task = require("../models/task");
const asyncWrapper = require("../Middleware/async");
const notFound = require("../Middleware/not-Found");
const customError = require("../Middleware/error-handler");
const { createCustomError } = require("../errors/customErrors");
const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
});
const createTasks = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(task);
});
const getTasks = asyncWrapper( async (req, res, next) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});
const deleteTasks = asyncWrapper( async (req, res) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return next(createCustomError(`no task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});
const updateTasks = asyncWrapper( async (req, res) => {
  
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return next(createCustomError(`no task with id: ${taskID}`, 404))
    }
    res.status(200).json({ task });
});
module.exports = {
  getAllTasks,
  createTasks,
  getTasks,
  updateTasks,
  deleteTasks,
};
