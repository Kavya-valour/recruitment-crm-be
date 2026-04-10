import express from "express";
import { register, login, resetUserPassword } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// ✅ RESET PASSWORD (ADMIN ONLY)
router.post("/reset-password", protect, authorize("admin"), resetUserPassword);

export default router;