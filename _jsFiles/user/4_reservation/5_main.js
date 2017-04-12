function displayReservations(data) {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "class", function(c) {
    var cl = c.data;
    $.get(domain + "user", function(u) {
      var users = u.data;

      var display = '<table class="table"><thead class="thead-default"><tr><th>ID</th><th>Reserver</th><th>Class</th><th>Device</th><th>Start time</th><th>End time</th><th>Safe zone</th><th>Option</th></tr></thead><tbody>';

      if (data.length === 0) {
        display += '<tr>';
        display += '<td colspan="8" class="text-center">No results found</td>';
        display += '</tr>';
      }

      for (var i = 0; i < data.length; i++) {
        display += '<tr>';
        display += '<th>' + data[i].id + '</th>';
        var reserver;
        for (var j = 0; j < users.length; j++) {
          if (users[j].id === data[i].user_id) {
            reserver = users[j].fname + ' ' + users[j].lname;
          }
        }
        display += '<td>' + reserver + '</td>';

        var cls;
        for (var h = 0; h < cl.length; h++) {
          if (cl[h].id === data[i].class_id) {
            cls = cl[h].name;
          }
        }
        display += '<td>' + capitalize(cls) + '</td>';
        display += '<td>' + capitalize(data[i].type) + '</td>';
        display += '<td>' + new Date(data[i].start_time) + '</td>';
        display += '<td>' + new Date(data[i].end_time) + '</td>';
        display += '<td>' + data[i].safe_zone + '</td>';
        display += '<td class="flex-items-md-center"><form id="delete-reservation" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><button class="btn btn-danger btn-block">Delete</button></form></td>';
        display += '</tr>';
      }

      display += '</tbody></table>';

      if($.trim($('.caramel .chocolate').html()).length) {
        $('.caramel .chocolate').empty();
      }

      $('.caramel .chocolate').append(display);
    });
  });
}

function filterByTypeR(f) {
  f = f.toLowerCase();

  $.get(domain + "reservation", function(data) {
    var reservations = data.data;
    reservations = $.grep(reservations, function(n, i) {
      return n.type == f;
    });
    displayReservations(reservations);
  });
}

function filterByUser(f) {
  var name = f.split(' ');
  var fname = name[0];
  var lname = name[1];

  $.get(domain + "user", function(users) {
    users = users.data;
    var id;

    for (var i = 0; i < users.length; i++) {
      if (users[i].fname == fname && users[i].lname == lname) {
        id = users[i].id;
      }
    }

    $.get(domain + "reservation", function(data) {
      reservations = data.data;
      reservations = $.grep(reservations, function(n, i) {
        return n.user_id == id;
      });
      displayReservations(reservations);
    });
  });
}

function filterByClass(f) {
  $.get(domain + "class", function(classes) {
    classes = classes.data;
    var id;

    for (var i = 0; i < classes.length; i++) {
      if (classes[i].name == f) {
        id = classes[i].id;
      }
    }

    $.get(domain + "reservation", function(data) {
      reservations = data.data;

      reservations = $.grep(reservations, function(n, i) {
        return n.class_id === id;
      });
      displayReservations(reservations);
    });
  });
}

function delete_reservation(id) {
  $.ajax({
    url: domain + "reservation/" + id,
    type: "DELETE",
    success: function(data) {
      getReservations();
      statusMsg("Reservation deleted");
    },
    error: function(e) {
      e = JSON.parse(e.responseText);
      errorMsg(e.error);
    }
  });
}
