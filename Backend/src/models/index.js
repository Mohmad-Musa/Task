import sequelize from "../config/db.js";
import User from "./model.user.js";
import Task from "./model.task.js";

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

export { sequelize, User, Task };
