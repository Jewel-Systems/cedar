$(document).ajaxStop(function() {
  // Admin can return device for anyone
  $('form#returnADevice').submit(function(event) {
    var data = $(this).serializeArray();
    var really = confirm('Do you want to logout?');
    $.ajax({
      url: domain + "device/" + data[1].value + "/loan/" + data[0].value,
      type: "DELETE",
      success: function(result, status, xhr) {
        $('.available-devices tbody').empty();
        getDevices();
        statusMsg("Device Returned");
        $('div#returnDevice.modal').modal('toggle');
        if (really) {
          window.location = "/user/logout";
        }
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
        $('div#returnDevice.modal').modal('toggle');
      }
    });

    event.preventDefault();
  });
});

$(document).ready(function() {
  // Teacher and Student returning the device
  $('form#returnD').submit(function(event) {
    var really = confirm('Do you want to logout?');
    var dl = sessionStorage.device_loaned.split("#");
    // dl[0] = "mac:12";
    // dl[1] = "camera:8";
    var device = null;
    var returning_device = null;
    if (dl.length > 1) {
      var type = prompt("Are you returning your mac or camera?", "");
      for (var i = 0; i < 2; i++) {
        device[i] = dl[i].split(":");
        if (type == "mac" && device[i][0] == type) {
          returning_device = device[i][1];
        } else if (type == "camera" && device[i][0] == type) {
          returning_device = device[i][1];
        } else {
          errorMsg("Sorry invalid input, please try again.");
        }
      }
    } else {
      device = dl[0].split(":");
      returning_device = device[1];
    }
    $.ajax({
      url: domain + "device/" + returning_device + "/loan/" + sessionStorage.user_id,
      type: "DELETE",
      success: function(result, status, xhr) {
        sessionStorage.device_loaned = null;
        if (really) {
          window.location = "/user/logout";
        } else {
          $('.available-devices tbody').empty();
          getDevices();
          statusMsg("Device Returned");
          window.location = "/user";
        }
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
        $('div#returnDevice.modal').modal('toggle');
      }
    });

    event.preventDefault();
  });
});
