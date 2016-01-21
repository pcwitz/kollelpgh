(function() {
  'use strict';

  angular
    .module('app').factory('time', time);

  function time() {

    var service = {
      format: format,
      minchaYomi: minchaYomi,
      formatDaf: formatDaf,
      formatMincha: formatMincha,
      formatMaariv: formatMaariv
    };

    return service;

    function spit(time) {
      var time = time.split(':');
      var t = {
        hours: Number(time[0]),
        minutes: Number(time[1])
      };
      return t;
    }

    function stringTime(t) {
      var timeValue = ((t.hours > 12) ? t.hours - 12 : t.hours);  // get hours
      timeValue += (t.minutes < 10) ? ':0' + t.minutes : ':' + t.minutes;  // get minutes
      timeValue += (t.hours >= 12) ? ' PM' : ' AM';  // get AM/PM
      return timeValue;
    }

    function format(time) {
      var t = spit(time);
      var timeValue = stringTime(t);
      return timeValue;
    }

    function formatMincha(shkia) {
      var t = spit(shkia);
      t.minutes = t.minutes - 45;

      if (t.minutes <= 0) {
        t.hours = t.hours - 1;
        t.minutes = 60 + t.minutes;
      }
      var timeValue = stringTime(t);
      return timeValue;
    }

    // this is the callback function invoked in minchaBaby
    function formatDaf(hours) {
      var shkiaHour = hours - 1;
      console.log('t time hours after mincha is formated: ', shkiaHour);
      return shkiaHour;
    }

    function minchaYomi(shkia, callback) {

      var times = {
        daf: '',
        mincha: ''
      };

      var daf = {
        hours: '',
        minutes: ''
      };

      var t = spit(shkia);
      t.minutes = t.minutes - 45;

      if (t.minutes <= 0) {
        t.hours = t.hours - 1;
        t.minutes = 60 + t.minutes;
      }

      daf.hours = callback(t.hours);
      daf.minutes = t.minutes;

      var minchaTimeValue = stringTime(t);
      var dafTimeValue = stringTime(daf);
      times.mincha = minchaTimeValue;
      times.daf = dafTimeValue;
      return times;
    }
    
    function formatMaariv(shkia) {
      var t = spit(shkia);
      t.minutes = t.minutes + 55;

      if (t.minutes >= 60) {
        t.hours = t.hours + 1;
        t.minutes = t.minutes - 60;
      }
      var timeValue = stringTime(t);
      return timeValue;
    }
  }
  // time.$inject = [''];
})();