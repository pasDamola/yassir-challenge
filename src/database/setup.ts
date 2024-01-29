import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/airquality"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};
