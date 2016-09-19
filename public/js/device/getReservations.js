function getReservations() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "reservation", function(data, status){
    datas = data.data;
    stat = data.success;

    if (stat) {
      var stuff = null;
      for (var i = 0; i < datas.length; i++) {
        var d = datas[i];

        stuff += '<tr>';
          stuff += '<td>' + d.id + '</td>';
          stuff += '<td>' + d.class_id + '</td>';
          stuff += '<td>' + new Date(d.start_time) + '</td>';
          stuff += '<td>' + d.type + '</td>';
          stuff += '<td>' + d.safe_zone + '</td>';
          stuff += '<td>' + d.count + '</td>';
          stuff += '<td>' + new Date(d.end_time) + '</td>';
          stuff += '<td>' + d.user_id + '</td>';
          stuff += '<td class="admin"><form id="reservations" method="post"><input type="hidden" name="id" value="' + d.id + '" /><input type="submit" class="btn btn-danger pull-right" value="Delete" /></form></td>';
        stuff += '</tr>';
      }
      $('.device-reservations tbody').append(stuff);
    }
  });

  $(document).ajaxStart(function() {
    $('.loading').fadeIn(1000);
  }).ajaxStop(function() {
    $('.loading').fadeOut(1000);
  });
}

function AjaxError(x, e) {
  var msg = null;
  if (x.status === 0) {
    errorMsg("The server might be down");
  } else if (x.status == 404) {
    errorMsg("Requested URL not found. Server could be offline.");
  } else if (x.status == 500) {
    errorMsg("Internel Server Error.");
  }  else {
    errorMsg('Unknown Error.\n' + x.responseText + ".");
  }
}
