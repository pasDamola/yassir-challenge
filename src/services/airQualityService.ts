import AirQualityModel, { AirQuality } from "../models/AirQuality";

export const insertAirQualityData = async (data: AirQuality) => {
  try {
    const insertedData = await AirQualityModel.create(data);
    console.log("Air quality data inserted:", insertedData);
  } catch (error) {
    console.error("Error inserting air quality data:", error);
    throw error;
  }
};
