const express = require("express");
const { Musician } = require('../models/index'); 
const router = express.Router();


router.get("/", async (req, res) => {
   try {
      const musicians = await Musician.findAll();
      res.json(musicians);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching musicians' });
   }
});

router.get("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const musician = await Musician.findByPk(id);
      if (!musician) {
         return res.status(404).json({ error: 'Musician not found' });
      }
      res.json(musician);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching musician' });
   }
});

router.post("/", async (req, res) => {
   try {
      const musician = await Musician.create(req.body);
      res.status(201).json(musician);
   } catch (error) {
      res.status(400).json({ error: 'Error creating musician' });
   }
});

router.put("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const [updated] = await Musician.update(req.body, { where: { id: id } });
      if (updated) {
         const updatedMusician = await Musician.findByPk(id);
         res.json(updatedMusician);
      } else {
         res.status(404).json({ error: 'Musician not found' });
      }
   } catch (error) {
      res.status(400).json({ error: 'Error updating musician' });
   }
});

router.delete("/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleted = await Musician.destroy({ where: { id: id } });
      if (deleted) {
         res.status(204).send();
      } else {
         res.status(404).json({ error: 'Musician not found' });
      }
   } catch (error) {
      res.status(400).json({ error: 'Error deleting musician' });
   }
});

module.exports = router;