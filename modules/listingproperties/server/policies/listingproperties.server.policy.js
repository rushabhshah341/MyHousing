'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Listingproperties Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/listingproperties',
      permissions: '*'
    }, {
      resources: '/api/listingproperties/:listingpropertyId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/listingproperties',
      permissions: ['get', 'post']
    }, {
      resources: '/api/listingproperties/:listingpropertyId',
      permissions: ['get','post']
    }]
  }, {
    roles: ['manager'],
    allows: [{
      resources: '/api/listingproperties',
      permissions: ['get', 'post', 'put']
    }, {
      resources: '/api/listingproperties/:listingpropertyId',
      permissions: ['get','post', 'put']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/listingproperties',
      permissions: ['get']
    }, {
      resources: '/api/listingproperties/:listingpropertyId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Listingproperties Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Listingproperty is being processed and the current user created it then allow any manipulation
  if (req.listingproperty && req.user && req.listingproperty.user && req.listingproperty.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
