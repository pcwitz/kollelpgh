(function() {
  'use strict';

  angular
    .module('app')
    .controller('zmanimCtrl', zmanimCtrl);

  function zmanimCtrl($scope, $http) {
    $scope.zmanim = {};

    var api =  'http://db.ou.org/zmanim/getCalendarData.php?mode=day&timezone=America/New_York&dateBegin=4/14/2014';
    var lat =  '&lat=40.434890';
    var lng =  '&lng=-79.922075';
    var cors = '&callback=JSON_CALLBACK';

    var url = api + lat + lng + cors;
  
    $http.jsonp(url).then(function(res) {
      $scope.zmanim = res.data.zmanim;
      $scope.candleLighting = res.data.candle_lighting;
    });
  }
  zmanimCtrl.$inject = ['$scope', '$http'];
})();