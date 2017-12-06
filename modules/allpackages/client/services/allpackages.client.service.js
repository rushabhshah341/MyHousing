// Allpackages service used to communicate Allpackages REST endpoints
(function () {
  'use strict';

  angular
    .module('allpackages')
    .factory('AllpackagesService', AllpackagesService);

  AllpackagesService.$inject = ['$resource'];

  function AllpackagesService($resource) {
    return $resource('/api/allpackages/:allpackageId', {
      allpackageId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
