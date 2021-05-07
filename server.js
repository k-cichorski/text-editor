const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/api/v1/save', (req, res) => {
    fs.writeFile('savedFile.json', JSON.stringify(req.body.content), 'utf8', (err) => {
      if (err) {
        res.send({
          ok: false,
          statusText: err
        });
      } else {
        res.send('ok');
      }
    });
});

app.get('/api/v1/load', (req, res) => {
  fs.readFile('savedFile.json', 'utf8', (err, content) => {
    if (err) {
      let statusText;
      if (err.errno == -4058) {
        statusText = 'No file to read from!';
      } else {
        statusText = err;
      }
      res.status(500).send({
        statusText
      });
    } else {
      res.send({
        content
      });
    }
  });
});

app.get('/public/:directory/:fileName', (req, res) => {
  const {fileName, directory} = req.params;
  console.log(directory);
  res.sendFile(path.join(__dirname, `public/${directory}/${fileName}`));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
