// Compressed using Coyote

// Files included:
// src/utils.js
// src/utils/hash.js
// src/utils/date.js



var Utils=Utils||{extend:function(c,d){if(typeof c!=="object")return d;for(var b in d)typeof c[b]==="undefined"&&(c[b]=d[b]);return c}};
Utils.Hash=function(c){function d(){location.pathname.charAt(location.pathname.length-1)!=="/"&&(location.pathname+="/")}var b=this,c=Utils.extend(c,{slash:!0});b.initialize=function(){c.slash&&d();return b};b.get=function(){return location.hash};b.set=function(a){c.slash&&d();c.slash&&a.charAt(0)!=="/"&&(a="/"+a);location.hash=a.replace(/-/g,"/");return b.get()};b.segments=function(){var a=b.get();a.charAt(a.length-1)==="/"&&(a=a.substring(0,a.length-1));a=a.split("/");a.shift();return a};b.segment=
function(a){var e=b.segments()[a-1];if(typeof e==="undefined")return console.log("Error: Hash segment at index "+a+" does not exist"),!1;return e};b.element=function(){var a=b.segments(),e="",f;for(f in a){var d=a[f],c=f%2,g=!c;f==0?e+="#"+d:(g&&(e+=" > ."+d),c&&(isNaN(d)?e+=" > ."+d:(c=a[f-1],c.charAt(c.length-1)==="s"&&(c=c.substring(0,c.length-1)),e+=" > ."+c+":eq("+(d-1)+")")))}return e};b.onChange=function(a){!jQuery&&jQuery().hashchange?$(window).hashchange(a):window.onhashchange=a};return b.initialize()};
Utils.Date=function(c,d){function b(a,b){a+="";if(d.with_leading_zeros&&a.length<b)for(;a.length<b;)a="0".concat(a+"");return a}var a=this,d=Utils.extend(d,{with_leading_zeros:!1}),e=new Date(c);a.initialize=function(){a.build();return a};a.build=function(){a.year=b(e.getFullYear(),4);a.month=b(e.getMonth(),2);a.day=b(e.getDate(),2);a.hours=b(e.getHours(),2);a.minutes=b(e.getMinutes(),2);a.seconds=b(e.getSeconds(),2);a.milliseconds=b(e.getMilliseconds(),4)};a.as_rails_datetime=function(){var b=d.with_leading_zeros;
d.with_leading_zeros=!0;a.build();d.with_leading_zeros=b;return a.year+"-"+a.month+"-"+a.day+" "+a.hours+":"+a.minutes+":"+a.seconds}();return a.initialize()};