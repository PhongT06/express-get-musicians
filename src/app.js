const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async (req, res) => {
   const musicians = await Musician.findAll();
   res.json(musicians);
});

app.get('/musicians/:id', async (req, res) => {
   const id = req.params.id;
   const musician = await Musician.findByPk(id);
   res.json(musician);
});

app.post('/musicians', async (req, res) => {
   try {
      const musician = await Musician.create(req.body);
      res.json(musician);
   } catch (error) {
      res.status(400).json('Error creating musician');
   }
});

app.put('/musicians/:id', async (req, res) => {
   try {
      const id = req.params.id;
      await Musician.update(req.body, {
         where: { id: id }
      })
      const updatedMusician = await Musician.findByPk(id);
      res.json(updatedMusician);
   } catch (error) {
      res.status(400).json('Error updating musician');
   }
});

app.delete('/musicians/:id', async (req, res) => {
   try {
      const id = req.params.id;
      await Musician.destroy({
         where: { id: id }
      })
      res.status(204).send();
   } catch (error) {
      res.status(400).json('Error deleting musician');
   }
});

module.exports = app;