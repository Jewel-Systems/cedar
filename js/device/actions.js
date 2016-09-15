$(document).ajaxStop(function() {
  $("input[type=submit]").click(function(event) {
    $("input[type=submit]", $(this).parents("form#device")).removeAttr("clicked");
    $(this).attr("clicked", "true");
  });

  $('form#device').submit(function(event) {
    var data = $(this).serializeArray();
    var val = event.originalEvent.explicitOriginalTarget.id;
    var really = confirm("Are you sure?");
    if (really) {
      if (val == "rent") {
        $.ajax({
          url: domain + "device/" + data[0].value + "/loan/" + sessionStorage.user_id,
          type: "PUT",
          // beforeSend: function (xhr) {
          //   window.scrollTo(0, 0);
          // },
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
            var response = JSON.parse(xhr.response);
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
          success: function(result, status, xhr) {
            $('.available-devices tbody').empty();
            getDevices();
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
});

function putOr(status) {
  if (status == "true") {
    return "DELETE";
  } else if (status == "false") {
    return "PUT";
  }
}
