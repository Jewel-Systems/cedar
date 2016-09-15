$(document).ready(function() {

  if (sessionStorage.email === undefined) {
    window.location = "/cedar";
  } else {

    if (sessionStorage.device_loaned !== null) {
      getDevices();
      $('form#returnD').remove();
    }

    if (sessionStorage.user_type == "admin") {
      getUsers();
      getReservations();
      $(document).ajaxStop(function(event, xhr, settings) {
        $('.users').css("display", "block");
        $('.teacher').fadeIn();
        $('.admin').fadeIn();
        $('form#returnD').css('display', 'none');
      });
    }

    if (sessionStorage.user_type == "teacher") {
      getReservations();
      $(document).ajaxStop(function() {
        $('button#reserveDeviceBut').css("display", "block");
        $('.teacher').fadeIn();
      });
    }

    if (sessionStorage.user_type == "admin" || sessionStorage.user_type == "teacher") {
      getTypes();
      getClasses();
    }

    $('form').submit(function(event) {
      event.preventDefault();
    });
  }
});
