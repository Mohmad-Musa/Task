
import express from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controller/controller.task.js";

import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/CreateTask", protectRoute, createTask); 
router.get("/GetTasks", protectRoute, getAllTasks); 
router.put("/UpdateTask/:id", protectRoute, updateTask); 
router.delete("/DeleteTask/:id", protectRoute , deleteTask); 

export default router; 
