$(document).ajaxStop(function(event, xhr, settings) {
  $('form#reservations').submit(function(event) {
    var data = $(this).serializeArray();
    console.log(data);
    var really = confirm("Are you sure?");
    if (really) {
      $.ajax({
        url: domain + "reservation/" + data[0].value,
        type: "DELETE",
        success: function(result, status, xhr) {
          $('.device-reservations tbody').empty();
          getReservations();
          statusMsg("Reservation Deleted");
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
