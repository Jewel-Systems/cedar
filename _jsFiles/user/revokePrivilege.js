$(document).ready(function() {
  $('form#revokePrivilege').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "user/" + data[0].value + "/privilege/" + data[1].value,
      type: "DELETE",
      success: function(result, status, xhr) {
        statusMsg("Privilege Revoke");
        $('div#revokePrivilege.modal').modal('toggle');
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
        $('div#revokePrivilege.modal').modal('toggle');
      }
    });
    event.preventDefault();
  });
});
