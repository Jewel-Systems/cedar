$(document).one('ajaxStop', function() {
  $('form#addClass-f').submit(function(event) {
    var data = $(this).serializeArray();
    cname = data[0].value;

    if (cname !== "") {
      $.ajax({
        url: domain + 'class',
        type: "POST",
        contentType: 'application/json',
        data: '{"name": "' + cname + '"}',
        success: function(result, status, xhr) {
          displayClasses();
          statusMsg("Added a new class.");
          $('div.modal#addClass-m').modal('toggle');
          location.reload();
        }
      })
      .done(function() {
        console.log("success");
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }

    event.preventDefault();
  });
});
