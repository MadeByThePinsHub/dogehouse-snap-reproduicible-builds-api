// import deps
const express = require("express");
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/docs', (req, res) =>{
    res.sendFile(__dirname + '/src/docs.txt')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server-up: Example app listening at http://localhost:${port}`)
})