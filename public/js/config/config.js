$(document).ready(function() {
  $('form.configuration').submit(function(event) {
    var datas = $(this).serializeArray();
    $.ajax({
      url: link_domain + "config",
      type: "POST",
      contentType: "application/json",
      data: "",
      success: function() {

      },
      error: function() {

      }
    });
    event.preventDefault();
  });
});
