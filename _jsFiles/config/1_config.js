$(document).ready(function() {
  getConfig();

  $('form.configuration').submit(function(event) {
    var datas = $(this).serializeArray();
    $.ajax({
      url: link_domain + "config",
      type: "POST",
      contentType: "application/json",
      data: '{"server": {"protocol":"' + datas[0].value + '", "host": "' + datas[1].value + '", "port": ' + datas[2].value + ', "base": ' + datas[3].value + '}}',
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


function getConfig() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(link_domain + "config", function(data) {
    var datas = JSON.parse(data);
    console.log(datas);
    $('input[name=protocol]').attr('value', datas.server.protocol);
    $('input[name=host]').attr('value', datas.server.host);
    $('input[name=port]').attr('value', datas.server.port);
    $('input[name=base]').attr('value', datas.server.base);
  });
}
