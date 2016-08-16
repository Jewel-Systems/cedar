$(document).ready(function() {

  if (typeof sessionStorage.email != "undefined") {
    window.location = "/cedar/user";
  } else {
    // $('.content img.loading').fadeIn(1000);
    // $('.content img.loading').css('display', 'block');
    // $('.content img.loading').delay(2000).fadeOut(1000);
    // $('.content p.greeting').delay(5000).fadeIn(1000);
    // $('.content p.greeting').delay(2000).fadeOut(1000);
    // $('.content .panel').delay(10000).fadeIn(1000);
    $('.content .panel').fadeIn(1000);
  }

  $('form.loginForm').submit(function(event) {
    var data = $(this).serializeArray();
    if (typeof(Storage) !== "undefined") {
      if (typeof sessionStorage.email == "undefined") {
        sessionStorage.email = data[0]["value"];
        sessionStorage.pass = data[1]["value"];
        window.location = "/cedar/user";
      }
    } else {
      alert("Your browser doesn't support local storage, please update your browser");
      event.preventDefault();
    }
  });
});
