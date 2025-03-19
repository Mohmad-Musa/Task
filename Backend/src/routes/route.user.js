import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controller/controller.user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

export default router;
