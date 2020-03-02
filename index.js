const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))


app.get('/IMS', (req, res) => res.send('Hello World From IMS!'))

var server = app.listen(3000, () => {
    console.log("Listening on port " + server.address().port + "...");
});



