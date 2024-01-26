import express from "express";
import { getAirQualityController } from "../controllers/airQualityController";

const router = express.Router();

router.get("/air-quality", getAirQualityController);

export default router;
