'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} InterfaceTranslations
 */
const interfaceTranslationsSchema = new Schema({translations: []});

mongoose.model('InterfaceTranslations', interfaceTranslationsSchema);
