function getDevices() {

  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "device", function(data, status) {
    datas = data.data;
    status = data.success;

    var devices = '';
    for (var i = 0; i < datas.length; i++) {
      device = datas[i];
      // If the user is student or teacher, then they can do the following:
      // -- Loan Device
      // -- Return Device

      // If the user is a teacher, then s/he can return the device
      if (device.loaned_by === null && device.is_active && (sessionStorage.user_type == "student" || sessionStorage.user_type == "teacher")) {
        devices += '';
      } else if (sessionStorage.user_type == "admin") {
        // Admins have many functions, namely:
        // -- Reservation Revocation
        // -- Add Device
        // -- Remove Device
        // -- Edit Device
        // -- Create Cards
        // -- Add User
        // -- Edit User
        // -- Remove User
        devices += '';
      }
    }
    // devices += '<script> $(\'form#selectDevice\').submit(function(event) {var data = $(this).serializeArray();loanDevice(data[0].value);event.preventDefault();});</script>';
    $('.content').append(devices);
  });

  $(document).ajaxStart(function() {
    $('.loading').fadeIn(1000);
  }).ajaxStop(function() {
    $('.loading').fadeOut(1000);
  });

}

function AjaxError(x, e) {
  var msg = null;
  if (x.status === 0) {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> The server might be down");
    $(msg).insertBefore('.panel');
  } else if (x.status == 404) {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> Requested URL not found. Server could be offline.");
    $(msg).insertBefore('.panel');
  } else if (x.status == 500) {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> Internel Server Error.");
    $(msg).insertBefore('.panel');
  }  else {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> " + 'Unknown Error.\n' + x.responseText + ".");
    $(msg).insertBefore('.panel');
  }
}
