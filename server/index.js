// server/index.js
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node + Express!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
