import express from "express";
import authRoutes from "./authRoutes";
import equipmentRoutes from "./equipmentRoutes";
import sensorReadingRoutes from "./sensorReadingRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/sensor-reading", sensorReadingRoutes);

export default router;
