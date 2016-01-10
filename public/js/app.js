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
      controller: 'zmanimCtrl'
    })
    .when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'apiCtrl'
    })
    .when('/view2', {
      templateUrl: 'partials/partial2.html'
    })
    .otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
}
