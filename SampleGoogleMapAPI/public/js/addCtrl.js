// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' and 'gservice' modules and controllers.


var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice']);

addCtrl.controller('addCtrl', function($scope, $http, $rootScope, geolocation, gservice){




    // Initializes Variables
    // ----------------------------------------------------------------------------

    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;
    var queryBody = {};

    // // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;



    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";

        gservice.refresh($scope.formData.latitude, $scope.formData.longitude);

    });


    // Creates a new user based on the form fields
    $scope.createUser = function() {

        var address=$scope.formData.address;
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
            geocoder = new google.maps.Geocoder();
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

            username: $scope.formData.username,
            noofbedroom:$scope.formData.noofbedroom,
            price:$scope.formData.price,
            location:[long,lat],
            address: $scope.formData.address
        };
        // console.log(userData);

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {
                console.log("In Post...");
                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.noofbedroom="";
                $scope.formData.price="";
                $scope.formData.address = "";

                // Refresh the map with new data
                gservice.refresh(lat, long);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    };
    $scope.queryUsers = function(){

        var address=$scope.formData.address;
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
            geocoder = new google.maps.Geocoder();
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
                address: $scope.formData.address,
                longitude: parseFloat(long),
                latitude: parseFloat(lat),
                distance: parseFloat($scope.formData.distance),

            };

            // Post the queryBody to the /query POST route to retrieve the filtered results
            $http.post('/query', queryBody)

            // Store the filtered results in queryResults
                .success(function(queryResults){
                    console.log(queryResults);
                    $scope.formData.address = "";
                    $scope.formData.distance = "";

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


    };




});
