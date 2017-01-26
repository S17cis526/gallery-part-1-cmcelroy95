"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var port = 3000;

var server = http.createServer((req, res) => {
  res.end("OK");
});

server.listen(port, ()=>{
  console.log("Listening on Port " + port);
});
