(function () {
  'use strict';

  // Listingproperties controller
  angular
    .module('listingproperties')
    .controller('ListingpropertiesController', ListingpropertiesController);

  ListingpropertiesController.$inject = ['$scope', '$state', '$http', '$rootScope','$location', '$window', 'Authentication', 'listingpropertyResolve', 'ListingpropertiesService', 'Notification'];

  function ListingpropertiesController($scope, $state, $http, $rootScope, $location, $window, Authentication, listingproperty, ListingpropertiesService, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.listingproperty = listingproperty;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.flagVal = flagVal;
    // vm.routeToEnquiry = routeToEnquiry;

    // vm.my_place_id = "ChIJdd4hrwug2EcRmSrV3Vo6llI";
    // $scope.my_place_id = "ChIJdd4hrwug2EcRmSrV3Vo6llI";
    //   console.log(listingproperty.my_place_id);
//     function flagVal(){
//       console.log('in flagval');
//       listingproperty.flagValue = 1;
//       console.log(vm.listingproperty);
//       console.log(listingproperty);
// }
//     }

// function flagVal(){
//  listingproperty.flagValue += 1;
//  console.log("fagValue :: " + listingproperty.flagValue);
//  $http.put('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function() {
//       Notification.success('Property flagged successfully');
//   }).error(function() {
//       Notification.error('Property flagged successfully');
//   });
// }

// $scope.create = function() {
//   var listingproperties = new listingproperty({
//       title: this.title,
//       content: this.content,
//       ///
//       lon: this.lon,
//       lat: this.lat
//       ///
//   });
//   listingproperties.$save(function(response) {
//       $location.path('listingproperties/' + response._id);
//       $scope.title = '';
//       $scope.content = '';
//       ///
//       $scope.lon = 0;
//       $scope.lat = 0;
//       ///
//   }, function(errorResponse) {
//       $scope.error = errorResponse.data.message;
//   });
// };

$scope.$on('mapInitialized', function(event,map) {
  var marker = map.markers[0];

$scope.$watch('listingproperty.lat + listingproperty.lon',function(newVal,oldVal){
            if(newVal === oldVal){return;}
            // checks if value has changed
map.setCenter({lat:$scope.listingproperties.lat,lng:$scope.listingproperties.lon});
marker.setPosition({lat:$scope.listingproperties.lat,lng:$scope.listingproperties.lon});
          });
  });
  $scope.gotolink= function(event,i) {
    $location.path('listingproperties/'+ i._id);
  };



function geocode(){
  var location = '239 western Ave Albany NY';
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
        address:location,
        key: 'AIzaSyBL0qvZfmILniPR4t-aKbizLu7jTDAkkiE'
    }
  })
  .then(function(response){
    console.log(response);

  })
  .catch(function(error){
      console.log(error);
  })
}
    // Remove existing Listingproperty
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.listingproperty.$remove($state.go('listingproperties.list'));
      }
    }


    // $http.get('api/allpackages',function(item){
    //   $scope.packageType = item;
    //   console.log($scope.packageType);
    // });


    // Save Listingproperty
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.listingpropertyForm');
        console.log('test');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.listingproperty._id) {
        vm.listingproperty.$update(successCallback, errorCallback);
      } else {
        console.log(vm.listingproperty.propertyImageURL);
        vm.listingproperty.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('listingproperties.list', {
          listingpropertyId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Property saved successfully!' });

        console.log(res);

      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

    };

    function flagVal(){
      listingproperty.flagValue += 1;
      console.log(listingproperty.flagValue +'......'+ listingproperty._id);
      console.log(vm.listingproperty);
      $http.put('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function() {
        Notification.success('Property flagged successfully');
      }).error(function() {
        Notification.error('Property flagged failed');
      });
    }

    function routeToEnquiry(){
        console.log("Inside Route to Enquiry.");
      $location.path('/enquires');

      $http.get('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function(data) {
        vm.names = data;
        console.log("Enquire Data" + data + " id :: "+ listingproperty._id);
        Notification.success('Property data got');
      }).error(function() {
        Notification.error('Property data failed');
      });
  //     //$window.location.href = '/modules/listingproperties/client/views/enquire-listingproperty.client.view.html';
  // //      console.log($location.url('listingproperties.enquire'));
  //
    }
    // function propertyVerification(){
    //   console.log("Property Flag verification.");
    //   listingproperty.propertyVerificationFlag = 1;
    //   console.log(listingproperty.propertyVerificationFlag +'......'+ listingproperty._id);
    //   console.log(vm.listingproperty);
    //   $http.put('/api/listingproperties/' + listingproperty._id, vm.listingproperty).success(function() {
    //     Notification.success('Property verified successfully');
    //   }).error(function() {
    //     Notification.error('Property verification failed');
    //   });
    // }


    };

}());
