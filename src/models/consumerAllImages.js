'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @typedef {Object} ConsumerThumbnails
 * @property {Boolean} all - show all things on consumer from one place
 */
const consumerThumbnails = new Schema({all: Boolean});

mongoose.model('ConsumerThumbnails', consumerThumbnails);
