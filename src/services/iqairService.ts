import axios from "axios";
import AirQuality from "../models/AirQuality";

const API_KEY = process.env.IQAIR_API_KEY;

if (!API_KEY) {
  throw new Error(
    "IQAir API key is missing. Make sure to set it in the .env file."
  );
}

export const getAirQuality = async (latitude: number, longitude: number) => {
  const url = `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};

export const getAirMostPollutedTime = async () => {
  return await AirQuality.findOne({})
    .sort({ "data.current.pollution.aqius": -1 })
    .select("data.current.pollution.ts");
};
