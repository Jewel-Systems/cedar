$(document).ajaxStop(function() {
  $('form#device').submit(function(event) {
    var val = $('form#device input[type="submit"][clicked="true"]').val();
    var really = confirm("Are you sure?");
    if (really) {
      if (val == "Rent Device") {
        $.ajax({
          url: domain + "device/" + $('form#device input[name=device_id]').val() + "/loan/" + sessionStorage.user_id,
          type: "PUT",
          success: function (result, status, xhr) {
            if (sessionStorage.user_type == "admin" || sessionStorage.user_type == "teacher") {
              $('table.available-devices tbody').empty();
              statusMsg("Rented device");
              getDevices();
            } else {
              window.location = "/cedar/user/logout";
            }
          },
          error: function (xhr, status, error) {
            console.log(xhr.responseText);
            $('.error-message').remove();
            errorMsg("There is an error renting this device. Please try again or contact your system administrator.");
          }
        });
      } else if (val == "Toggle Active") {
        $.ajax({
          url: domain + "device/" + $('form#device input[name=device_id]').val() + "/active",
          type: putOr($('form#device input[name=device_active]').val()),
          success: function(result, status, xhr) {
            $('.available-devices tbody').empty();
            getDevices();
          },
          error: function(xhr, status, error) {
            var response = JSON.parse(xhr.responseText);
            errorMsg(response);
          }
        });
      } else if (val == "Delete") {
        $.ajax({
          url: domain + "device/" + $('form#device input[name=device_id]').val(),
          type: "DELETE",
          success: function(result, status, xhr) {
            $('.available-devices tbody').empty();
            getDevices();
          },
          error: function(xhr, status, error) {
            var response = JSON.parse(xhr.responseText);
            errorMsg(response);
          }
        });
      }
    }
    event.preventDefault();
  });

  $("input[type=submit]").click(function(event) {
    $("input[type=submit]", $(this).parents("form#device")).removeAttr("clicked");
    $(this).attr("clicked", "true");
  });
});

function putOr(status) {
  if (status == "true") {
    return "DELETE";
  } else if (status == "false") {
    return "PUT";
  }
}
