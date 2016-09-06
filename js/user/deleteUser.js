$(document).ajaxComplete(function() {
  $('form.delete').submit(function(event) {
    var data = $(this).serializeArray();
    $.ajax({
      url: domain + "user/" + data[0].value,
      type: "DELETE",
      success: function (result, status, xhr) {
        window.location = "/cedar/user/";
      },
      error: function(xhr, status, error) {
        console.log(xhr.statusText);
      },
    });
    event.preventDefault();
  });
});
