$(document).ready(function() {
  $('form#add').submit(function(event) {
    var data = $(this).serializeArray();
    var fname = data[0].value;
    var lname = data[1].value;
    var email = data[2].value + "@cedarhouse.co.za";
    email = email.toLowerCase();
    var type = data[3].value;
    var pass1 = data[4].value;
    var pass2 = data[5].value;
    var id = 0;
    var match = false;
    if (pass1 == pass2) {
      match = true;
      console.log("Passwords match");
    } else {
      errorMsg("The passwords don't match, please re-enter.");
      $('div.modal#addUser').modal('toggle');
    }
    if (match) {
      $.ajax({
        url: domain + "user",
        type: "POST",
        contentType: 'application/json',
        data: '{"fname": "' + fname + '", "lname": "' + lname + '", "email": "' + email + '", "type": "' + type + '", "password": "' + pass1 + '"}',
        success: function (result, status, xhr) {
          $('table.users-table tbody').empty();
          statusMsg("Added new user");
          getUsers();
          $('div.modal#addUser').modal('toggle');
          id = result.data.id;
          setPrivilege(id);
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          var msg = $('<div class="alert alert-danger"></div>').html('<strong>Oh no!</strong> ' + capitalize(response.error));
          $(msg).insertBefore('.content');
        },
      });

    }
    event.preventDefault();
  });
});

function setPrivilege(id) {
  $.ajax({
    url: domain + "user/" + id + "/privilege/mac",
    type: "PUT",
  });
}
