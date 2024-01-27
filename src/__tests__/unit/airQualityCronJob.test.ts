import { fetchAirQualityCronJob } from "../../cronJob/airQualiityCronJob";
import { getAirQuality } from "../../services/iqairService";

jest.mock("../../services/iqairService");

describe("Air quality cron job tests", () => {
  it("should return france air quality", async () => {
    (getAirQuality as jest.Mock).mockResolvedValue({
      status: "success",
      data: {
        city: "Paris",
        state: "Ile-de-France",
        country: "France",
        location: {
          type: "Point",
          coordinates: [2.351666, 48.859425],
        },
        current: {
          pollution: {
            ts: "2024-01-26T18:00:00.000Z",
            aqius: 28,
            mainus: "o3",
            aqicn: 21,
            maincn: "o3",
          },
          weather: {
            ts: "2024-01-26T18:00:00.000Z",
            tp: 7,
            pr: 1035,
            hu: 64,
            ws: 2.57,
            wd: 330,
            ic: "01n",
          },
        },
      },
    });

    const PARIS_LATITUDE = 48.856613;
    const PARIS_LONGITUDE = 2.352222;

    await fetchAirQualityCronJob();

    expect(getAirQuality).toHaveBeenCalledWith(PARIS_LATITUDE, PARIS_LONGITUDE);
  });
});
