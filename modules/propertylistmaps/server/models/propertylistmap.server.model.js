'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Propertylistmap Schema
 */
var PropertylistmapSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Propertylistmap name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Propertylistmap', PropertylistmapSchema);
