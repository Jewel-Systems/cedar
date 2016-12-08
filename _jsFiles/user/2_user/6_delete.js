$(document).one('ajaxStop', function() {
  $('form#delete-user').submit(function(event) {
    var d = confirm("Are you sure you want to delete the user?");
    if (d) {
      var data = $(this).serializeArray();
      $.ajax({
        url: domain + "user/" + data[0].value,
        type: "DELETE",
        success: function (result, status, xhr) {
          statusMsg("User is deleted");
          getAllUsers();
        },
        error: function(xhr, status, error) {
          console.log(xhr.statusText);
        },
      });
    }
    event.preventDefault();
  });
});
