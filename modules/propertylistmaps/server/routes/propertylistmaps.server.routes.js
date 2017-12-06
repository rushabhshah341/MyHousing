'use strict';

/**
 * Module dependencies
 */
var propertylistmapsPolicy = require('../policies/propertylistmaps.server.policy'),
  propertylistmaps = require('../controllers/propertylistmaps.server.controller');

module.exports = function(app) {
  // Propertylistmaps Routes
  app.route('/api/propertylistmaps').all(propertylistmapsPolicy.isAllowed)
    .get(propertylistmaps.list)
    .post(propertylistmaps.create);

  app.route('/api/propertylistmaps/:propertylistmapId').all(propertylistmapsPolicy.isAllowed)
    .get(propertylistmaps.read)
    .put(propertylistmaps.update)
    .delete(propertylistmaps.delete);

  // Finish by binding the Propertylistmap middleware
  app.param('propertylistmapId', propertylistmaps.propertylistmapByID);
};
