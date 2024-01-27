import { Request, Response } from "express";
import { getAirQualityController } from "../../controllers/airQualityController";
import { getAirQuality } from "../../services/iqairService";

jest.mock("../../services/iqairService");

describe("Air Quality Controller Unit Tests", () => {
  it("should return air quality", async () => {
    const mockRequest = {
      query: { latitude: 35.98, longitude: 140.33 },
    } as unknown as Request;
    const mockResponse = { json: jest.fn() } as unknown as Response;

    (getAirQuality as jest.Mock).mockResolvedValue({
      status: "success",
      data: {
        city: "Inashiki",
        state: "Ibaraki",
        country: "Japan",
        location: {
          type: "Point",
          coordinates: [140.32356, 35.95633],
        },
        current: {
          pollution: {
            ts: "2024-01-26T00:00:00.000Z",
            aqius: 2,
            mainus: "n2",
            aqicn: 6,
            maincn: "n2",
          },
          weather: {
            ts: "2024-01-26T00:00:00.000Z",
            tp: 6,
            pr: 1012,
            hu: 40,
            ws: 6.69,
            wd: 280,
            ic: "01d",
          },
        },
      },
    });

    await getAirQualityController(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        city: "Inashiki",
        state: "Ibaraki",
        country: "Japan",
        location: {
          type: "Point",
          coordinates: [140.32356, 35.95633],
        },
        current: {
          pollution: {
            ts: "2024-01-26T00:00:00.000Z",
            aqius: 2,
            mainus: "n2",
            aqicn: 6,
            maincn: "n2",
          },
          weather: {
            ts: "2024-01-26T00:00:00.000Z",
            tp: 6,
            pr: 1012,
            hu: 40,
            ws: 6.69,
            wd: 280,
            ic: "01d",
          },
        },
      },
    });
  });

  it("should handle errors and return 500", async () => {
    const mockRequest = {
      query: { latitude: 35.98, longitude: 140.33 },
    } as unknown as Request;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    const mockResponse = { status: mockStatus } as unknown as Response;

    (getAirQuality as jest.Mock).mockRejectedValue(new Error("Some error"));

    await getAirQualityController(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });

  it("should handle missing latitude and longitude and return 400", async () => {
    const mockRequest = { query: {} } as Request;
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });

    const mockResponse = { status: mockStatus } as unknown as Response;

    await getAirQualityController(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Latitude and Longitude are required.",
    });
  });
});
