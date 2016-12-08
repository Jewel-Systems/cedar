$(document).ajaxStop(function() {
  $('button#returnBtn-1').click(function(event) {
    var udata = JSON.parse(sessionStorage.udata);

    if (udata.loaned.length > 1) {
      $('div#returnDevice-m1').modal('toggle');
    } else {
      returning(udata.id, udata.loaned[0].id);
    }
  });

  $('form#returnDevice-f2').submit(function(event) {
    var udata = JSON.parse(sessionStorage.udata);
    var data = $(this).serializeArray();

    returning(udata.id, data[0].value);
    $('div#returnDevice-m2').modal('toggle');

    event.preventDefault();
  });

  $('form#returnDevice-f3').submit(function(event) {
    var data = $(this).serializeArray();

    returning(data[0].value, data[1].value);
    $('div#returnDevice-m3').modal('toggle');

    event.preventDefault();
  });
});
