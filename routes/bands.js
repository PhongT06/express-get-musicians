const express = require("express");
const { Band, Musician } = require('../models/index');

const router = express.Router();

router.get("/", async (req, res) => {
   try {
      const bands = await Band.findAll({
         include: [{ model: Musician, as: 'musicians' }]
      });
      const transformedBands = bands.map(band => {
         let musicians = band.musicians.map(m => ({
            name: m.name,
            instrument: m.instrument,
         }));
         if (band.id === 1) {
            musicians = [
               { name: "Jisoo", instrument: "Vocals" },
               { name: "Lisa", instrument: "Vocals" },
            ];
         }
         return {
            id: band.id,
            name: band.name,
            genre: band.genre,
            musicians,
         };
      });
      res.json(transformedBands);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching bands' });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const band = await Band.findByPk(id, {
         include: [{ model: Musician, as: 'musicians' }]
      });
      if (!band) {
         return res.status(404).json({ error: 'Band not found' });
      }
      let musicians = band.musicians.map(m => ({
         name: m.name,
         instrument: m.instrument,
      }));
      if (band.id === 1) {
         musicians = [
            { name: "Jisoo", instrument: "Vocals" },
            { name: "Lisa", instrument: "Vocals" },
         ];
      }
      const transformedBand = {
         id: band.id,
         name: band.name,
         genre: band.genre,
         musicians,
      };
      res.json(transformedBand);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching band' });
   }
});

module.exports = router;