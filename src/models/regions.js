'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} Regions
 @property {String} name - name of regions
 @property {{lang: String, name: String}[]} translations - translations of region
 */
const regionsSchema = new Schema({
  name: String,
  translations: [{
    lang: String,
    name: String
  }]
});

mongoose.model('Regions', regionsSchema);
