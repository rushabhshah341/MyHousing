(function () {
  'use strict';

  // Allpackages controller
  angular
    .module('allpackages')
    .controller('AllpackagesController', AllpackagesController);

  AllpackagesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'allpackageResolve','Notification'];

  function AllpackagesController ($scope, $state, $window, Authentication, allpackage, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.allpackage = allpackage;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.pn = pn;
    vm.pn1 = pn1;
    vm.pn2 = pn2;


    function pn(){
      allpackage.packageName = 'Gold';
      console.log(vm.allpackage);
      $http.put('/api/allpackages/' + allpackage._id, vm.allpackage).success(function() {
        Notification.success('Package selected successfully');
      }).error(function() {
        Notification.error('Error in package selection');
      });
    }

    function pn1(){
      allpackage.packageName = 'Silver';
      console.log(vm.allpackage);
      $http.put('/api/allpackages/' + allpackage._id, vm.allpackage).success(function() {
        Notification.success('Package selected successfully');
      }).error(function() {
        Notification.error('Error in package selection');
      });
    }

    function pn2(){
      allpackage.packageName = 'Platinum';
      console.log(vm.allpackage);
      $http.put('/api/allpackages/' + allpackage._id, vm.allpackage).success(function() {
        Notification.success('Package selected successfully');
      }).error(function() {
        Notification.error('Error in package selection');
      });
    }

    // Remove existing Allpackage
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.allpackage.$remove($state.go('allpackages.list'));
      }
    }

    // Save Allpackage
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.allpackageForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.allpackage._id) {
        vm.allpackage.$update(successCallback, errorCallback);
      } else {
        vm.allpackage.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('allpackages.list', {
          allpackageId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
