(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', '$location','Authentication', 'menuService'];

  function HeaderController($scope, $state, $location, Authentication, menuService) {
    var vm = this;

    //
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    if (!Authentication.user) {
      $location.path('/');
    }else{
      $scope.ADMIN = Authentication.user.roles.indexOf("admin") === 0;
      $scope.userFlag = Authentication.user.roles.indexOf("user") === 0;
      //console.log(Authentication.user.roles.indexOf("admin"));
      //console.log("vm.admin Val :: " + $scope.ADMIN);
      //console.log("vm.user Val :: " + $scope.userFlag);
      // vm.accountMenu = menuService.getMenu('account').items[0];
      // vm.authentication = Authentication;
      // vm.isCollapsed = false;
      // vm.menu = menuService.getMenu('topbar');
    }
    $scope.$on('$stateChangeSuccess', stateChangeSuccess);



    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
