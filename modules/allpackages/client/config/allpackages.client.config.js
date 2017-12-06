(function () {
  'use strict';

  angular
    .module('allpackages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Package',
      state: 'allpackages',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'allpackages', {
      title: 'View Packages',
      state: 'allpackages.list'
    });

    // Add the dropdown create item
   /* menuService.addSubMenuItem('topbar', 'allpackages', {
      title: 'Select package',
      state: 'allpackages.create',
      roles: ['user']
    });
*/
    /*menuService.addSubMenuItem('topbar', 'allpackages', {
      title: 'Update Package',
      state: 'allpackages.edit',
      reloadOnSearch: true,
      roles: ['user']
    });*/
  }
}());
