'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Allpackage = mongoose.model('Allpackage'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Allpackage
 */
exports.create = function(req, res) {
  var allpackage = new Allpackage(req.body);
  allpackage.user = req.user;

  allpackage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(allpackage);
    }
  });
};

/**
 * Show the current Allpackage
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var allpackage = req.allpackage ? req.allpackage.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  allpackage.isCurrentUserOwner = req.user && allpackage.user && allpackage.user._id.toString() === req.user._id.toString();

  res.jsonp(allpackage);
};

/**
 * Update a Allpackage
 */
exports.update = function(req, res) {
  var allpackage = req.allpackage;

  allpackage = _.extend(allpackage, req.body);

  allpackage.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(allpackage);
    }
  });
};

/**
 * Delete an Allpackage
 */
exports.delete = function(req, res) {
  var allpackage = req.allpackage;

  allpackage.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(allpackage);
    }
  });
};

/**
 * List of Allpackages
 */
exports.list = function(req, res) {
  Allpackage.find().sort('-created').populate('user', 'displayName').exec(function(err, allpackages) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(allpackages);
    }
  });
};

/**
 * Allpackage middleware
 */
exports.allpackageByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Allpackage is invalid'
    });
  }

  Allpackage.findById(id).populate('user', 'displayName').exec(function (err, allpackage) {
    if (err) {
      return next(err);
    } else if (!allpackage) {
      return res.status(404).send({
        message: 'No Allpackage with that identifier has been found'
      });
    }
    req.allpackage = allpackage;
    next();
  });
};
