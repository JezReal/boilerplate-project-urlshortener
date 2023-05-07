require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dns = require("dns");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const urls = [];

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// app.get("/api/shorturl/:url", (request, response) => {
//   const shortUrl = request.params["url"];
//   const site = urls[shortUrl - 1];

//   response.redirect(site.original_url);
// });

app.post("/api/shorturl", (request, response) => {
  const requestUrl = request.body.url.toString();
  const replaceHttps = /^https?:\/\//i;

  const formattedUrl = requestUrl.replace(replaceHttps, "");

  dns.lookup(formattedUrl, { all: true }, (error, addreses) => {
    if (error) {
      response.json({ error: "invalid url" });
    } else {
      const url = { 'original_url': requestUrl, short_url: urls.length + 1};

      urls.push(url);
      response.json(url);
    }
  });
});

app.get("/api/thing", (request, response) => {
  console.log('called');
  response.sendStatus(200);
})

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
