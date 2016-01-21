(function() {
  'use strict';

  angular
    .module('app')
    .controller('zmanimCtrl', zmanimCtrl);

  function zmanimCtrl($http, $filter, time) {

    var self = this;

    self.daily = {
      'daf yomi': '6:30 AM',
      shacharis: '7:30 AM',
      mincha: '3:45 PM',
      shkia: '',
      maariv: '9:40 PM'
    };

    self.shabbos = {
      licht: '',
      leilMincha: '',
      leilShkia: '',
      shacharis: '8:30 AM',
      ma: '',
      gra: '',
      daf: '',
      yomMincha: '',
      yomShkia: '',
      maariv: '',
      end: ''
    };

    self.getPdf = function() {
      var newWindow = window.open('assets/pdf/zmanim.pdf');  //this will bypass pop-up blocker
      $http.post('/pdf').then(function(res) {
        newWindow.location = 'assets/pdf/zmanim.pdf';
      });
    };

    var makeUrl = function(date) {
      
      var lat = '40.434890',
          lng = '-79.922075',
          tz = 'America/New_York',
          d = '&dateBegin=' + $filter('date')(date, 'M/d/yyyy');

      if (date) {
        var params = [
          'https://db.ou.org/zmanim/getCalendarData.php?mode=day',
          'dateBegin=' + d,
          'lat=' + lat,
          'lng=' + lng,
          'timezone=' + tz,
          'callback=JSON_CALLBACK'
        ];
      } else {
        var params = [
          'http://www.hebcal.com/shabbat/?cfg=json&a=on',
          'latitude=' + lat,
          'longitude=' + lng,
          'tzid=' + tz,
        ];
      }
      var url = params.join('&');
      return url;
    }

    var date = new Date();
    var todayUrl = makeUrl(date);
  
    $http.jsonp(todayUrl).then(function(res) {
      console.log('ou: ',res.data);
      self.parsha = res.data.parsha_shabbos;
      self.shabbos.licht = time.format(res.data.candle_lighting_shabbos);
      self.daily.shkia = time.format(res.data.zmanim.sunset);
    });

    var shabbosUrl = makeUrl();

    $http.get(shabbosUrl).then(function(res) {
      console.log('hebcal: ',res.data);
      
      //change this from iso to the ou api format using angular's 'M/d/yyyy'
      var leilDate = res.data.items[0].date;
      var leilUrl = makeUrl(leilDate);
      console.log('leil date: ',leilDate);

      var yomDate = res.data.items[1].date;
      var yomUrl = makeUrl(yomDate);
      console.log('yom date: ',yomDate);

      //putting the ou service here in the callback because we need the shabbos date from hebcal first
      $http.jsonp(leilUrl).then(function(res) {
        //need mincha and shkia for leil shabbos
        console.log('leil shabbos from ou: ',res.data);
        self.shabbos.leilMincha = time.formatMincha(res.data.zmanim.sunset);
        self.shabbos.leilShkia = time.format(res.data.zmanim.sunset);
      });
      $http.jsonp(yomUrl).then(function(res) {
        //need shacharis, end time for shma (ma and gra), daf yomi, mincha, shkia, maariv, 72 minutes
        console.log('yom shabbos from ou: ',res.data);
        self.shabbos.ma = time.format(res.data.zmanim.sof_zman_shema_ma);
        self.shabbos.gra = time.format(res.data.zmanim.sof_zman_shema_gra);
        var times = time.minchaYomi(res.data.zmanim.sunset, time.formatDaf);
        self.shabbos.daf = times.daf;
        self.shabbos.yomMincha = times.mincha;
        self.shabbos.yomShkia = time.format(res.data.zmanim.sunset);
        self.shabbos.maariv = time.formatMaariv(res.data.zmanim.sunset);  //yom shabbos maariv is 55 minutes after shkia
        self.shabbos.end = time.format(res.data.zmanim.tzeis_72_minutes);
      });
    });
  }
  zmanimCtrl.$inject = ['$http', '$filter', 'time'];
})();