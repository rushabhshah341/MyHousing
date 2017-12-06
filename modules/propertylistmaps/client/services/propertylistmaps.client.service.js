// Propertylistmaps service used to communicate Propertylistmaps REST endpoints
(function () {
  'use strict';

  angular
    .module('propertylistmaps')
    .factory('PropertylistmapsService', PropertylistmapsService);

  PropertylistmapsService.$inject = ['$resource'];

  function PropertylistmapsService($resource) {
    return $resource('api/propertylistmaps/:propertylistmapId', {
      propertylistmapId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
