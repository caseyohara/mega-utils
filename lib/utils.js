// Compressed using Coyote

// Files included:
// src/utils.js
// src/utils/hash.js
// src/utils/date.js



var Utils=Utils||{extend:function(c,f){if(typeof c!=="object")return f;for(var e in f)typeof c[e]==="undefined"&&(c[e]=f[e]);return c}};
Utils.Hash=function(c){function f(){location.pathname.charAt(location.pathname.length-1)!=="/"&&(location.pathname+="/")}var e=this,c=Utils.extend(c,{slash:!0});e.initialize=function(){c.slash&&f();return e};e.get=function(){return location.hash};e.set=function(b){c.slash&&f();c.slash&&b.charAt(0)!=="/"&&(b="/"+b);location.hash=b.replace(/-/g,"/");return e.get()};e.segments=function(){var b=e.get();b.charAt(b.length-1)==="/"&&(b=b.substring(0,b.length-1));b=b.split("/");b.shift();return b};e.segment=
function(b){var d=e.segments()[b-1];if(typeof d==="undefined")return console.log("Error: Hash segment at index "+b+" does not exist"),!1;return d};e.element=function(){var b=e.segments(),d="",f;for(f in b){var c=b[f],g=f%2,a=!g;f==0?d+="#"+c:(a&&(d+=" > ."+c),g&&(isNaN(c)?d+=" > ."+c:(g=b[f-1],g.charAt(g.length-1)==="s"&&(g=g.substring(0,g.length-1)),d+=" > ."+g+":eq("+(c-1)+")")))}return d};e.onChange=function(b){!jQuery&&jQuery().hashchange?$(window).hashchange(b):window.onhashchange=b};return e.initialize()};
Utils.Date=function(c,f){function e(){var a=b(h.getFullYear(),4),d=b(h.getMonth()+1,2),e=b(h.getDate(),2),c=b(h.getHours(),2);if(f.military_time===!1){if(c==24||c==0)c=12;c>12&&(c-=12)}f.with_leading_zeros||c.length>1&&c.charAt(0)=="0"&&(c=c.substring(0,c.length));return{year:a,month:d,day:e,hours:c,minutes:b(h.getMinutes(),2,!0),seconds:b(h.getSeconds(),2),milliseconds:b(h.getMilliseconds(),4),ampm:h.getHours()>=12?"pm":"am",day_of_week:i[h.getDay()],month_of_year:g[h.getMonth()]}}function b(a,b,
c){a+="";if((f.with_leading_zeros||c)&&a.length<=b)for(;a.length<b;)a="0".concat(a+"");return a}var d=this,f=Utils.extend(f,{with_leading_zeros:!1,military_time:!0}),h=new Date(c),i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],g=["January","February","March","April","May","June","July","August","September","October","November","December"];d.initialize=function(){var a=e();d.year=a.year;d.month=a.month;d.day=a.day;d.hours=a.hours;d.minutes=a.minutes;d.seconds=a.seconds;
d.milliseconds=a.milliseconds;d.ampm=a.ampm;d.day_of_week=a.day_of_week;d.month_of_year=a.month_of_year;return d};d.as_rails_datetime=function(){f.with_leading_zeros=!0;f.military_time=!0;var a=e();return a.year+"-"+a.month+"-"+a.day+" "+a.hours+":"+a.minutes+":"+a.seconds}();d.verbose=function(){f.with_leading_zeros=!1;f.military_time=!1;var a=e();return a.day_of_week+", "+a.month_of_year+" "+a.day+", "+a.year+" at "+a.hours+":"+a.minutes+a.ampm}();return d.initialize()};