// require Utils

Utils.Date = function(datetext, config){

  var self = this;
  var defaults = { with_leading_zeros: false, military_time: true };
  var config = Utils.extend(config, defaults);

  var date = new Date(datetext);
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  self.initialize = function(){
    var d = get();
    self.year           = d.year;
    self.month          = d.month;
    self.day            = d.day;
    self.hours          = d.hours;
    self.minutes        = d.minutes;
    self.seconds        = d.seconds;
    self.milliseconds   = d.milliseconds;
    self.ampm           = d.ampm;
    self.day_of_week    = d.day_of_week;
    self.month_of_year  = d.month_of_year;
    return self;
  };

  self.as_rails_datetime = rails_datetime();
  self.verbose = verbose();



  // private

  function year(){
    return format(date.getFullYear(),4);
  }

  function month(){
    return format(date.getMonth() + 1,2);
  }

  function day(){
    return format(date.getDate(),2);
  }

  function hours(){
    var hours = format(date.getHours(),2);

    if ( config.military_time === false ) {
      if ( hours == 24 || hours == 0 ){ hours = 12; }
      if ( hours > 12 ) { hours = hours - 12; }
    }

    if ( ! config.with_leading_zeros ) {
  		if ( hours.length > 1 && hours.charAt(0) == "0" ){
        hours = hours.substring(0, hours.length);
  		}
    }

    return hours;
  }

  function minutes(){
    return format(date.getMinutes(),2,true);
  }

  function seconds(){
    return format(date.getSeconds(),2);
  }

  function milliseconds(){
    return format(date.getMilliseconds(), 4);
  }

  function day_of_week(){
    return days[date.getDay()];
  }

  function month_of_year(){
    return months[date.getMonth()];
  }

  function ampm(){
    var ampm = date.getHours() >= 12 ? "pm" : "am";
    return ampm;
  }
  
  function get(){
    return {
      year           : year(),
      month          : month(),
      day            : day(),
      hours          : hours(),
      minutes        : minutes(),
      seconds        : seconds(),
      milliseconds   : milliseconds(),
      ampm           : ampm(),
      day_of_week    : day_of_week(),
      month_of_year  : month_of_year()
    }
  }  

  function format(string, digits, force){
    var string = string + '';
    if ( config.with_leading_zeros || force) {
  		if ( string.length <= digits ){
  			while ( string.length < digits){
          string = "0".concat(string + '');
  			}
  		}
    }
    return string;
  }


  // format as rails datetime obj
  // yyyy-mm-dd hh:mm:ss
  function rails_datetime(){
    config.with_leading_zeros = true;
    config.military_time = true;
    var d = get();
    return d.year + "-" + d.month + "-" + d.day + " " + d.hours + ":" + d.minutes + ":" + d.seconds;
  }

  function verbose(){
    config.with_leading_zeros = false
    config.military_time = false;
    var d = get();
    return d.day_of_week + ", " + d.month_of_year + " " + d.day + ", " + d.year + " at " + d.hours + ":" + d.minutes + d.ampm;
  }


  return self.initialize();
};
