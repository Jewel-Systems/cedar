$(document).one('ajaxStop', function() {
  var udata = JSON.parse(sessionStorage.udata);

  $('button#returnBtn-1').click(function(event) {
    if (udata.type == 'student' && udata.loaned.length === 1) {
      returning(udata.id, udata.loaned[0].id);
    }
  });

  $('form#returnDevice-f1').submit(function(event) {
    var data = $(this).serializeArray();

    returning(udata.id, data[0].value);

    event.preventDefault();
  });

  $('form#returnDevice-f2').submit(function(event) {
    var data = $(this).serializeArray();

    returning(udata.id, data[0].value);
    location.reload();

    event.preventDefault();
  });

  $('form#returnDevice-f3').submit(function(event) {
    var data = $(this).serializeArray();

    returning(data[0].value, data[1].value);
    $('div#returnDevice-m3').modal('toggle');

    event.preventDefault();
  });
});
