function getUsers() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "user", function(data, status) {
    datas = data.data;
    stat = data.success;

    var table = '';
    if (stat) {
      for (var i = 0; i < datas.length; i++) {
        if (datas[i].id != sessionStorage.user_id) {
          if (sessionStorage.user_type == "admin" && (datas[i].type == "student" || datas[i].type == "teacher")) {
            table += "<tr>";
            table += "<th>" + datas[i].id + "</th>";
            table += "<td>" + datas[i].fname + " " + datas[i].lname + "</td>";
            table += "<td>" + datas[i].email + "</td>";
            table += "<td>" + datas[i].type + "</td>";
            table += '<td><form class="pull-right delete" method="post"><input type="hidden" id="inputId" name="id" value="' + datas[i].id + '" /><input type="hidden" id="inputFname" name="fname" value="' + datas[i].fname + '" /><input type="hidden" id="inputLname" name="lname" value="' + datas[i].lname + '" /><input type="hidden" id="inputEmail"  name="email" value="' + datas[i].email + '" /><button type="submit" class="btn btn-danger">Delete</button></form></td>';
            table += '</tr>';
          }
        }
      }
    } else {
      table = stat;
    }

    $('.users-table tbody').append(table);
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
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> The server might be down");
    $(msg).insertBefore('.panel');
  } else if (x.status == 404) {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> Requested URL not found. Server could be offline.");
    $(msg).insertBefore('.panel');
  } else if (x.status == 500) {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> Internel Server Error.");
    $(msg).insertBefore('.panel');
  }  else {
    msg = $('<div class="alert alert-danger"></div>').html("<strong>Oh no!</strong> " + 'Unknown Error.\n' + x.responseText + ".");
    $(msg).insertBefore('.panel');
  }
}
