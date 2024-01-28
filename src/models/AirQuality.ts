import mongoose, { Document, Schema } from "mongoose";

interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

interface Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

interface Location {
  type: string;
  coordinates: number[];
}

interface Current {
  pollution: Pollution;
  weather: Weather;
}

interface AirQualityData {
  city: string;
  state: string;
  country: string;
  location: Location;
  current: Current;
}

export interface AirQuality extends Document {
  status: string;
  data: AirQualityData;
}

const pollutionSchema = new Schema<Pollution>({
  ts: String,
  aqius: Number,
  mainus: String,
  aqicn: Number,
  maincn: String,
});

const weatherSchema = new Schema<Weather>({
  ts: String,
  tp: Number,
  pr: Number,
  hu: Number,
  ws: Number,
  wd: Number,
  ic: String,
});

const locationSchema = new Schema<Location>({
  type: String,
  coordinates: [Number],
});

const currentSchema = new Schema<Current>({
  pollution: pollutionSchema,
  weather: weatherSchema,
});

const airQualityDataSchema = new Schema<AirQualityData>({
  city: String,
  state: String,
  country: String,
  location: locationSchema,
  current: currentSchema,
});

const airQualitySchema = new Schema<AirQuality>({
  status: String,
  data: airQualityDataSchema,
});

const AirQualityModel = mongoose.model<AirQuality>(
  "AirQuality",
  airQualitySchema
);

export default AirQualityModel;
