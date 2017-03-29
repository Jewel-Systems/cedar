$(document).ready(function() {
  var page = getUrlParameter("page");

  if (sessionStorage.udata === undefined) {
    window.location = "/";
  }

  getAvailableDevices();

  var udata = JSON.parse(sessionStorage.udata);

  getLoanedDevices();

  // Deals with access control
  access(udata.type);

  $('.user-name').text(udata.fname + ' ' + udata.lname);

  // a = small letter
  // b = uppercased
  function change(a, b) {
    $('h3.card-title').text(b + " Management");

    if ($('a.user.nav-link').hasClass('active')) {
      $('a.user.nav-link').removeClass('active');
    } else if ($('a.device.nav-link').hasClass('active')) {
      $('a.device.nav-link').removeClass('active');
    } else if ($('a.reservation.nav-link').hasClass('active')) {
      $('a.reservation.nav-link').removeClass('active');
    } else if ($('a.class.nav-link').hasClass('active')) {
      $('a.class.nav-link').removeClass('active');
    }

    $('a.' + a + '.nav-link').addClass('active');
    $('li.breadcrumb-item.active').text(b + ' Management');

    $('.caramel').load("user/management/sections/" + a + ".html");

    if (page == "device") {
      getDevices();
    } else if (page == "user") {
      if (udata.type == "teacher") {
        window.location = "/user";
      }
      if(!$.trim($('.caramel .chocolate').html()).length) {
        getAllUsers();
      }
    } else if (page == "reservation") {
      getClassesDD();
      getReservers();
      getReservations();
    } else if (page == "class") {
      if (udata.type == "teacher") {
        window.location = "/user";
      }
      if(!$.trim($('.caramel .chocolate').html()).length) {
        displayClasses();
      }
    }
  }

  change(page, capitalize(page));
});

$(document).one('ajaxStop', function() {
  checkData();
});

function getAvailableDevices() {
  $.ajaxSetup({
    error: AjaxError
  });

  $('select.available-devices').empty();

  $.get(domain + "device", function(data) {
    data = data.data;
    data = $.grep(data, function(n, i) {
      return n.is_active === true && n.loaned_by === null;
    });

    for (var i = 0; i < data.length; i++) {
      $('select.available-devices').append('<option value="' + data[i].id + '">[' + data[i].type + '] ' + data[i].serial_no + '</option>');
    }
  });
}

function getLoanedDevices() {
  var udata = JSON.parse(sessionStorage.udata);

  $('form#returnDevice-f1 select').empty();

  for (var i = 0; i < udata.loaned.length; i++) {
    $('form#returnDevice-f1 select').append('<option value="' + udata.loaned[i].id + '">[' + udata.loaned[i].type + ']' + udata.loaned[i].serial_no + '</option>');
  }
}

function checkData() {
  var udata = JSON.parse(sessionStorage.udata);
  if (udata.type == 'student') {
    if (udata.loaned.length === 0) {
      $('button#returnBtn-1').hide();
    } else if (udata.loaned.length === 1) {
      $('button#returnBtn-1').removeAttr('data-toggle data-target');
    } else if (udata.loaned.length === 2) {
      $('.student-available-devices').hide();
    } else {
      $('.student-available-devices').show();
      $('button#returnBtn-1').show();
    }
  }
}
