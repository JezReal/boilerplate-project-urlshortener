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

app.get("/api/shorturl/:index", (request, response) => {
  const shortUrl = request.params["index"];
  const site = urls[shortUrl - 1];

  response.redirect(site.original_url);
});

app.post("/api/shorturl", (request, response) => {
  const requestUrl = request.body.url.toString();
  const replaceHttps = /^https?:\/\//i;

  const formattedUrl = requestUrl.replace(replaceHttps, "");

  dns.lookup(formattedUrl, { all: true }, (error, addreses) => {
    if (error) {
      response.json({ error: "invalid url" });
    } else {
      urls.push({ original_url: `https://${formattedUrl}`, short_url: urls.length + 1});
      response.json({
        original_url: requestUrl,
        short_url: urls.length + 1
      });
    }
  });
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
