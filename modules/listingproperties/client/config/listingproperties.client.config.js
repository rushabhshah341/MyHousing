(function () {
  'use strict';

  angular
    .module('listingproperties')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'List Property',
      state: 'listingproperties',
      type: 'dropdown',
      roles: ['user','admin','manager', 'guest', '*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'listingproperties', {
      title: 'View Properties',
      state: 'listingproperties.list',
      roles: ['user','admin','manager', 'guest', '*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'listingproperties', {
      title: 'Add Properties',
      state: 'listingproperties.create',
      roles: ['user','admin','manager', 'guest', '*']
    });
  }
}());
