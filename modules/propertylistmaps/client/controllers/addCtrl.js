

(function () {
  'use strict';

  // Propertylistmaps controller
  angular
    .module('propertylistmaps')
    .controller('addCtrl',addCtrl );

  addCtrl.$inject = ['$scope', '$http', '$rootScope', 'gservice'];

  function addCtrl ($scope, $http, $rootScope, gservice) {
    var vm = this;
    vm.form = {};
    vm.queryUsers = queryUsers;
    vm.createUser = createUser;
    //$scope.vm.listingproperty={};

    var coords = {};
    var lat = 0;
    var long = 0;
    var queryBody = {};


    function createUser() {
      var address=$scope.vm.listingproperty.address;
      getLatitudeLongitude(showResult, address);
      function showResult(result) {

        console.log("In show Result");
        lat= result.geometry.location.lat();
        long = result.geometry.location.lng();
        console.log(lat);
        console.log(long);
        saveData(lat,long);

      }
      function getLatitudeLongitude(callback, address){
        console.log("In getlanglong...");
        // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'

        // Initialize the Geocoder
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
          geocoder.geocode({
            'address': address
          }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0]);
            }

          });
        }

      }
      function saveData(lat,long) {
        console.log("Entering Userdata..");
        // Grabs all of the text box fields
        var userData = {

          username: $scope.vm.listingproperty.username,
          noofbedroom:$scope.vm.listingproperty.noofbedroom,
          price:$scope.vm.listingproperty.price,
          location:[long,lat],
          address: vm.listingproperty
        };
        // console.log(userData);

        // Saves the user data to the db
        $http.post('/users', userData)
          .success(function (data) {
            console.log("In Post...");
            // Once complete, clear the form (except location)
            $scope.vm.listingproperty.username = "";
            $scope.vm.listingproperty.noofbedroom="";
            $scope.vm.listingproperty.price="";
            $scope.vm.listingproperty.address = "";

            // Refresh the map with new data
            gservice.refresh(lat, long);
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      }

    }

    function queryUsers() {

      console.log($scope.vm.listingproperty.distance);

      var address=$scope.vm.listingproperty.address;
      console.log(address);
      getLatitudeLongitude(showNewResult, address);

      function showNewResult(result) {
        console.log("In show Result");
        lat= result.geometry.location.lat();
        long = result.geometry.location.lng();
        console.log(lat);
        console.log(long);
        searchUsers(lat,long);
      }

      function getLatitudeLongitude(callback, address){
        console.log("In getlanglong...");
        console.log(address);
        // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'

        // Initialize the Geocoder
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
          geocoder.geocode({
            'address': address
          }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0]);
            }

          });
        }

      }

      function searchUsers(lat, long) {
        // Assemble Query Body
        queryBody = {
          address: $scope.vm.listingproperty.address,
          longitude: parseFloat(long),
          latitude: parseFloat(lat),
          distance: parseFloat($scope.vm.listingproperty.distance),
          noofbedroom:$scope.vm.listingproperty.noofbedroom,
          price:$scope.vm.listingproperty.price

        };

        // Post the queryBody to the /query POST route to retrieve the filtered results
        $http.post('/query', queryBody)

        // Store the filtered results in queryResults
          .success(function(queryResults){
            console.log(queryResults);
            $scope.vm.listingproperty.address = "";
            $scope.vm.listingproperty.distance = "";
            $scope.vm.listingproperty.noofbedroom = "";
            $scope.vm.listingproperty.price = "";

            // Pass the filtered results to the Google Map Service and refresh the map
            gservice.refreshSearch(queryBody.latitude, queryBody.longitude, queryResults);

            // Count the number of records retrieved for the panel-footer
            $scope.queryCount = queryResults.length;
            console.log($scope.queryCount);
          })
          .error(function(queryResults){
            console.log('Error ' + queryResults);
          })
      }
    }

  }
}());
