function getClassesDD() {
  $.get(domain + "class", function(data) {
    data = data.data;

    for (var i = 0; i < data.length; i++) {
      $('div.dropdown-menu.reservation-class').append('<button type="button" class="dropdown-item">' + data[i].name + '</button>');

      $('form#deviceReservation-f select[name=class]').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
    }
  });
}

function getReservers() {
  $.get(domain + "user", function(data) {
    data = data.data;

    for (var i = 0; i < data.length; i++) {
      if (data[i].type !== "student") {
        $('div.dropdown-menu.reservation-user').append('<button type="button" class="dropdown-item">' + data[i].fname + ' ' + data[i].lname + ' (' + capitalize(data[i].type).charAt(0) + ')</button>');
      }
    }
  });
}
