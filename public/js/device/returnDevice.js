$(document).ready(function() {

  var dl = sessionStorage.device_loaned.split("#");

  // Admin can return device for anyone
  $('form#returnADevice').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "device/" + data[1].value + "/loan/" + data[0].value,
      type: "DELETE",
      success: function(result, status, xhr) {
        for (var i = 0; i < dl.length; i++) {
          device = dl[i].split(":");
          if (i === 0) {
            sessionStorage.device_loaned = null;
          }
          if (device[1] != data[1].value && dl.length > 1 && dl[i] !== "") {
            sessionStorage.device_loaned += device[0] + ":" + device[1] + "#";
          }
        }
        $('.available-devices tbody').empty();
        getDevices();
        statusMsg("Device Returned");
        $('div#returnDevice.modal').modal('toggle');
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
        $('div#returnDevice.modal').modal('toggle');
      }
    });

    event.preventDefault();
  });

  // Teacher returning the device
  $('form#returnD').submit(function(event) {
    // dl[0] = "mac:12";
    // dl[1] = "camera:8";
    var device = null;
    var returning_device = null;
    if (dl.length > 1) {
      if (sessionStorage.user_type == "student") {
        var type = prompt("Are you returning your mac or camera?", "");
        for (var i = 0; i < 2; i++) {
          device = dl[i].split(":");
          if (type == "mac" && device[0] == type) {
            returning_device = device[1];
          } else if (type == "camera" && device[i][0] == type) {
            returning_device = device[1];
          } else {
            errorMsg("Sorry invalid input, please try again.");
          }
        }
      } else if (sessionStorage.user_type == "teacher") {
        returning_device = prompt("Enter the ID of the device you want to return:");
      }
    } else {
      device = dl[0].split(":");
      returning_device = device[1];
    }
    if (returning_device !== null) {
      var really = confirm('Do you want to logout?');
      $.ajax({
        url: domain + "device/" + returning_device + "/loan/" + sessionStorage.user_id,
        type: "DELETE",
        success: function(result, status, xhr) {
          for (var i = 0; i < dl.length; i++) {
            device = dl[i].split(":");
            if (i === 0) {
              sessionStorage.device_loaned = null;
            }
            if (device[1] != returning_device && dl.length > 1 && dl[i] !== "") {
              sessionStorage.device_loaned += device[0] + ":" + device[1] + "#";
            }
          }
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
    }

    event.preventDefault();
  });
});
