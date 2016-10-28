$(document).ready(function() {

  // Admin can return device for anyone
  $('form#returnADevice').submit(function(event) {
    var data = $(this).serializeArray();
    returnDevice(data[1].value, data[0].value);
    event.preventDefault();
  });

  // Student and Teacher returning the device
  $('form#returnD').submit(function(event) {
    var dl = sessionStorage.device_loaned.split("#");
    // dl[0] = "mac:12";
    // dl[1] = "camera:8";
    var device = null;
    if (sessionStorage.user_type == "student") {
      if (dl.length === 1) {
        device = dl[0].split(":");
        returnDevice(device[1], sessionStorage.user_id);
      } else {
        var type = prompt("Are you returning your mac or camera?", "");
        if (type !== null) {
          for (var a = 0; a < dl.length; a++) {
            device = dl[a].split(":");
            if (device[0] == type) {
              returnDevice(device[1], sessionStorage.user_id);
            }
          }
        }
      }
    } else if (sessionStorage.user_type == "teacher") {
      var returning_device = prompt("Enter the ID of the device you want to return:");
      if (returning_device !== null) {
        returnDevice(returning_device, sessionStorage.user_id);
      } else {
        errorMsg("No ID entered.");
      }
    }

    event.preventDefault();
  });
});

function returnDevice(device, id) {

  var user_type = sessionStorage.user_type;
  var loaned = sessionStorage.device_loaned.split("#");
  var dl = null;

  for (var i = 0; i < loaned.length; i++) {
    if (loaned[i].search(device) === -1) {
      if (dl === null) {
        dl = loaned[i];
      } else {
        dl += "#" + loaned[i];
      }
    }
  }

  $.ajax({
    url: domain + "device/" + device + "/loan/" + id,
    type: "DELETE",
    cache: false,
    success: function(result, status, xhr) {
      sessionStorage.device_loaned = dl;
      if (user_type == "admin") {
        $('div#returnDevice.modal').modal('toggle');
      }
      $('.available-devices tbody').empty();
      statusMsg("Device Returned");
      getDevices();
    },
    error: function(xhr, status, error) {
      var response = JSON.parse(xhr.responseText);
      errorMsg(response.error);
    }
  });
}
