// import deps
const express = require("express");
const app = express();
//require('dotenv').parse()
app.get('/', (req, res) => {
    if (process.env.BLOCK_TRAFFIC != undefined) {
      // We use the error code 418 to stay bots away
      // if we decided to block every traffic.
      res.status(418).json({okay: false, error: "Traffic is currwntly blocked by the server itself.", code: 418});
    } else {
      res.status(200).json({ok: true, description: "We're up!"})
    };
});

// We may leave the docs stuff up
app.get('/api/docs', (req, res) => {
    // Basic usages stufd
    res.sendFile(__dirname + '/src/docs.txt')
})
app.get('/docs', (req, res) => {
    // For now, let's do the redirect first.
    res.redirect("/api/docs");
})

app.get('/install', (req, res) => {
    res.sendFile(__dirname + "/src/install-snap-x1.sh")
})

app.get('/api/dl/latest', (req, res) => {
    res.status(404).json({okay: false, error: "Download link not available", code: 404})
})

// debug tools to help us
app.get('/api/debug', (req, res) => {
    res.status(201).json({headers: req.headers})
})
app.post('/api/debug', (req, res) => {
    res.status(201).json({parms: req.parms, headers: req.headers})
})

// handle errors here
app.use(function (req, res, next) {
  res.status(404).json({ok: false, error: "The endpoint you attempting to access is either not found or the URL path is wrong.", code: 404})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server-up: Now listening at http://localhost:${port}`)
})
