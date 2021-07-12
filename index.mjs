import express from 'express';
import { RouteLoader } from './out/router/route-loader.js';
import dotenv from 'dotenv';
import tsconfigPath from 'tsconfig-paths';

// To use tsconfig.paths
tsconfigPath.register();

// Load properties
let propertiesLoadingRes = dotenv.config({path: 'config/properties.env', debug: true});
if(propertiesLoadingRes.error) {
    throw new Error("Failed to load properties");
}

// Create app
const app = express();
// Init port
const PORT = process.env.PORT || 3000;

// Load routes
await(new RouteLoader()).loadRoutes(app);

// Start server
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
}); 
