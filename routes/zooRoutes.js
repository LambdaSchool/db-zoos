// NODE MODULES, EXPRESS ROUTER
// ==============================================
const express = require('express');
const zooDb = require('../data/helpers/zooDb.js');

const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const zoos = await zooDb.get();
    res.status(200).json(zoos);
  } catch {
    res.status(500).json({ error: 'There was an error retrieving all Zoos!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const zoo = await zooDb.get(req.params.id);
    zoo
      ? res.status(200).json(zoo)
      : res.status(404).json({ error: 'The zoo with the specified ID does not exist.' });
  } catch {
    res.status(500).json({ error: "There was an error retrieving the Zoo's information!" });
  }
});

router.post('/', async (req, res) => {
  if (req.body.name) {
    try {
      const addedZoo = await zooDb.insert(req.body);
      const zoo = await zooDb.get(addedZoo.id);
      res.status(201).json(zoo);
    } catch {
      res.status(500).json({ error: 'There was an error saving the zoo to the database.' });
    }
  } else res.status(400).json({ error: 'Please provide a name for the zoo.' });
});

module.exports = router;
