import express from "express";
import dotenv from "dotenv";
import tsconfigPath from "tsconfig-paths";
import { Database } from "./out/model/database.js";
import {
  publicRouter,
  privateRouter,
} from "./out/decorators/route.decorator.js";

// To use tsconfig.paths
tsconfigPath.register();

// Load properties
let propertiesLoadingRes = dotenv.config({
  path: "config/properties.env",
  debug: true,
});
if (propertiesLoadingRes.error) {
  throw new Error("Failed to load properties");
}

// Create app
const app = express();
// Init port
const PORT = process.env.PORT || 3000;

// [DEPRECATED] Load routes
// const router = await new RouteLoader().getRouter();
// app.use("/", router);

// Load controllers
import "./out/controllers/index.js";
app.use("/", publicRouter);
app.use("/", privateRouter);

// Start server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
