$(document).one('ajaxStop', function() {
  $("#registerStudent-f select#userName").change(function() {
    checkRegistered();
  })
});
