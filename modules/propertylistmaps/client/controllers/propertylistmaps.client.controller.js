(function () {
  'use strict';

  // Propertylistmaps controller
  angular
    .module('propertylistmaps')
    .controller('PropertylistmapsController', PropertylistmapsController);

  PropertylistmapsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'propertylistmapResolve'];

  function PropertylistmapsController ($scope, $state, $window, Authentication, propertylistmap) {
    var vm = this;

    vm.authentication = Authentication;
    vm.propertylistmap = propertylistmap;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Propertylistmap
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.propertylistmap.$remove($state.go('propertylistmaps.list'));
      }
    }

    // Save Propertylistmap
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.propertylistmapForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.propertylistmap._id) {
        vm.propertylistmap.$update(successCallback, errorCallback);
      } else {
        vm.propertylistmap.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('propertylistmaps.view', {
          propertylistmapId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
