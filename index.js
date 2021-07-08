const express = require('express');
const app = express();
const PORT = 3000;

const routeLoader = require('./out/router/RouteLoader.js');
(new routeLoader.RouteLoader()).loadRoutes(app).then(() => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});
