const express = require("express");
const app = express();
const { db } = require("../db/connection")
const musiciansRouter = require("../routes/musicians")
const bandsRouter = require("../routes/bands")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/musicians', musiciansRouter);
app.use('/bands', bandsRouter);

if (require.main === module) {
   app.listen(port, () => {
      db.sync();
      console.log(`Listening at http://localhost:${port}/musicians and /bands`);
   });
}

module.exports = app;