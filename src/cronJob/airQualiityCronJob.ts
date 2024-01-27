import { schedule } from "node-cron";
import { getAirQuality } from "../services/iqairService";

export const fetchAirQualityCronJob = async () => {
  const PARIS_LATITUDE = 48.856613;
  const PARIS_LONGITUDE = 2.352222;

  try {
    const latitude = PARIS_LATITUDE;
    const longitude = PARIS_LONGITUDE;

    const airQuality = await getAirQuality(latitude, longitude);

    // Do something with the air quality data, e.g., store it in a database
    console.log(airQuality); // Temporary logging for demonstration
  } catch (error) {
    console.error(error);
  }
};

export const airQualityCron = schedule("* * * * *", async () => {
  // Run every minute
  await fetchAirQualityCronJob();
});
