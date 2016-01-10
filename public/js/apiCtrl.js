(function() {
  'use strict';

  angular
    .module('app')
    .controller('apiCtrl', apiCtrl);

  function apiCtrl($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });
  }
  apiCtrl.$inject = ['$scope', '$http'];
})();