$(document).one('ajaxStop', function() {
  $("#registerStudent-f select#userName").change(function() {
    checkRegistered();
  });

  $("#registerStudent-f").submit(function(event) {
    var data = $(this).serializeArray();

    $.ajax({
      url: domain + "class/" + data[1].value + "/user/" + data[0].value,
      type: "PUT",
      contentType: "application/json",
      success: function(result, status, xhr) {
        statusMsg("Student registered");
        $('div.modal#registerStudent-m').modal('toggle');
        displayClasses();
        checkRegistered();
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg('<strong>Oh no!</strong> ' + capitalize(response.error));
      }
    });

    event.preventDefault();
  });
});
