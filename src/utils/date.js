// require Utils

Utils.Date = function(datetext, config){

  var self = this;
	var defaults = { with_leading_zeros: false	};
	var config = Utils.extend(config, defaults);

  var date = new Date(datetext);

  self.initialize = function(){
    self.build();
    return self;
  };
  
  self.build = function(){
    self.year         = year();
    self.month        = month();
    self.day          = day();
    self.hours        = hours();
    self.minutes      = minutes();
    self.seconds      = seconds();
    self.milliseconds = milliseconds();    
  };

  self.as_rails_datetime = rails_datetime();

  // private

  function year(){ 
    return format(date.getFullYear(),4);
  }

  function month(){
    return format(date.getMonth(),2);
  }

  function day(){
    return format(date.getDate(),2);
  }

  function hours(){
    return format(date.getHours(),2);
  }

  function minutes(){
    return format(date.getMinutes(),2);
  }

  function seconds(){
    return format(date.getSeconds(),2);
  }

  function milliseconds(){
    return format(date.getMilliseconds(), 4);
  }

  function format(string, digits){
    var string = string + '';
    if ( config.with_leading_zeros ){
  		if ( string.length < digits ){
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
    var with_leading_zeros = config.with_leading_zeros;   // cache the original setting
    config.with_leading_zeros = true;                     // temporarily set it to true
    self.build();                                         // re-initialize the members
    config.with_leading_zeros = with_leading_zeros;       // set it back
    return self.year + "-" + self.month + "-" + self.day + " " + self.hours + ":" + self.minutes + ":" + self.seconds;    
  }


  return self.initialize();
};
