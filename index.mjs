import express from 'express';
import { RouteLoader } from './out/router/RouteLoader.js';

const app = express();
const PORT = 3000;

(new RouteLoader()).loadRoutes(app).then(() => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
