import express from 'express';
import { RouteLoader } from './out/router/route-loader.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Load routes
await(new RouteLoader()).loadRoutes(app);

// Start server
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
}); 
