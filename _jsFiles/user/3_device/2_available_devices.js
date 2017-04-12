function getDevices() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "device", function (data) {
    displayDevices(data.data);
  });
}
