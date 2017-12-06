(function () {
  'use strict';

  angular
    .module('propertylistmaps')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Propertylistmaps',
      state: 'propertylistmaps',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'propertylistmaps', {
      title: 'List Propertylistmaps',
      state: 'propertylistmaps.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'propertylistmaps', {
      title: 'Create Propertylistmap',
      state: 'propertylistmaps.create',
      roles: ['user']
    });
  }
}());
