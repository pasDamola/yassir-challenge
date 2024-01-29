import { Request, Response } from "express";
import {
  getAirQuality,
  getAirMostPollutedTime,
} from "../services/iqairService";

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

export const getMostPollutedTimeController = async (
  _req: Request,
  res: Response
) => {
  try {
    const mostPollutedTime = await getAirMostPollutedTime();

    if (!mostPollutedTime) {
      return res.status(404).json({ error: "No records found" });
    }

    res.json({
      mostPollutedTime: mostPollutedTime.data.current.pollution.ts,
    });
  } catch (error) {
    console.error("Error retrieving most polluted time stamp:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
