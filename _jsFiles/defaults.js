const domain = "http://localhost:200/api/v1/";
const link_domain = "http://localhost:200/link/";
// const domain = "http://localhost:3000/api/v1/";
// const link_domain = "http://localhost:3000/link/";
// const domain = "http://steve.zanity.net:53455/api/v1/";

$(document).ready(function() {
  $('h2.addStatus').css("display", "none");
});

$(document).ajaxStart(function() {
  $('.loading').slideDown();
}).ajaxStop(function() {
  $('.loading').slideUp();
});

$(document).ajaxStop(function() {
  if (!$.trim($('table.users-table tbody').html()).length) {
    $('table.users-table tbody').append('<p class="text-danger">No results found</p>');
  }
  if (!$.trim($('table.available-devices tbody').html()).length) {
    $('table.available-devices tbody').append('<p class="text-danger">No results found</p>');
  }
  if (!$.trim($('table.device-reservations tbody').html()).length) {
    $('table.device-reservations tbody').append('<p class="text-danger">No results found</p>');
  }
});

function errorMsg(msg) {
  $('.alert.alert-danger').remove();
  $('.alert.alert-success').remove();
  msg = $('<div class="alert alert-danger error-message"></div>').html("<strong>Oh snap!</strong> " + msg);
  $(msg).insertBefore('.content');
  $('html, body').animate({scrollTop : 0},800);
  $('.alert.alert-danger, .alert.alert-success').delay(3000).slideUp();
}

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
  $('.alert.alert-success').remove();
  $('.alert.alert-danger').remove();
  msg = $('<div class="alert alert-success"></div>').html('<strong>Yay! </strong>' + msg);
  $(msg).insertBefore(".content");
  $('html, body').animate({scrollTop : 0},800);
  $('.alert.alert-danger, .alert.alert-success').delay(3000).slideUp();
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
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
var idleTime = 0;
$(document).ready(function () {
    //Increment the idle time counter every minute.
    var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
});

function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 2) { // 20 minutes
        window.location = "/user/logout";
    }
}
