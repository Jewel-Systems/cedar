$(document).one('ajaxStop', function() {
  $("#deregisterStudent-f select#userName").change(function() {
    checkDeregistered();
  });

  $("#deregisterStudent-f").submit(function(event) {
    var data = $(this).serializeArray();

    $.ajax({
      url: domain + "class/" + data[1].value + "/user/" + data[0].value,
      type: "DELETE",
      contentType: "application/json",
      success: function(result, status, xhr) {
        statusMsg("Student deregistered");
        displayClasses();
        checkDeregistered();
        $('div.modal#deregisterStudent-m').modal('toggle');
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg('<strong>Oh no!</strong> ' + capitalize(response.error));
      }
    });

    event.preventDefault();
  });
});
