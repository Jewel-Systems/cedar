function errorMsg(e){$(".alert.alert-danger").remove(),$(".alert.alert-success").remove(),e=$('<div class="alert alert-danger error-message"></div>').html("<strong>Oh snap!</strong> "+e),$(e).insertBefore(".content"),$("html, body").animate({scrollTop:0},800)}function setStDateTime(e,t,r,n,a,s){return e<10&&(e="0"+e),t<10&&(t="0"+t),n<10&&(n="0"+n),a<10&&(a="0"+a),s<10&&(s="0"+s),r+"-"+t+"-"+e+"T"+n+":"+a+":"+s+"+02:00"}function stDateTime(){var e=new Date,t=e.getDate();t<10&&(t="0"+t);var r=e.getMonth();r<10&&(r="0"+r);var n=e.getFullYear(),a=e.getHours();a<10&&(a="0"+a);var s=e.getMinutes();s<10&&(s="0"+s);var o=e.getSeconds();return o<10&&(o="0"+o),n+"-"+r+"-"+t+"T"+a+":"+s+":"+o+"+02:00"}function stTime(){var e=new Date,t=e.getHours();t<10&&(t="0"+t);var r=e.getMinutes();r<10&&(r="0"+r);var n=e.getSeconds();return n<10&&(n="0"+n),t+":"+r+":"+n}function statusMsg(e){$(".alert.alert-success").remove(),$(".alert.alert-danger").remove(),e=$('<div class="alert alert-success"></div>').html("<strong>Yay! </strong>"+e),$(e).insertBefore(".content"),$("html, body").animate({scrollTop:0},800)}function capitalize(e){return e.charAt(0).toUpperCase()+e.slice(1)}function convertMonth(e){switch(e){case 1:return"January";case 2:return"February";case 3:return"March";case 4:return"April";case 5:return"May";case 6:return"June";case 7:return"July";case 8:return"August";case 9:return"September";case 10:return"October";case 11:return"November";case 12:return"December"}}function timerIncrement(){idleTime+=1,idleTime>2&&(window.location="/user/logout")}const domain="http://localhost:200/api/v1/",link_domain="http://localhost:200/link/";$(document).ready(function(){$("h2.addStatus").css("display","none")}),$(document).ajaxStart(function(){$(".loading").slideDown()}).ajaxStop(function(){$(".loading").slideUp()}),$(document).ajaxStop(function(){$.trim($("table.users-table tbody").html()).length||$("table.users-table tbody").append('<p class="text-danger">No results found</p>'),$.trim($("table.available-devices tbody").html()).length||$("table.available-devices tbody").append('<p class="text-danger">No results found</p>'),$.trim($("table.device-reservations tbody").html()).length||$("table.device-reservations tbody").append('<p class="text-danger">No results found</p>')});var idleTime=0;$(document).ready(function(){setInterval(timerIncrement,6e4);$(this).mousemove(function(e){idleTime=0}),$(this).keypress(function(e){idleTime=0})});