'use strict';

/**
 * Module dependencies
 */
var allpackagesPolicy = require('../policies/allpackages.server.policy'),
  allpackages = require('../controllers/allpackages.server.controller');

module.exports = function(app) {
  // Allpackages Routes
  app.route('/api/allpackages').all(allpackagesPolicy.isAllowed)
    .get(allpackages.list)
    .post(allpackages.create);

  app.route('/api/allpackages/:allpackageId').all(allpackagesPolicy.isAllowed)
    .get(allpackages.read)
    .put(allpackages.update)
    .delete(allpackages.delete);

  // Finish by binding the Allpackage middleware
  app.param('allpackageId', allpackages.allpackageByID);
};
