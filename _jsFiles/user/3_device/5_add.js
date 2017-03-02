$(document).ready(function() {
  getTypes();
});

$(document).one('ajaxStop', function() {
  $('form#addDevice-f').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "device",
      type: "POST",
      data: '{"serial_no" : "' +  data[0].value + '", "type" : "' + data[1].value + '", "is_active" : ' + data[2].value + '}',
      contentType: "application/json",
      success: function(result, status, xhr) {
        getDevices();
        statusMsg("Added a new Device.");
        $('div.modal#addDevice-m').modal('toggle');
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
