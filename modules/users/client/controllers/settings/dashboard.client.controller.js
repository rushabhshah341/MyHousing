(function () {
  'use strict';

  angular
    .module('users')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', '$http', 'Authentication', 'UsersService', 'Notification', 'ListingpropertiesService'];

  function DashboardController($scope, $http, Authentication, UsersService, Notification, listingproperty, ListingpropertiesService) {
    var vm = this;
    vm.ListingpropertiesService = ListingpropertiesService;
    vm.listingproperty = listingproperty;
    vm.user = Authentication.user;
    //console.log(vm.ListingpropertiesService);

    vm.propertyVerification = propertyVerification;
    vm.remove= remove;
    //console.log(vm.ListingpropertiesService);

    // Remove existing Listingproperty
    function remove(data) {
        $http.delete ('/api/listingproperties/' + data._id)
          .success(function(data1) {
            // console.log(data1);
            Notification.success('Property Deleted successfully');
          })
          .error(function(data1) {
           // console.log('Error: ' + data1);
            Notification.error('Property Deletion failed.');
          });

    }

    function propertyVerification(data){
     // console.log(data);
     // console.log("Property Flag verification.");
      data.propertyVerificationFlag = 1;
     // console.log(data.propertyVerificationFlag +'......'+ data._id + '.......');
      // console.log(ListingpropertiesService);
      $http.put('/api/listingproperties/' + data._id, data).success(function() {
        Notification.success('Property verified successfully');
      }).error(function() {
        Notification.error('Property verification failed');
      });
    }

    $http.get('/api/listingproperties/')
      .success(function(data) {
        $scope.names = data;

      //  console.log(data[0].name)
        $scope.name = data[0].name;
        $scope.address = data[0].address;
        $scope.flagValue = data[0].flagValue;
       // console.log(data)

        //console.log(data[0].name)
        $scope.name = data[0].name;
        $scope.address = data[0].address;
        $scope.flagValue = data[0].flagValue;
        //console.log(data)
      })
      .error(function(data) {
        alert(data);
       // console.log('Error: ' + data);
      });


      $scope.loadData = function(){
        $http.get('/api/listingproperties/')
            .success(function(data) {
              $scope.names = data;
      
            //  console.log(data[0].name)
              $scope.name = data[0].name;
              $scope.address = data[0].address;
              $scope.flagValue = data[0].flagValue;
             // console.log(data)
      
              //console.log(data[0].name)
              $scope.name = data[0].name;
              $scope.address = data[0].address;
              $scope.flagValue = data[0].flagValue;
              //console.log(data)
            })
            .error(function(data) {
              alert(data);
             // console.log('Error: ' + data);
            });
            
          }
          $scope.loadData();
        }
       
      }());
