'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var NoteSchema = new Schema({
  sn : { type : String, required : true },
  start : { type : Date, required : true },
  tag : [String],
  type : {type : String, required : true},
  time : {type : Date, default : Date.now },
  value : { type: String }
});

NoteSchema.path('tag').set(function(val) {
  if (val === undefined) {
    return val;
  }

  if (util.isArray(val)) {
    return val;
  }

  return val.split(',');
});

var models = {
  Note : mongoose.model('notes', NoteSchema)
};

module.exports = models;
