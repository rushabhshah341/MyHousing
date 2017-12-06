(function () {
  'use strict';

  angular
    .module('allpackages')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('allpackages', {
        abstract: true,
        url: '/allpackages',
        template: '<ui-view/>'
      })
      .state('allpackages.list', {
        url: '',
        templateUrl: 'modules/allpackages/client/views/list-allpackages.client.view.html',
        controller: 'AllpackagesListController',
        controllerAs: 'vm',
        data: {
          roles: ['user'],
          pageTitle: 'Allpackages List'
        }
      })
      .state('allpackages.create', {
        url: '/create',
        templateUrl: 'modules/allpackages/client/views/createPackage.client.view.html',
        controller: 'AllpackagesController',
        controllerAs: 'vm',
        resolve: {
          allpackageResolve: newAllpackage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Allpackages Create'
        }
      })
      .state('allpackages.edit', {
        url: '/:allpackageId/edit',
        templateUrl: 'modules/allpackages/client/views/createPackage.client.view.html',
        //templateUrl: 'modules/allpackages/client/views/view-allpackage.client.view.html',
        controller: 'AllpackagesController',
        controllerAs: 'vm',
        resolve: {
          allpackageResolve: getAllpackage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit package {{ allpackageResolve.name }}'
        }
      })
      .state('allpackages.view', {
        url: '/:allpackageId',
        templateUrl: 'modules/allpackages/client/views/view-allpackage.client.view.html',
        controller: 'AllpackagesController',
        controllerAs: 'vm',
        resolve: {
          allpackageResolve: getAllpackage
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'package {{ allpackageResolve.name }}'
        }
      });
  }

  getAllpackage.$inject = ['$stateParams', 'AllpackagesService'];

  function getAllpackage($stateParams, AllpackagesService) {
    return AllpackagesService.get({
      allpackageId: $stateParams.allpackageId
    }).$promise;
  }

  newAllpackage.$inject = ['AllpackagesService'];

  function newAllpackage(AllpackagesService) {
    return new AllpackagesService();
  }
}());
