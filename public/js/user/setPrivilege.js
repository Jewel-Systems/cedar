$(document).ajaxStop(function() {
  $('form#setPrivilege').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "user/" + data[0].value + "/privilege/" + data[1].value,
      type: "PUT",
      success: function(result, status, xhr) {
        statusMsg("Privilege Set");
        $('div#setPrivilege.modal').modal('toggle');
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response);
      }
    });
    event.preventDefault();
  });
});
