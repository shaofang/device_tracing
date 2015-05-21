'use strict';

var restify = require('restify');
var mongoose = require('mongoose');
var restifyMongoose = require('restify-mongoose');
var models = require('./models');

mongoose.connect('mongodb://localhost/smartisan_at_note');

var server = restify.createServer({
  name: 'restify.mongoose.examples.notes',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

var notes = restifyMongoose(models.Note);

// Serve model Notes as a REST API
server.get('/notes', notes.query());
server.get('/notes/:id', notes.detail());
server.post('/notes', notes.insert());
server.patch('/notes/:id', notes.update());
server.del('/notes/:id', notes.remove());

// Serve model Note as a REST API
restifyMongoose(models.Note).serve('/api/notes', server);

// Public route to serve angular.js app and html/js/css files
server.get(/.*/, restify.serveStatic({
  directory: 'public',
  default: 'index.html'
}));

server.listen(3000, function () {
  console.log('%s listening at %s. Point your browser to "%s/public/index.html" to see the angular UI in action!', server.name, server.url, server.url);
});
