$(document).ready(function() {

  if (sessionStorage.email === undefined) {
    window.location = "/cedar";
  } else {

    if (sessionStorage.user_type == "admin") {
      getUsers();
      $('.users').css("display", "block");
    }

    getDevices();

    if (sessionStorage.user_type == "admin") {
      $('button#addUserBut').css("display", "block");
      $('button#addDeviceBut').css("display", "block");
    }

    $('form').submit(function(event) {
      event.preventDefault();
    });
  }
});
