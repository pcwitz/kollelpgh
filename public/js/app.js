'use strict';

angular.module('app', [
  'ngRoute']);

angular
  .module('app')
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/zmanim', {
      templateUrl: 'partials/zmanim.html',
      controller: 'zmanimCtrl',
      controllerAs: 'self'
    })
    .when('/welcome', {
      templateUrl: 'partials/welcome.html',
      controller: 'apiCtrl'
    })
    .when('/view2', {
      templateUrl: 'partials/partial2.html'
    })
    .otherwise({
      redirectTo: '/welcome'
    });

  $locationProvider.html5Mode(true);
}
