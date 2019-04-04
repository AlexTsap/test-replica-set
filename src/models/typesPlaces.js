'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} TypesPlaces
 @property {String} name - name of place type
 @property {{lang: String, name: String}[]} translations - translations of type of places
 */
const typesPlacesSchema = new Schema({
  name: String,
  translations: [{
    lang: String,
    name: String
  }]
});

typesPlacesSchema.index({name: 1}, {unique: true});
typesPlacesSchema.index({'translations.lang': 1});

mongoose.model('TypesPlaces', typesPlacesSchema);
