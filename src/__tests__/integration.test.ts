import request from "supertest";
import app, { server } from "../app";

jest.mock("../services/iqairService", () => ({
  getAirQuality: jest.fn(),
}));

describe("Integration Tests", () => {
  beforeEach(() => {
    (
      require("../services/iqairService").getAirQuality as jest.Mock
    ).mockResolvedValue({
      status: "success",
      data: {
        city: "Abuja",
        state: "FCT",
        country: "Nigeria",
        location: {
          type: "Point",
          coordinates: [7.49508, 9.05785],
        },
        current: {
          pollution: {
            ts: "2024-01-26T01:00:00.000Z",
            aqius: 170,
            mainus: "p2",
            aqicn: 122,
            maincn: "p2",
          },
          weather: {
            ts: "2024-01-26T01:00:00.000Z",
            tp: 21,
            pr: 1014,
            hu: 19,
            ws: 3.69,
            wd: 33,
            ic: "01n",
          },
        },
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    // Closing server allows Jest to exit successfully.
    server.close();
  });

  it("GET /api/air-quality should return air quality for given coordinates", async () => {
    const response = await request(app).get("/api/air-quality").query({
      latitude: 9.0563,
      longitude: 7.49508,
    });

    expect(response.status).toBe(200);
    expect(response.body.data.city).toBe("Abuja");
    expect(response.body.data.country).toBe("Nigeria");
  });

  it("GET /api/air-quality should handle errors and return 500", async () => {
    (
      require("../services/iqairService").getAirQuality as jest.Mock
    ).mockRejectedValue(new Error("Some error"));

    const response = await request(app).get("/api/air-quality").query({
      latitude: 9.0563,
      longitude: 7.49508,
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error", "Internal Server Error");
  });
});
