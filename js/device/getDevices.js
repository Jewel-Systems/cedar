function getDevices() {

  $.ajaxSetup({
    error: AjaxError
  });

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
            // If the user is student or teacher, then they can do the following:
            // -- Loan Device
            // -- Return Device
            if (device.is_active && device.loaned_by === null) {
              devices += '<tr>';
              devices += '<td>' + device.id + '</td>';// Device ID
              devices += '<td>' + device.type + '</td>';// Type
              devices += '<td>';// Options
              devices += '<form class="pull-right" id="device" method="post">';
              devices += '<input type="hidden" name="device_id" value="' + device.id + '" />';
              devices += '<input type="submit" class="btn btn-info" name="rent" value="Rent Device" />';
              devices += '</form>';
              devices += '</td>';
              devices += '</tr>';
            }
          } else {
            // If the user is a teacher, then s/he can return the device

            // Admins have many functions, namely:
            // -- Reservation Revocation
            // -- Add Device
            // -- Remove Device
            // -- Edit Device
            // -- Create Cards
            // -- Add User
            // -- Edit User
            // -- Remove User
            var date = new Date(device.created_at);

            devices += '<tr>';

            devices += '<td>' + device.id + '</td>';
            devices += '<td>' + device.type + '</td>';
            devices += '<td class="admin">' + device.is_active + '</td>';
            devices += '<td class="admin teacher">' + device.loaned_by + '</td>';
            devices += '<td class="admin">' + date.getDate() + ' ' + convertMonth(date.getMonth()) + ' ' + date.getFullYear() + ', ' + date.getHours() + 'h' + date.getMinutes() + '</td>';
            devices += '<td>';
            devices += '<form class="pull-right" id="device" method="post">';
            devices += '<input type="hidden" name="device_id" value="' + device.id + '" />';
            devices += '<input type="hidden" name="device_active" value="' + device.is_active + '" />';
            devices += '<input type="submit" id="rent" class="btn btn-info" name="rent" value="Rent Device" />&nbsp;';
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
}

function AjaxError(x, e) {
  var msg = null;
  if (x.status === 0) {
    errorMsg("The server might be down");
  } else if (x.status == 404) {
    errorMsg("Requested URL not found. Server could be offline.");
  } else if (x.status == 500) {
    errorMsg("Internel Server Error.");
  }  else {
    errorMsg('Unknown Error.\n' + x.responseText + ".");
  }
}
