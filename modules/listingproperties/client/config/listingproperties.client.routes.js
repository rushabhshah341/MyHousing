(function () {
  'use strict';

  angular
    .module('listingproperties')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('listingproperties', {
        abstract: true,
        url: '/listingproperties',
        template: '<ui-view/>'
      })
      .state('listingproperties.list', {
        url: '',
        templateUrl: 'modules/listingproperties/client/views/list-listingproperties.client.view.html',
        controller: 'ListingpropertiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listingproperties List'
        }
      })
      .state('listingproperties.create', {
        url: '/create',
        templateUrl: 'modules/listingproperties/client/views/form-listingproperty.client.view.html',
        controller: 'ListingpropertiesController',
        controllerAs: 'vm',
        resolve: {
          listingpropertyResolve: newListingproperty
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Listingproperties Create'
        }
      })
      .state('listingproperties.edit', {
        url: '/:listingpropertyId/edit',
        templateUrl: 'modules/listingproperties/client/views/form-listingproperty.client.view.html',
        controller: 'ListingpropertiesController',
        controllerAs: 'vm',
        resolve: {
          listingpropertyResolve: getListingproperty
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Listingproperty {{ listingpropertyResolve.name }}'
        }
      })
      .state('listingproperties.view', {
        url: '/:listingpropertyId',
        templateUrl: 'modules/listingproperties/client/views/view-listingproperty.client.view.html',
        controller: 'ListingpropertiesController',
        controllerAs: 'vm',
        resolve: {
          listingpropertyResolve: getListingproperty
        },
        data: {
          pageTitle: 'Listingproperty {{ listingpropertyResolve.name }}'
        }
      });
  }

  getListingproperty.$inject = ['$stateParams', 'ListingpropertiesService'];

  function getListingproperty($stateParams, ListingpropertiesService) {
    return ListingpropertiesService.get({
      listingpropertyId: $stateParams.listingpropertyId
    }).$promise;
  }

  newListingproperty.$inject = ['ListingpropertiesService'];

  function newListingproperty(ListingpropertiesService) {
    return new ListingpropertiesService();
  }
}());
