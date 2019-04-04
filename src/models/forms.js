'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} Forms
 @property {String} name - title of forms
 @property {String} description - description of forms
 @property {{lang: String, name: String, description: String}[]} translations - translations of form
 */
const formsSchema = new Schema({
  name: String,
  description: String,
  translations: [{
    lang: String,
    name: String,
    description: String
  }]
});

formsSchema.index({name: 1}, {unique: true});
formsSchema.index({'translations.lang': 1});

mongoose.model('Forms', formsSchema);
