'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} Thing - foo
 @property {String[]} popularThings - ref to things for getting thing._id
 @property {String[]} allTopics - ref to things for getting thing._id
 */
const thingsFilterSchema = new Schema({
  popularThings: [{type: Schema.Types.ObjectId, ref: 'Things'}],
  allTopics: [{type: Schema.Types.ObjectId, ref: 'Things'}]
});

mongoose.model('ThingsFilter', thingsFilterSchema);
