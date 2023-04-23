require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const urls = [];

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/shorturl", (request, response) => {

});

app.get("/api/shorturl/:url", (request, response) => {
  const shortUrl = request.params['url'];
  let urlIndex;

  try {
    urlIndex = parseInt(shortUrl);
  } catch(error) {
    response.redirect("https://github.com//JezReal/");
    return;
  }

  const site = urls[urlIndex];

  if (!site) {
    response.redirect("https://github.com//JezReal/");
    return;
  }

  response.redirect(site);
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
