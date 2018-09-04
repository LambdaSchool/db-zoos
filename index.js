const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();

const dbConfig = require("./knexfile"); 
const db = knex(dbConfig.development); 


server.use(express.json());
server.use(helmet());


// endpoints here
server.get("/", (req, res)=>{
  res.send("testing..."); 
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
      .then(zoos => {
          res.status(200).json(zoos);
      })
      .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
