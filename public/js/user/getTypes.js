function getTypes() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "device/type", function(data, status){
    datas = data.data;
    stat = data.success;

    if (stat) {
      for (var i = 0; i < datas.length; i++) {
        $('.deviceType').append('<div class="radio"><label><input type="radio" name="device_type" value="' + datas[i] + '" />' + datas[i] + '</label></div>');
      }
    }
  });

  $(document).ajaxStart(function() {
    $('.loading').fadeIn(1000);
  }).ajaxStop(function() {
    $('.loading').fadeOut(1000);
  });
}

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
