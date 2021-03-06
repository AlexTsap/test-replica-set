'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} About
 @property {Number} position - sort by position
 @property {String} name - title of about
 @property {String} description - description of about
 @property {{lang: String, name: String, description: String}[]} translations - translations of about
 */
const aboutSchema = new Schema({
  position: Number,
  name: String,
  description: String,
  translations: [{
    lang: String,
    name: String,
    description: String
  }]
});

aboutSchema.index({'translations.lang': 1});

mongoose.model('About', aboutSchema);
