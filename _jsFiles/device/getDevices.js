function getDevices() {

  // console.log(sessionStorage.device_loaned);

  $.ajaxSetup({
    error: AjaxError
  });

  var users = null;

  $.get(domain + "user", function(data, status) {
    users = data.data;
    status = data.success;

    if (status) {
      $.get(domain + "device", function(data, status) {
        datas = data.data;
        status = data.success;
        var p = sessionStorage.perm.split("#");

        var devices = '';
        if (status) {
          for (var i = 0; i < datas.length; i++) {
            device = datas[i];
            if (p[0] == device.type || p[1] == device.type) {
              if (sessionStorage.user_type == "student") {
                if (device.is_active && device.loaned_by === null) {
                  var d = null;
                  var dl = sessionStorage.device_loaned.split("#");
                  // dl[0] = mac:11;
                  // dl[1] = camera:8;
                  if (dl.length === 1) {
                    $('.available-devices').fadeIn();
                    var type = dl[0].split(":");
                    // type[0] = "mac";
                    // type[1] = "11";
                    if (device.type != type[0]) {
                      devices += '<tr>';
                      devices += '<td>' + device.id + '</td>';
                      devices += '<td>' + device.type + '</td>';
                      devices += '<td>';
                      devices += '<form class="pull-right" id="device" method="post">';
                      devices += '<input type="hidden" name="device_id" value="' + device.id + '" />';
                      devices += '<input id="rent" type="submit" class="btn btn-info" name="rent" value="Rent Device" />';
                      devices += '</form>';
                      devices += '</td>';
                      devices += '</tr>';
                    }
                  } else {
                    $('.available-devices').fadeOut();
                  }
                }
              } else if (sessionStorage.user_type == "admin" || (sessionStorage.user_type == "teacher" && device.is_active === true && (device.loaned_by == sessionStorage.user_id || device.loaned_by === null))) {
                // If the user is a teacher, then s/he can return the device
                var date = new Date(device.created_at);
                var id = device.id;
                var typ = device.type;
                var active = device.is_active;
                var loaned;
                var loanedb = device.loaned_by;
                date = date.getDate() + ' ' + convertMonth(date.getMonth()) + ' ' + date.getFullYear() + ', ' + date.getHours() + 'h' + date.getMinutes();

                devices += '<tr>';
                devices += '<td>' + id + '</td>';
                devices += '<td>' + typ + '</td>';
                devices += '<td class="admin">' + active + '</td>';

                for (var u = 0; u < users.length; u++) {
                  if (users[u].id === loanedb) {
                    loaned = "[" + users[u].id + "]: " + users[u].fname + " " + users[u].lname;
                  } else if (loanedb === null) {
                    loaned = "Not loaned";
                  }
                }

                devices += '<td class="admin teacher">' + loaned + '</td>';
                devices += '<td class="admin">' + date + '</td>';
                devices += '<td>';
                devices += '<form class="pull-right" id="device" method="post">';
                devices += '<input type="hidden" name="device_id" value="' + id + '" />';
                devices += '<input type="hidden" name="device_active" value="' + active + '" />';
                if (loanedb === null && active === true) {
                  devices += '<input type="submit" id="rent" class="btn btn-info" name="rent" value="Rent Device" />&nbsp;';
                } else {
                  devices += '<input type="submit" id="rent" class="btn btn-info" name="rent" value="Rent Device" disabled="disabled" />&nbsp;';
                }
                devices += '<input type="submit" id="active" class="btn btn-warning admin" name="active" value="Toggle Active" />&nbsp;';
                devices += '<input type="submit" id="delete" class="btn btn-danger admin" name="delete" value="Delete" />';
                devices += '</form>';
                devices += '</td>';
                devices += '</tr>';
              }
            }
          }
        } else {
          devices += 'Can\'t retrieve devices from server';
        }
        devices += '<script type="text/javascript" src="js/device/actions.js"></script>';
        $('.content table.available-devices tbody').append(devices);
      });
    } else {
      errorMsg("Couldn't retrieve users from the server.");
    }
  });
}

function AjaxError(x, e) {
  var msg = null;
  if (x.status === 0) {
    errorMsg("The server might be down");
  } else if (x.status == 404) {
    errorMsg("Requested URL not found. Server could be offline.");
  } else if (x.status == 500) {
    errorMsg("Internal Server Error.");
  }  else {
    errorMsg('Unknown Error.\n' + x.responseText + ".");
  }
}
