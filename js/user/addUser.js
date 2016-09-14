$(document).ready(function() {
  $('form#add').submit(function(event) {
    var data = $(this).serializeArray();
    var jsondata = "{";
    var pass1 = null;
    var pass2 = null;
    var id = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].name === "pass1") {
        pass1 = data[i].value;
      } else if (data[i].name === "pass2") {
        pass2 = data[i].value;
      }
      if ((i == (data.length - 1)) || (i == (data.length - 2))) {
        if ((pass1 === pass2) && (i == (data.length - 1))) {
          $('h4.addStatus').css('display', 'none');
          jsondata += "\"password\" : \"" + pass1 + "\"}";
          $.ajax({
            url: domain + "user",
            type: "POST",
            contentType: 'application/json',
            data: jsondata,
            success: function (result, status, xhr) {
              if (result) {
                $('table.users-table tbody').empty();
                statusMsg("Added new user");
                getUsers();
                $('div.modal#addUser').modal('toggle');
              } else {
                console.log(result.success);
                id = result.id;
              }
            },
            error: function(xhr, status, error) {
              var response = JSON.parse(xhr.responseText);
              var msg = $('<div class="alert alert-danger"></div>').html('<strong>Oh no!</strong> ' + capitalize(response.error));
              $(msg).insertBefore('.content');
            },
          });
          $.ajax({
            url: domain + "user/" + id + "/privilege/mac",
            type: "PUT",
          });
        } else if ((pass1 !== pass2) && (i == (data.length - 1))) {
          $('h4.addStatus').css("display", "block").append("Passwords don't match");
          event.preventDefault();
        }
      } else {
        jsondata += "\"" + data[i].name + "\" : \"" + data[i].value + "\", ";
      }
    }
    event.preventDefault();
  });
});
