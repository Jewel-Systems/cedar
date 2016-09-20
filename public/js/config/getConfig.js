$(document).ready(function() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(link_domain + "config", function(data) {
    var datas = JSON.parse(data);
    $('input[name=protocol]').attr('value', datas.server.protocol);
    $('input[name=host]').attr('value', datas.server.host);
    $('input[name=port]').attr('value', datas.server.port);
  });

  function AjaxError(x, e) {
    var msg = null;
    if (x.status === 0) {
      errorMsg("The server might be down");
    } else if (x.status == 404) {
      errorMsg("Requested URL not found. Server could be offline.");
    } else if (x.status == 500) {
      errorMsg("Internel Server Error.");
    }  else {
      errorMsg('Unknown Error.\n' + x.responseText + ".");
    }
  }
});
