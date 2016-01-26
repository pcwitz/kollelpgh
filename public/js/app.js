'use strict';

angular.module('app', [
  'ngRoute']);

angular
  .module('app')
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/welcome', {
      templateUrl: 'partials/welcome.html',
      controller: 'apiCtrl'
    })
    .when('/events', {
      templateUrl: 'partials/events.html'
    })
    .when('/zmanim', {
      templateUrl: 'partials/zmanim.html',
      controller: 'zmanimCtrl',
      controllerAs: 'self'
    })
    .otherwise({
      redirectTo: '/welcome'
    });

  $locationProvider.html5Mode(true);
}
