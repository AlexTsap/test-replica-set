'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} InterfaceTranslations
 @property {{lang: String, interface: {}}[]} translations - translations fields
 */
const contentTranslationsSchema = new Schema({
  label: String,
  name: String,
  key: String,
  value: String,
  translations: [{
    lang: String,
    value: String
  }]
});

contentTranslationsSchema.index({'translations.lang': 1});

mongoose.model('ContentTranslations', contentTranslationsSchema);
