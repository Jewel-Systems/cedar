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
          window.location = "/cedar/user/logout";
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

  // Teacher and Student returning the device
  $('form#returnD').submit(function(event) {
    var really = confirm('Do you want to logout?');
    $.ajax({
      url: domain + "device/" + sessionStorage.device_loaned + "/loan/" + sessionStorage.user_id,
      type: "DELETE",
      success: function(result, status, xhr) {
        $('.available-devices tbody').empty();
        getDevices();
        statusMsg("Device Returned");
        $('div#returnDevice.modal').modal('toggle');
        if (really) {
          window.location = "/cedar/user/logout";
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
