$(document).ajaxStop(function() {
  $('form.delete').submit(function(event) {
    var d = confirm("Are you sure you want to delete the user?");
    if (d) {
      var data = $(this).serializeArray();
      $.ajax({
        url: domain + "user/" + data[0].value,
        type: "DELETE",
        success: function (result, status, xhr) {
          $('table.users-table tbody').empty();
          statusMsg("User is deleted");
          getUsers();
        },
        error: function(xhr, status, error) {
          console.log(xhr.statusText);
        },
      });
    }
    event.preventDefault();
  });
});
