$(document).ready(function() {
  getConfig();

  $('form.configuration').submit(function(event) {
    var datas = $(this).serializeArray();
    $.ajax({
      url: link_domain + "config",
      type: "POST",
      contentType: "application/json",
      data: '{"server": {"protocol":"' + datas[0].value + '", "host": "' + datas[1].value + '", "port": ' + datas[2].value + '}}',
      success: function() {
        statusMsg("Configuration updated successfully.");
        getConfig();
      },
      error: function() {
        errorMsg("Something went wrong while updating configuration.");
      }
    });
    event.preventDefault();
  });
});
