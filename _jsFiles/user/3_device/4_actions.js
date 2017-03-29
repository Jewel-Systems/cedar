$(document).ajaxStop(function() {

  $("form#form-device button[type=submit]").click(function(event) {
    $("input[type=submit]", $(this).parents("form#device")).removeAttr("clicked");
    $(this).attr("clicked", "true");
  });

  $('form#form-device').submit(function(event) {
    var data = $(this).serializeArray();
    var name = $("form#form-device button[type=submit][clicked=true]").attr("name");

    if (name == "rent") {
      renting(data[0].value);
    } else if (name == "toggle") {
      $.ajax({
        url: domain + "device/" + data[0].value + "/active",
        type: putOr(data[1].value),
        cache: false,
        success: function(result, status, xhr) {
          getDevices();
          statusMsg('Device active status set to: ' + data[1].value);
          location.reload();
        },
        error: function(xhr, status, error) {
          var response = JSON.parse(xhr.responseText);
          errorMsg(response.error);
        }
      });
    } else if (name == "delete") {
      device_deleting(data[0].value);
      location.reload();
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
