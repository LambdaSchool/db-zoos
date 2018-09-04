const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const zooRoutes = require("./Routes/zooRoutes");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/zoos", zooRoutes);

// endpoints here

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
