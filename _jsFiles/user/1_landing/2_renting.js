$(document).ready(function() {
  $('form#available-devices').submit(function(event) {
    var data = $(this).serializeArray();
    renting(data[0].value);
    event.preventDefault();
  });
});
