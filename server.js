// import deps
const express = require("express");
const app = express();
require("dotenv").config();

console.log("server-env: BLOCK_TRAFFIC is set to " + process.env.BLOCK_TRAFFIC);
console.log("server-env: NODE_ENV is set to " + process.env.NODE_ENV);

app.get("/", (req, res) => {
  if (process.env.BLOCK_TRAFFIC != undefined) {
    // We use the error code 418 to stay bots away
    // if we decided to block every traffic.
    console.error(
      "server-warn: An client attempting to connect to the API but it been blocked due to BLOCK_TRAFFIC is defined.",
    );
    console.error("server-error: Client has the following headers:");
    console.error(req);
    res.status(418).json({
      okay: false,
      error: "Traffic is currently blocked by the server itself.",
      code: 418,
    });
  } else {
    res.status(200).json({ ok: true, description: "We're up!" });
  }
});

// We may leave the docs stuff up
app.get("/api/docs", (req, res) => {
  // Basic usages stuff
  res.sendFile(__dirname + "/src/docs.txt");
});
app.get("/docs", (req, res) => {
  // For now, let's do the redirect first.
  res.redirect("/api/docs");
});

// Install script
app.get("/install", (req, res) => {
  res.sendFile(__dirname + "/src/install-snap-x1.sh");
});

// Download stuff
//const latestVersion = require('./src/builds/latest.json');
//const availableBuilds = require('./src/builds');

app.get("/api/v1/dl/latest", (req, res) => {
  res
    .status(404)
    .json({ okay: false, error: "Download link not available", code: 404 });
});
app.get("/api/v1/versions", (req, res) => {
  res.status(200).json({
    ok: true,
    data: { latest: "latestVersion", availableBuilds: "availableBuilds" },
  });
});

// debug tools to help us
// TODO: Make them available on devmode.
app.get("/api/v1/debug", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    console.log(req);
    res.status(200).send("Request sent to server logs.");
  } else {
    res.status(501).send({
      ok: false,
      error: "HTTP Request Debugger is disabled on this instance.",
      code: 501,
    });
  }
});
app.post("/api/v1/debug", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    console.log(req);
    res.status(200).send("Request sent to server logs.");
  } else {
    res.status(501).send({
      ok: false,
      error: "HTTP Request Debugger is disabled on this instance.",
      code: 501,
    });
  }
});
app.delete("/api/v1/debug", (req, res) => {
  if (process.env.NODE_ENV == "development") {
    console.clear();
    res.status(201).send("Successfully cleared");
  } else {
    res.status(501).send({
      ok: false,
      error: "HTTP Request Debugger is disabled on this instance.",
      code: 501,
    });
  }
});

// handle 404 errors here
app.use(function (req, res, next) {
  res.status(404).json({
    ok: false,
    error:
      "The endpoint you attempting to access is either not found or the URL path is wrong or you're attempting to do an POST in an GET-only endpoint.",
    code: 404,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server-up: Now listening at http://localhost:${port}`);
});
