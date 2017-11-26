// // Creates the addCtrl Module and Controller. Note that it depends on 'geolocation' and 'gservice' modules.
// var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
// queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){
//
//     // Initializes Variables
//     // ----------------------------------------------------------------------------
//     //$scope.formData = {};
//     var queryBody = {};
//
//     // Initializes Variables
//     // ----------------------------------------------------------------------------
//     $scope.formData = {};
//     var coords = {};
//     var lat = 0;
//     var long = 0;
//
//     // // Set initial coordinates to the center of the US
//     $scope.formData.latitude = 39.500;
//     $scope.formData.longitude = -98.350;
//
//
//
//     geolocation.getLocation().then(function(data){
//
//         // Set the latitude and longitude equal to the HTML5 coordinates
//         coords = {lat:data.coords.latitude, long:data.coords.longitude};
//
//         // Display coordinates in location textboxes rounded to three decimal points
//         $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
//         $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
//
//         // Display message confirming that the coordinates verified.
//         $scope.formData.htmlverified = "Yep (Thanks for giving us real data!)";
//
//         gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
//
//     });
//
//
//
//     // Take query parameters and incorporate into a JSON queryBody
//     $scope.queryUsers = function(){
//
//         // Assemble Query Body
//         queryBody = {
//             longitude: parseFloat($scope.formData.longitude),
//             latitude: parseFloat($scope.formData.latitude),
//             distance: parseFloat($scope.formData.distance),
//             male: $scope.formData.male,
//             female: $scope.formData.female,
//             other: $scope.formData.other,
//             minAge: $scope.formData.minage,
//             maxAge: $scope.formData.maxage,
//             favlang: $scope.formData.favlang,
//             reqVerified: $scope.formData.verified
//         };
//
//         // Post the queryBody to the /query POST route to retrieve the filtered results
//         $http.post('/query', queryBody)
//
//             // Store the filtered results in queryResults
//             .success(function(queryResults){
//
//                 // Pass the filtered results to the Google Map Service and refresh the map
//                 gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);
//
//                 // Count the number of records retrieved for the panel-footer
//                 $scope.queryCount = queryResults.length;
//             })
//             .error(function(queryResults){
//                 console.log('Error ' + queryResults);
//             })
//     };
// });
//
