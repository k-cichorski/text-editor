const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/:directory/:fileName', (req, res) => {
  const {fileName, directory} = req.params;
  res.sendFile(path.join(__dirname, `/${directory}/${fileName}`));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
