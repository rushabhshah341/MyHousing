'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Propertylistmap = mongoose.model('Propertylistmap'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Propertylistmap
 */
exports.create = function(req, res) {
  var propertylistmap = new Propertylistmap(req.body);
  propertylistmap.user = req.user;

  propertylistmap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(propertylistmap);
    }
  });
};

/**
 * Show the current Propertylistmap
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var propertylistmap = req.propertylistmap ? req.propertylistmap.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  propertylistmap.isCurrentUserOwner = req.user && propertylistmap.user && propertylistmap.user._id.toString() === req.user._id.toString();

  res.jsonp(propertylistmap);
};

/**
 * Update a Propertylistmap
 */
exports.update = function(req, res) {
  var propertylistmap = req.propertylistmap;

  propertylistmap = _.extend(propertylistmap, req.body);

  propertylistmap.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(propertylistmap);
    }
  });
};

/**
 * Delete an Propertylistmap
 */
exports.delete = function(req, res) {
  var propertylistmap = req.propertylistmap;

  propertylistmap.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(propertylistmap);
    }
  });
};

/**
 * List of Propertylistmaps
 */
exports.list = function(req, res) {
  Propertylistmap.find().sort('-created').populate('user', 'displayName').exec(function(err, propertylistmaps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(propertylistmaps);
    }
  });
};

/**
 * Propertylistmap middleware
 */
exports.propertylistmapByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Propertylistmap is invalid'
    });
  }

  Propertylistmap.findById(id).populate('user', 'displayName').exec(function (err, propertylistmap) {
    if (err) {
      return next(err);
    } else if (!propertylistmap) {
      return res.status(404).send({
        message: 'No Propertylistmap with that identifier has been found'
      });
    }
    req.propertylistmap = propertylistmap;
    next();
  });
};
