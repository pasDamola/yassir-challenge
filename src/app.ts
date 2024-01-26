import express from "express";
import dotenv from "dotenv";
dotenv.config();

import airQualityRoutes from "./routes/airQualityRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { logger } from "./middlewares/logger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

// Routes
app.use("/api", airQualityRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
