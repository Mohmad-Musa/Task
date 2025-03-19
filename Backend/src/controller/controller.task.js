
import { Task } from "../models/index.js";
 


export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id; 

  if (!title || !description || !status) {
    return res
      .status(400)
      .json({ message: "Title, description, and status are required" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      userId,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or you do not have permission" });
    }

 if (title) task.title = title;
 if (description) task.description = description;
 if (status) task.status = status; 
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or you do not have permission" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
