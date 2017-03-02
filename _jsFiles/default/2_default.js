const domain = "/api/v1/";
const link_domain = "/link/";
// const domain = "http://steve.zanity.net:53455/api/v1/";

// Helps check if element exists
$.fn.exists = function () {
    return this.length !== 0;
};

// Enable Bootstrap tooltip everywhere
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// Refresh the udata variable form session storage
function getUserDetails(id) {

  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "user/" + id, function(udata) {
    if (sessionStorage.user_id !== undefined) {
      sessionStorage.removeItem('user_id');
    }
    sessionStorage.udata = JSON.stringify(udata.data);
    if (window.location.pathname == "/auth") {
      window.location = "/user";
    } else if (window.location.pathname == "/") {
      window.location = "/user";
    }
  });
}

// Access control
function access(type) {
  if (type == "student") {
    $('.student').show();
    if (window.location.pathname != "/user") {
      window.location = "user";
    }
  } else if (type == "teacher") {
    $('.teacher').css('display', 'flex');
    $('.landing-user-management, .landing-class-management').addClass('disabled-link');
    $('.user-management-admin, .class-management-admin').addClass('disabled');
    $('.user-management-admin, .class-management-admin').addClass('disabled-link');
    $('.disabled-link a').attr('title', 'Sorry you do not have permission to access this.');
    $('.disabled-link a').click(function(event) {
      event.preventDefault();
    });
  } else if (type == "admin") {
    $('.admin').css('display', 'flex');
    $('button.admin').css('display', 'inline-block');
  }
}

// Gives the loading gif file some entry and exit animation
$(document).ajaxStart(function() {
  $('.loading').slideDown();
}).ajaxStop(function() {
  $('.loading').slideUp();
});

// Play a beep sound when an error occur
(function(){
  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;">' + '<source src="audio/Beep_025sec.wav" />' + '<embed src="audio/Beep_025sec.wav" hidden="true" autostart="true" loop="false" class="playSound" />' + '</audio>'
      ).appendTo('body');
    }
  });
})(jQuery);

// Catch all ajax errors
function AjaxError(x, e) {
  if (x.status === 0) {
    errorMsg("The server might be down");
  } else if (x.status == 404) {
    errorMsg("Requested URL not found. Server could be offline.");
  } else if (x.status == 500) {
    errorMsg("Internel Server Error.");
  }  else {
    errorMsg('Unknown Error.\n' + x.responseText + ".");
  }
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

function setStDateTime(day, month, year, hour, minute, second) {
  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "+02:00";
}

function stDateTime() {
  var date = new Date();
  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }
  var year = date.getFullYear();
  var hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
	var minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
	var second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }

  return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + "+02:00";
}

function stTime() {
  var date = new Date();
  var hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }

  var minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }

  var second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }

  return hour + ":" + minute + ":" + second;
}

function statusMsg(msg) {
  $('.alert.alert-success, .alert.alert-danger').remove();
  msg = $('<div class="alert alert-success"></div>').html('<strong>Yay! </strong>' + msg);
  $(msg).insertBefore(".content");
  $('.alert.alert-success').slideDown();
  $('html, body').animate({scrollTop : 0},800);
  $('.alert.alert-success').delay(3000).slideUp();
}

function errorMsg(msg) {
  $('.alert.alert-success, .alert.alert-danger').remove();
  msg = $('<div class="alert alert-danger error-message"></div>').html("<strong>Oh snap!</strong> " + msg);
  $.playSound();
  $(msg).insertBefore('.content');
  $('.alert.alert-danger').slideDown();
  $('html, body').animate({scrollTop : 0},800);
  $('.alert.alert-danger').delay(5000).slideUp();
}

function capitalize(str) {
  str = str;
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function convertMonth(m) {
  switch (m) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
}

// Script to automatically log the user out when idle for 3 minutes
// var idleTime = 0;
// $(document).ready(function () {
//     //Increment the idle time counter every minute.
//     var idleInterval = setInterval(timerIncrement, 60000); // 1 minute
//
//     //Zero the idle timer on mouse movement.
//     $(this).mousemove(function (e) {
//         idleTime = 0;
//     });
//     $(this).keypress(function (e) {
//         idleTime = 0;
//     });
// });
//
// function timerIncrement() {
//     idleTime = idleTime + 1;
//     if (idleTime > 2) { // 20 minutes
//         window.location = "/user/logout";
//     }
// }
