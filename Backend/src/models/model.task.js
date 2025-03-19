import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      len: {
        args: [0, 100], 
        msg: "Description must be 500 characters or less",
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

export default Task;
