import express from "express";
<<<<<<< HEAD
<<<<<<< HEAD
import { register, login, resetUserPassword } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
=======
import { register, login } from "../controllers/authController.js";
>>>>>>> da0db0d (backend project setup)
=======
import { register, login, resetUserPassword } from "../controllers/authController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
>>>>>>> 434a8b7 (final attendance report + offer letter)

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 434a8b7 (final attendance report + offer letter)
router.post("/reset-password", protect, authorize("admin"), resetUserPassword);

export default router;
=======

export default router;
>>>>>>> da0db0d (backend project setup)
