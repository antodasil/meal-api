// Load properties
import dotenv from "dotenv";
let propertiesLoadingRes = dotenv.config({
  path: "config/properties.env",
  debug: true,
});
if (propertiesLoadingRes.error) {
  throw new Error("Failed to load properties");
}

// Express App
import express from "express";
import { Database } from "./model/database";
import defaultRouter from "./router";
import { logger } from "./utils";

// Create app
const app = express();
// Init port
const PORT = process.env.PORT || 3000;

// Load controllers and add routers
import "./controllers";
app.use(defaultRouter);

// Start server
let server = app.listen(PORT, () => {
  logger.info(`Server is running at https://localhost:${PORT}`);
});

// Shutdown server on ctrl+C
process.on("SIGINT", async () => {
  logger.info("Caught interrupt signal");
  await Database.getInstance().release();
  logger.info("Database connections released");
  server.close(() => {
    logger.info("Server closed");
  });
});
