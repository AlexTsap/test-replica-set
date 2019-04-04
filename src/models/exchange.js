'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  currency: String,
  code: String,
  value: Number,
  symbol: String,
  updated: Date,
  translations: [
    {
      lang: String,
      CURRENCY_TEXT: String,
      COUNTRY_CODE: String,
      COUNTRY_NAME: String
    }
  ]
});

// footerSchema.index({'translations.lang': 1});

mongoose.model('Exchange', exchangeSchema);
