(function () {
  'use strict';

  angular
    .module('propertylistmaps')
    .controller('PropertylistmapsListController', PropertylistmapsListController);

  PropertylistmapsListController.$inject = ['PropertylistmapsService'];

  function PropertylistmapsListController(PropertylistmapsService) {
    var vm = this;

    vm.propertylistmaps = PropertylistmapsService.query();
  }
}());
