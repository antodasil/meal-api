const express = require('express');
const app = express();
const PORT = 3000;

app.get('/hello', (_, res) => res.json('Hello world !'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});