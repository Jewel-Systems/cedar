$(document).ready(function() {
  $('form#add').submit(function(event) {
    var data = $(this).serializeArray();
    var blank = false;
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
      if (data[2].value.search("@") === -1 && data[2].value.search(" ") === -1) {
        match = true;
      } else {
        errorMsg("The email you have entered is invalid. Just enter the username for the email, the '@cedarhouse.co,za' will be automatically incremented.");
        $('div.modal#addUser').modal('toggle');
      }
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
