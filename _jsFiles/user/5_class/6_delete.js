$(document).one('ajaxStop', function() {
  $('form#delete-class').submit(function(event) {
    var data = $(this).serializeArray();

    $.ajax({
      url: domain + "class/" + data[0].value,
      type: 'DELETE',
      success: function(result, status, xhr) {
        statusMsg("Class is deleted");
        displayClasses();
        checkRegistered();
        checkDeregistered();
        location.reload();
      },
      error: function(xhr, status, error) {
        var response = JSON.parse(xhr.responseText);
        errorMsg(response.error);
      }
    });

    event.preventDefault();
  });
});
