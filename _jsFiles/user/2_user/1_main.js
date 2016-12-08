var udata = JSON.parse(sessionStorage.udata);

$(document).ready(function() {
  if(!$.trim($('.caramel .chocolate').html()).length) {
    getAllUsers();
  }

  if (udata.type == "admin") {
    userGetReady();
  }
});


$(document).one('ajaxStop', function() {
  access(udata.type);
});

// Get user page ready
function userGetReady() {
  $.get(domain + "user", function(data) {
    data = data.data;

    for (var i = 0; i < data.length; i++) {
      $('form#returnDevice-f3 select[name=user_id]').append('<option value="' + data[i].id + '">' + data[i].fname + ' ' + data[i].lname + '</option>');

      $('form#changePermission-f select[name="user"]').append('<option value="' + data[i].id + '">' + data[i].fname + ' ' + data[i].lname + '</option>');
    }

    $.get(domain + "user/" + data[0].id, function(u) {
      u = u.data;
      if (u.loaned.length > 1) {
        for (var j = 0; j < u.loaned.length; j++) {
          $('form#returnDevice-f3 select[name=device_id]').append('<option value="' + u.loaned[j].id + '">[' + u.loaned[j].type + '] ' + u.loaned[j].serial_no + '</option>');
        }
      } else if (u.loaned.length === 1) {
        $('form#returnDevice-f3 select[name=device_id]').append('<option value="' + u.loaned[0].id + '">[' + u.loaned[0].type + '] ' + u.loaned[0].serial_no + '</option>');
      } else if (u.loaned.length === 0) {
        $('form#returnDevice-f3 select[name=device_id]').attr('disabled', '');
      }

      if (u.privilages.length > 1) {
        for (var i = 0; i < u.privilages.length; i++) {
          if (u.privilages[i].type == "mac") {
            $('form#changePermission-f input[name="type"].mac').attr('checked', '');
          } else if (u.privilages[i].type == "camera") {
            $('form#changePermission-f input[name="type"].camera').attr('checked', '');
          }
        }
      } else if (u.privilages.length === 1) {
        if (u.privilages[0].type == "mac") {
          $('form#changePermission-f input[name="type"].mac').attr('checked', '');
        } else if (u.privilages[0].type == "camera") {
          $('form#changePermission-f input[name="type"].camera').attr('checked', '');
        }
      }
    });
  });
}

function displayUsers(data) {

  $.ajaxSetup({
    error: AjaxError
  });

  var display = '<table class="table"><thead class="thead-default"><tr><th>User ID</th><th>First name</th><th>Last name</th><th>Account type</th><th>Options</th></tr></thead><tbody>';

  for (var i = 0; i < data.length; i++) {
    display += '<tr>';
    display += '<th scope="row">' + data[i].id + '</th>';
    display += '<td>' + capitalize(data[i].fname) + '</td>';
    display += '<td>' + capitalize(data[i].lname) + '</td>';
    display += '<td>' + capitalize(data[i].type) + '</td>';
    display += '<td class="flex-items-md-center"><form id="delete-user" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><button class="btn btn-danger btn-block">Delete</button></form></td>';
    display += '</tr>';
  }

  display += '</tbody></table>';

  if($.trim($('.caramel .chocolate').html()).length) {
    $('.caramel .chocolate').empty();
  }

  $('.caramel .chocolate').append(display);
}

function filterByAccount(f) {
  $.get(domain + "user", function(data) {
    users = data.data;
    users = $.grep(users, function(n, i) {
      return n.type == f;
    });
    displayUsers(users);
  });
}

function privilege(option, id, type) {
  $.ajax({
    url: domain + "user/" + id + "/privilege/" + type,
    type: option,
    success: function(data) {
      if (option == "PUT") {
        statusMsg("Privilege given.");
      } else {
        statusMsg("Privilege revoked.");
      }
    },
    error: function(e) {
      e = JSON.parse(e.responseText);
      errorMsg(e.error);
    }
  });
}
