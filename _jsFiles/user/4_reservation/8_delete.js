$(document).one('ajaxStop', function(event) {
  $('form#delete-reservation').submit(function(event) {
    var data = $(this).serializeArray();

    delete_reservation(data[0].value);

    event.preventDefault();
  });
});
