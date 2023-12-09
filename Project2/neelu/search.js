var app = angular.module('tollCalculator');

app.controller('mainController', function($scope, $http) {
  $scope.getTollCost = function() {
    var origin = $scope.origin;
    var destination = $scope.destination;
    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='  + origin + '&key=AIzaSyA-nftHnip6wJ1zX_SoBfmmhZmynfvk-u0').then(function(data) {
      var originGeoCode = data.data.results[0].geometry.location;
      $scope.originGeoCode = originGeoCode;

      return $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='  + destination + '&key=AIzaSyA-nftHnip6wJ1zX_SoBfmmhZmynfvk-u0');

    }).then(function(data) {
      var destGeoCode = data.data.results[0].geometry.location;
      $scope.destGeoCode = destGeoCode;

      var apiURL = 'https://tce.cit.api.here.com/2/calculateroute.json';
      apiURL += '?app_id=dQ30U2cw9m9iJSTFpXJY';
      apiURL += '&app_code=uXANN2Bk5gaLiP2MF5JL8w';
      apiURL += '&currency=USD';
      apiURL += '&detail=1';
      apiURL += '&start_ts=2016-05-23T01:00:00';
      apiURL += '&vspec=2;0;0;2;0;0;1;60;0;4000;4000;0;0;1;1;4;0;0';
      apiURL += '&waypoint0=geo!' + $scope.originGeoCode.lat + ',' + $scope.originGeoCode.lng;// get this from Google Maps Api
      apiURL += '&waypoint1=geo!' + $scope.destGeoCode.lat + ',' + $scope.destGeoCode.lng;// get from Google Maps Api
      apiURL += '&metricsystem=imperial';
      apiURL += '&maneuverattributes=none';
      apiURL += '&routeattributes=gr';
      apiURL += '&mode=fastest;car';
      apiURL += '&jsonattributes=41';
      apiURL += '&combinechange=true';
      apiURL += '&linkattributes=none,rt,fl';
      apiURL += '&legattributes=none,li,sm';
      apiURL += '&language=en-us';
      apiURL += '&detail=1';

      $http.get(apiURL).then(function(response) {
        var totalCost = response.data.costs.totalCost;
        $scope.tollCost = totalCost;
      }).catch(function(err) {
        if (err) throw err;
      });

    });// closes the promise after second http geocode, api call inside this promise
  }
});
