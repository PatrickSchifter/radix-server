import express from "express";
import authRoutes from "./authRoutes";
import equipmentRoutes from "./equipmentRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/equipment", equipmentRoutes);

export default router;
