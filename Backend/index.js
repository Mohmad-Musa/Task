import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";
import userRoute from "./src/routes/route.user.js";
import cookieParser from "cookie-parser";
import TaskRoute from "./src/routes/route.task.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json()); 

app.use("/api/users", userRoute);
app.use("/api/tasks", TaskRoute);

const PORT = process.env.PORT || 5001;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Unable to sync DB:", err);
  });
