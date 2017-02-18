$(document).one('ajaxStop', function() {
  $("#deregisterStudent-f select#userName").change(function() {
    checkDeregistered();
  })
});
