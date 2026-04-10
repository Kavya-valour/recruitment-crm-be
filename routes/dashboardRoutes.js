import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> da0db0d (backend project setup)
