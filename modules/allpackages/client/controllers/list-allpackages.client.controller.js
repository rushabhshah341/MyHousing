(function () {
  'use strict';

  angular
    .module('allpackages')
    .controller('AllpackagesListController', AllpackagesListController);

  AllpackagesListController.$inject = ['AllpackagesService'];

  function AllpackagesListController(AllpackagesService) {
    var vm = this;

    vm.allpackages = AllpackagesService.query();
  }
}());
