$(document).ready(function() {

  if (typeof sessionStorage.email != "undefined") {
    window.location = "/cedar/user";
  } else {
    $('.content img.loading').fadeIn(1000);
    $('.content img.loading').css('display', 'block');
    $('.content img.loading').delay(2000).fadeOut(1000);
    $('.content p.greeting').delay(5000).fadeIn(1000);
    $('.content p.greeting').delay(2000).fadeOut(1000);
    $('.content .panel').delay(10000).fadeIn(1000);
    $('.content .panel').fadeIn(1000);
  }

  // $('.content .panel').fadeIn(1000);

  $('form.loginForm').submit(function(event) {
    var data = $(this).serializeArray();

    $.ajax({
      url: domain + 'testauth',
      type: 'POST',
      data: JSON.stringify({"username": data[0].value, "password" : data[1].value}),
      contentType: 'application/json',
      success: function(result, status, xhr) {
        var user_data = result.data;

        if (typeof(Storage) !== "undefined") {
          sessionStorage.user_id = user_data.id;
          sessionStorage.email = user_data.email;
          sessionStorage.fname = user_data.fname;
          sessionStorage.lname = user_data.lname;
          sessionStorage.user_type = user_data.type;
          sessionStorage.created_at = user_data.created_at;
          $.get(domain + "user/" + user_data.id, function(data) {
            data = data.data;
            sessionStorage.device_loaned = data.loaned[0].id;
            if (data.privilages.length > 1) {
              sessionStorage.perm = data.privilages[0].type + "#" + data.privilages[1].type;
            } else {
              sessionStorage.perm = data.privilages[0].type;
            }
            window.location = "/cedar/user";
          });
        } else {
          $('.error-message').remove();
          var msg = $('<div class="alert alert-danger error-message"></div>').html("<strong>Oh snap!</strong> Your browser doesn't support local storage, please update your browser or download <a href='https://www.google.com/chrome/'>Google Chrome</a>/<a href='https://www.mozilla.org/en-US/firefox/new/'>Mozilla Firefox</a>.");
          $(msg).insertBefore('.panel');
          event.preventDefault();
        }
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        // var response = xhr.statusText;
        success = response.success;
        var errorMsg = response.error;
        $('.error-message').remove();
        var msg = $('<div class="alert alert-danger error-message"></div>').html("<strong>Oh snap!</strong> The email/ID or password entered is incorrect, please try again.");
        $(msg).insertBefore('.panel');
      },
    });
    event.preventDefault();
  });
});
