const Task = require('../models/Task');
const { Types } = require('mongoose');

const isValidObjectId = (id) => Types.ObjectId.isValid(id);

const getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json(task);
};

const createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.create({ title, description, completed });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json(task);
};

const deleteTask = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }

  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  return res.status(200).json({ message: 'Task deleted successfully' });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
