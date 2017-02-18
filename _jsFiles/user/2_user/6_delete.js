$(document).one('ajaxStop', function() {
  $('form#delete-user').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "user/" + data[0].value,
      type: "DELETE",
      success: function (result, status, xhr) {
        statusMsg("User is deleted");
        getAllUsers();
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
      },
    });
    event.preventDefault();
  });
});
