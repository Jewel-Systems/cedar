$(document).one('ajaxStop', function() {
  var udata = JSON.parse(sessionStorage.udata);
  access(udata.type);

  if (udata.type == "teacher") {
    if($.trim($('form#returnDevice-f2 select[name=device_id]').html()).length) {
      $('form#returnDevice-f2 select[name=device_id]').empty();
    }
    for (var i = 0; i < udata.loaned.length; i++) {
      $('form#returnDevice-f2 select[name=device_id]').append('<option value="' + udata.loaned[i].id + '">[' + udata.loaned[i].type + '] ' + udata.loaned[i].serial_no + '</option>');
    }
  } else if (udata.type == "admin") {
    $('form#returnDevice-f3 select[name=user_id]').change(function(event) {
      var user_id = $(this).val();
      $('form#returnDevice-f3 select[name=device_id]').empty();
      $.get(domain + "user/" + user_id, function(data) {
        data = data.data;
        if (data.loaned.length > 1) {
          $('form#returnDevice-f3 select[name=device_id]').removeAttr('disabled');
          for (var i = 0; i < data.loaned.length; i++) {
            $('form#returnDevice-f3 select[name=device_id]').append('<option value="' + data.loaned[i].id + '">[' + data.loaned[i].type + '] ' + data.loaned[i].serial_no + '</option>');
          }
        } else if (data.loaned.length === 1){
          $('form#returnDevice-f3 select[name=device_id]').removeAttr('disabled');
          $('form#returnDevice-f3 select[name=device_id]').append('<option value="' + data.loaned[0].id + '">[' + data.loaned[0].type + '] ' + data.loaned[0].serial_no + '</option>');
        } else if (data.loaned.length === 0) {
          $('form#returnDevice-f3 select[name=device_id]').attr('disabled', '');
        }
      });
    });
  }
});

function displayDevices(data) {
  var users;

  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "user", function(u) {
    users = u.data;

    var display = '<table class="table"><thead class="thead-default"><tr><th>Device ID</th><th>Serial No.</th><th>Loaned By</th><th>Is Active</th><th>Device Type</th><th>Options</th></tr></thead><tbody>';

    if (data.length === 0) {
      display += '<tr>';
      display += '<td colspan="6" class="text-center">No results found</td>';
      display += '</tr>';
    }

    for (var i = 0; i < data.length; i++) {
      display += '<tr>';
      display += '<th scope="row">' + data[i].id + '</th>';
      display += '<td>' + data[i].serial_no + '</td>';
      var loaned;
      for (var j = 0; j < users.length; j++) {
        if (data[i].loaned_by === null) {
          loaned = "No one";
        } else if (users[j].id === data[i].loaned_by) {
          loaned = '[ID: ' + users[j].id + '] ' + users[j].fname + ' ' + users[j].lname;
        }
      }
      display += '<td>' + loaned + '</td>';
      var active = "Inactive";
      if (data[i].is_active === true) {
        active = "Active";
      }
      display += '<td>' + active + '</td>';
      display += '<td>' + capitalize(data[i].type) + '</td>';
      display += '<td><form id="form-device" class="flex-items-md-around" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><input type="hidden" name="active" value="' + data[i].is_active + '" />';
      if (data[i].loaned_by === null) {
        display += '<button class="btn btn-success" type="submit" name="rent">Rent</button>';
      } else {
        display += '<button class="btn btn-success" type="submit" name="rent" disabled>Rent</button>';
      }
      display += '<button class="btn btn-warning admin" type="submit" name="toggle">Toggle active</button><button class="btn btn-danger admin" type="submit" name="delete">Delete</button></form></td>';
      display += '</tr>';
    }

    display += '</tbody></table>';

    if($.trim($('.caramel .chocolate').html()).length) {
      $('.caramel .chocolate').empty();
    }

    $('.caramel .chocolate').append(display);
  });
}

function filterByActive(f) {
  var devices;
  var active = false;

  if (f == "Active") {
    active = true;
  }

  $.get(domain + "device", function(data) {
    devices = data.data;
    devices = $.grep(devices, function(n, i) {
      return n.is_active === active;
    });
    displayDevices(devices);
  });
}

function filterByType(f) {
  var devices;
  f = f.toLowerCase();

  $.get(domain + "device", function(data) {
    devices = data.data;
    devices = $.grep(devices, function(n, i) {
      return n.type == f;
    });
    displayDevices(devices);
  });
}

function renting(did) {
  var udata = JSON.parse(sessionStorage.udata);

  $.ajax({
    url: domain + 'device/' + did + '/loan/' + udata.id,
    type: 'PUT',
    success: function(d) {
      if (udata.type == "student") {
        window.location = "/user/logout";
      } else {
        getUserDetails(udata.id);
        getAvailableDevices();
        getDevices();
        statusMsg('Device Rented');
      }
    },
    error: function(e) {
      var response = JSON.parse(e.responseText);
      if (response.error === 1) {
        errorMsg("You do not have the privilege to rent that device.");
      } else if (response.error === 2) {
        errorMsg("The device is already being loaned by another user.");
      } else if (response.error === 3) {
        errorMsg("The device you trying to loan is already reserved and you are not in any of the classes of the reservation.");
      } else {
        errorMsg("There is an error renting this device. Please try again or contact your system administrator.");
      }
    }
  });
}

function returning(id, device) {
  var udata = JSON.parse(sessionStorage.udata);
  $.ajax({
    url: domain + "device/" + device + "/loan/" + id,
    type: "DELETE",
    success: function(data) {
      getUserDetails(udata.id);
      getAvailableDevices();
      getDevices();
      statusMsg("Device returned");
    },
    error: function(e) {
      var response = JSON.parse(e.responseText);
      errorMsg(response.error);
    }
  });
}

function device_deleting(device) {
  $.ajax({
    url: domain + "device/" + device,
    type: "DELETE",
    cache: false,
    success: function(result, status, xhr) {
      statusMsg("Device deleted!");
      getDevices();
    },
    error: function(xhr, status, error) {
      var response = JSON.parse(xhr.responseText);
      errorMsg(response.error);
    }
  });
}

function getTypes() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "device/type", function(data, status){
    datas = data.data;
    for (var i = 0; i < datas.length; i++) {
      $('.deviceType').append('<div class="form-check"><label class="form-check-label"><input type="radio" class="form-check-input" name="device_type" value="' + datas[i] + '" /><p>' + datas[i] + '</p></label></div>');
    }
  });
}
