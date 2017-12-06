(function () {
  'use strict';

  angular
    .module('propertylistmaps')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('propertylistmaps', {
        abstract: true,
        url: '/propertylistmaps',
        template: '<ui-view/>'
      })
      .state('propertylistmaps.list', {
        url: '',
        templateUrl: 'modules/propertylistmaps/client/views/Queryform.html',
        controller: 'addCtrl',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Propertylistmaps List'
        }
      })
      .state('propertylistmaps.create', {
        url: '/create',
        templateUrl: 'modules/propertylistmaps/client/views/index.html',
        controller: 'addCtrl',
        controllerAs: 'vm',
        // resolve: {
        //   propertylistmapResolve: newPropertylistmap
        // },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Propertylistmaps Create'
        }
      })
      // .state('propertylistmaps.edit', {
      //   url: '/:propertylistmapId/edit',
      //   templateUrl: 'modules/propertylistmaps/client/views/form-propertylistmap.client.view.html',
      //   controller: 'PropertylistmapsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     propertylistmapResolve: getPropertylistmap
      //   },
      //   data: {
      //     roles: ['user', 'admin'],
      //     pageTitle: 'Edit Propertylistmap {{ propertylistmapResolve.name }}'
      //   }
      // })
      // .state('propertylistmaps.view', {
      //   url: '/:propertylistmapId',
      //   templateUrl: 'modules/propertylistmaps/client/views/view-propertylistmap.client.view.html',
      //   controller: 'PropertylistmapsController',
      //   controllerAs: 'vm',
      //   resolve: {
      //     propertylistmapResolve: getPropertylistmap
      //   },
      //   data: {
      //     pageTitle: 'Propertylistmap {{ propertylistmapResolve.name }}'
      //   }
      // });
  }

  // getPropertylistmap.$inject = ['$stateParams', 'gservice'];
  //
  // function getPropertylistmap($stateParams, gservice) {
  //   return gservice.get({
  //     propertylistmapId: $stateParams.propertylistmapId
  //   }).$promise;
  // }
  //
  // newPropertylistmap.$inject = ['gservice'];
  //
  // function newPropertylistmap(gservice) {
  //   return new gservice();
  // }
}());
