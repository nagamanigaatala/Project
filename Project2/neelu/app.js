var app = angular.module('tollCalculator', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home',{
    url: '/',
    templateUrl: 'public/views/partials/home.html',
    controller: 'mainController'
  })

  $locationProvider.html5Mode(true);
}]);
