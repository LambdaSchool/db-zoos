const express = require('express');
const helmet = require('helmet');
const knex = require('knex');


const dbConfig= require('./knexfile.js');
const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
function checkName(req, res, next) {
  let body = req.body
  if (body.name.length !== 0) {
    next();
  } else {
    res.status(500).json({ error: 'Name must exist' })
  }

}
server.post('/api/zoos', checkName, (req, res) => {
  const zoo = req.body;
  db.insert(zoo).into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res.status(500).json({ error: 'I could not post this zoo.' }));

});
server.get('/api/zoos', (req, res)=> {
  db('zoos')
  .then(zoos=> {
    res.status(201).json(zoos);
  })
  .catch(err =>
    res.status(500).json({error: 'I could not get zoos'}));

})
server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos')
  .where('id', id)
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(err =>
      res.status(500).json({ error: 'I could not get zoo by ID' }));

});
server.delete('/api/zoos/:id', (req, res) => {
  const id= req.params.id;
  db('zoo')
  .where('id', id)
  .del()
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(err =>
      res.status(500).json({ error: 'I could not delete that ID.' }));

})

server.put('/api/zoos/:id', checkName, (req, res) => {
  const [id, body] = [req.params.id, req.body];
  db('zoos')
    .where('id', id)
    .update('name', body.name)
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(err =>
      res.status(500).json({ error: "I could not update zoo by that ID " }));
})
server.post('/api/bears', checkName, (req, res) => {
  const bear = req.body;
  db.insert(bear)
    .into("bears")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err =>
      res.status(500).json({ error: "I could not post this bear." })
    );
});

server.get('/api/bears', (req, res) => {
  db("bears")
    .then(bears => {
      res.status(201).json(bears);
    })
    .catch(err => res.status(500).json({ error: "I could not get bears" }));
})


server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  db("bears")
    .where("id", id)
    .then(bears => {
      res.status(201).json(bears);
    })
    .catch(err => res.status(500).json({ error: "I could not get bear by that ID" }));
})

server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id;
  db('bears')
    .where('id', id)
    .del()
    .then(bears => {
      res.status(201).json(bears);
    })
    .catch(err =>
      res.status(500).json({ error: "I could not delete bear by that ID." }));
})

server.put('/api/bears/:id', checkName, (req, res) => {
  const [id, body] = [req.params.id, req.body];
  db('bears')
    .where('id', id)
    .update('name', body.name)
    .then(bears => {
      res.status(201).json(bears);
    })
    .catch(err =>
      res.status(500).json({ error: "I could not update the bear by that ID." }));
})

