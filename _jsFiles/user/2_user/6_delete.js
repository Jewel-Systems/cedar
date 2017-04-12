$(document).bind('ready ajaxStop', function() {
// $(document).ajaxComplete(function() {
  $('form#delete-user').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "user/" + data[0].value,
      type: "DELETE",
      success: function (result, status, xhr) {
        statusMsg("User is deleted");
        getAllUsers();
        location.reload();
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
      },
    });
    event.preventDefault();
  });
});
