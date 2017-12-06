'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Listingproperty Schema
 */
var ListingpropertySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill property name',
    trim: true
  },
  address: {
    type: String,
    default: '',
    required: 'Please fill property address',
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  unit: {
    type: String,
    default: '',
    required: 'Please fill property unit',
    trim: true
  },
  propertyImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  noofbedroom: {
    type: Number,
    default: '',
    required: 'Please enter number of bedrooms',
    trim: true
  },
  propertydescription: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    default: '',
    required: 'Please enter prices'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  flagValue: {
    type: Number,
    default: '0'
  },
content: {
    type: String,
    default: '',
    trim: true
},
lat:{
    type: Number,
    default: 0,
    trim: true
},
lon:{
    type: Number,
    default: 0,
    trim: true
},
  contactnumber: {
    type: Number,
    default: '',
    required: 'Please enter Phone number'
  },
  propertyVerificationFlag: {
    type: Number,
    default: '0'
  }

});

mongoose.model('Listingproperty', ListingpropertySchema);
