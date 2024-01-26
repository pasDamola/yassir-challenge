// src/controllers/airQualityController.ts
import { Request, Response } from "express";
import { getAirQuality } from "../services/iqairService";

export const getAirQualityController = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "Latitude and Longitude are required." });
    }

    const airQuality = await getAirQuality(Number(latitude), Number(longitude));
    res.json(airQuality);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
