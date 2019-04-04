'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} Info
 @property {String} context - context of info,
 @property {{lang: String, context: String}[]} translations - translations of info
 */
const infoSchema = new Schema({
  context: String,
  translations: [{
    lang: String,
    context: String
  }]
});

mongoose.model('Info', infoSchema);
