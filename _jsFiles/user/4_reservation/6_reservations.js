function getReservations() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "reservation", function(data) {
    displayReservations(data.data);
  });
}
