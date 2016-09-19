const domain = "http://localhost:200/api/v1/";
const link_domain = "http://localhost:200/link/";
// const domain = "http://steve.zanity.net:53455/api/v1/";

$(document).ready(function() {
  $('h2.addStatus').css("display", "none");
});

$(document).ajaxStart(function() {
  $('.loading').slideDown();
  var x = 0;
  for (var i = 0; i < 5; i++) {
    setTimeout(function(){
      x++;
    },1000);
    if (x === 4) {
      errorMsg("The page is taking longer than it should to load, please refresh the page or wait a bit longer.");
    }
  }
}).ajaxStop(function() {
  $('.loading').slideUp();
  $('.alert.alert-danger').remove();
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
}

function setStDateTime(day, month, year, hour, minute, second) {
  if (day < 10) {
    day = "0" + day;
  }
  console.log("Day: " + day);

  if (month < 10) {
    month = "0" + month;
  }
  console.log("Month: " + month);
  console.log("Year: " + year);

  if (hour < 10) {
    hour = "0" + hour;
  }
  console.log("Hour: " + hour);

  if (minute < 10) {
    minute = "0" + minute;
  }
  console.log("Minute: " + minute);

  if (second < 10) {
    second = "0" + second;
  }
  console.log("Second: " + second);

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
