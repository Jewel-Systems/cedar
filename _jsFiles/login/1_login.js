if (sessionStorage.udata !== undefined) {
  window.location = "user";
}

$('form.password').submit(function(event) {
  var userID = sessionStorage.user_id;
  var data = $(this).serializeArray();

  $.ajaxSetup({
    error: AjaxError
  });

  $.ajax({
    url: domain + 'testauth',
    type: 'POST',
    data: JSON.stringify({"username": userID, "password": data[0].value}),
    contentType: 'application/json',
    success: function (result, status, xhr) {
      getUserDetails(result.data.id);
    },
    error: function (result, status, xhr) {
      errorMsg("Sorry can't recognise that QR code, talk to your IT admin please.");
    }
  });

  event.preventDefault();
});

function login(id) {

  $.ajaxSetup({
    error: AjaxError
  });

  $.ajax({
    url: domain + 'testauth',
    type: 'POST',
    data: JSON.stringify({"username": id, "password" : ""}),
    contentType: 'application/json',
    success: function(result, status, xhr) {
      var user_data = result.data;

      if (user_data.type != "student") {
        sessionStorage.setItem('user_id', user_data.id);
        window.location = "auth";
      } else {
        getUserDetails(user_data.id);
      }
    },
    error: function(xhr, status, error) {
      if (xhr.readyState === 0) {
        errorMsg("The server may be down.");
      } else if (xhr.readyState === 4) {
        errorMsg("Sorry can't recognise that QR code, talk to your IT admin please.");
      }
    },
  });
}
