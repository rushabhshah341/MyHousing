'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Allpackage Schema
 */
var AllpackageSchema = new Schema({
  packageName: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  expDate: {
    type: Date,
    default: +new Date() + 365*24*60*60*1000
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Allpackage', AllpackageSchema);
