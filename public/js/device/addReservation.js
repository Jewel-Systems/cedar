$(document).ajaxStop(function() {
  $('form#reserve').submit(function(event) {
    var data = $(this).serializeArray();
    var start_time = new Date(data[0].value);
    var end_time = new Date(data[1].value);
    $.ajax({
      url: domain + "reservation",
      type: "POST",
      data: '{"start_time" : "' + setStDateTime(start_time.getDate(), start_time.getMonth() + 1, start_time.getFullYear(), start_time.getHours(), start_time.getMinutes(), start_time.getSeconds()) + '", "end_time" : "' + setStDateTime(end_time.getDate(), end_time.getMonth() + 1, end_time.getFullYear(), end_time.getHours(), end_time.getMinutes(), end_time.getSeconds()) + '", "class_id" : ' + data[2].value + ', "type" : "' + data[3].value + '", "count" : ' + data[4].value + ', "user_id" : ' + sessionStorage.user_id + ', "safe_zone" : "' + data[5].value + '"}',
      contentType: "application/json",
      success: function(result, status, xhr) {
        $('.device-reservations tbody').empty();
        getReservations();
        statusMsg("Devices Reserved");
        $('div#reserveDevice.modal').modal('toggle');
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        if (response.error == 1) {
          console.log("1 error!");
          errorMsg("A reservation is already in place during this time period.");
          $('div#reserveDevice.modal').modal('toggle');
        } else {
          console.log("2 error!");
          errorMsg("Something went wrong reserving devices, please contact the administrator.");
          $('div#reserveDevice.modal').modal('toggle');
        }
      }
    });
    event.preventDefault();
  });
});
