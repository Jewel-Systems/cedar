$(document).ready(function() {

  if (sessionStorage.email === undefined) {
    window.location = "/cedar";
  } else {

    getDevices();

    if (sessionStorage.user_type == "admin") {
      getUsers();
      getReservations();
      $(document).ajaxStop(function(event, xhr, settings) {
        $('.users').css("display", "block");
        $('.teacher').fadeIn();
        $('.admin').fadeIn();
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

    $(document).ajaxStart(function() {
      $('.loading').fadeIn(1000);
    }).ajaxStop(function() {
      $('.loading').fadeOut(1000);
    });
  }
});
