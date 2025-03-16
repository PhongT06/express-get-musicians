const express = require("express");
const app = require("./src/app");
const { db } = require("./db/connection")
const port = 3000;
const musiciansRouter = require("./routes/musicians")

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/musicians', require('./routes/musicians'));
app.use('/bands', require('./routes/bands'));

app.listen(port, () => {
    db.sync();
    console.log(`Listening at http://localhost:${port}/musicians`)
})


module.exports = app;