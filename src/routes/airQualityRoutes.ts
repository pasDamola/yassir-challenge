import express from "express";
import {
  getAirQualityController,
  getMostPollutedTimeController,
} from "../controllers/airQualityController";

const router = express.Router();

router.get("/air-quality", getAirQualityController);
router.get("/most-polluted-time", getMostPollutedTimeController);

export default router;
