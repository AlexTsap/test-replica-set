'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 @typedef {Object} Thing - foo
 @property {String[]} thingCategory - ref to category
 @property {String[]} relatedThings - ref to things for getting thing._id
 @property {Number} rating - thing rating
 @property {String} list - list black/white
 @property {Boolean} isPublic - is public this thing or not
 @property {String} icon - url of thing icon
 @property {{text: String}[]} synonymous - synonymous of thing
 @property {String} thingName - thing name
 @property {{text: String}[]} tags - labels
 @property {String} plural - plural of thing name,
 @property {String} thingDescription - thing description
 @property {{
    lang: String,
    synonymous: {text: String}[],
    thingName: String,
    tags: {text: String}[],
    plural: String,
    thingDescription: String}[]} translations - translations of about
 */
const thingsSchema = new Schema({
  thingCategory: [{type: Schema.Types.ObjectId, ref: 'Categories'}],
  relatedThings: [{type: Schema.Types.ObjectId, ref: 'Things'}],
  /*eslint-disable*/
  rating: {type: Number, default: 0},
  /*eslint-enable*/
  list: String,
  isPublic: Boolean,
  icon: String,
  synonymous: [{text: String}],
  thingName: String,
  tags: [{text: String}],
  plural: String,
  thingDescription: String,
  translations: [{
    lang: String,
    synonymous: [{text: String}],
    thingName: String,
    tags: [{text: String}],
    plural: String,
    thingDescription: String
  }]
});

thingsSchema.index({thingName: 1}, {unique: true});
thingsSchema.index({plural: 1});
thingsSchema.index({'translations.lang': 1});
thingsSchema.index({thingName: 1, icon: 1});

mongoose.model('Things', thingsSchema);

module.exports = mongoose.model('Things');
