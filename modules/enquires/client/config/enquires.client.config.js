(function () {
  'use strict';

  angular
    .module('enquires')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Enquires',
      state: 'enquires',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'enquires', {
      title: 'List Enquires',
      state: 'enquires.list'
    });

    // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'enquires', {
    //   title: 'Create Enquire',
    //   state: 'enquires.create',
    //   roles: ['user']
    // });
  }
}());
