$(document).ready(function() {
  // $("input[type=submit]").click(function(event) {
  //   $("input[type=submit]", $(this).parents("form#device")).removeAttr("clicked");
  //   $(this).attr("clicked", "true");
  // });

  $('form#device').submit(function(event) {
    var data = $(this).serializeArray();
    var val = event.originalEvent.explicitOriginalTarget.id;
    if (val == "rent") {
      var devices = null;
      $.get(domain + "device", function(data, status) {
        devices = data.data;
        status = data.success;

        if (!status) {
          errorMsg("Error retrieving devices from the server.");
        }
      });
      $.ajax({
        url: domain + "device/" + data[0].value + "/loan/" + sessionStorage.user_id,
        type: "PUT",
        cache: false,
        success: function (result, status, xhr) {
          for (var i = 0; i < devices.length; i++) {
            if (devices[i].id == data[0].value) {
              if (sessionStorage.device_loaned == 'null') {
                sessionStorage.device_loaned = devices[i].type + ":" + data[0].value;
              } else {
                sessionStorage.device_loaned += "#" + devices[i].type + ":" + data[0].value;
              }
            }
          }
          $('table.available-devices tbody').empty();
          statusMsg("Rented device");
          getDevices();
          $('form#returnD').fadeIn();
        },
        error: function (xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
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
    } else if (val == "active") {
      $.ajax({
        url: domain + "device/" + data[0].value + "/active",
        type: putOr(data[1].value),
        cache: false,
        success: function(result, status, xhr) {
          location.reload();
          // $('.available-devices tbody').empty();
          // getDevices();
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          errorMsg(response);
        }
      });
    } else if (val == "delete") {
      $.ajax({
        url: domain + "device/" + data[0].value,
        type: "DELETE",
        cache: false,
        success: function(result, status, xhr) {
          statusMsg("Device deleted!");
          $('.available-devices tbody').empty();
          getDevices();
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          errorMsg(response);
        }
      });
    }
    event.preventDefault();
  });
});

function putOr(status) {
  if (status == "true") {
    return "DELETE";
  } else if (status == "false") {
    return "PUT";
  }
}
