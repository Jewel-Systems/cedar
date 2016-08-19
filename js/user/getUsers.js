function getUsers() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "user", function(data, status) {
    datas = data["data"];
    stat = data["success"];

    var table = '<table class="table table-striped users-table"><thead><th>ID</th><th>Full Name</th><th>Email</th></thead><tbody>';
    if (status) {
      for (var i = 0; i < datas.length; i++) {
        table += "<tr>";
        table += "<th>" + datas[i]["id"] + "</th>";
        table += "<td>" + datas[i]["fname"] + " " + datas[i]["lname"] + "</td>";
        table += "<td>" + datas[i]["email"] + "</td>";
        table += '<td><form class="pull-right delete" method="post"><input type="hidden" id="inputId" name="id" value="' + datas[i]["id"] + '" /><input type="hidden" id="inputFname" name="fname" value="' + datas[i]["fname"] + '" /><input type="hidden" id="inputLname" name="lname" value="' + datas[i]["lname"] + '" /><input type="hidden" id="inputEmail"  name="email" value="' + datas[i]["email"] + '" /><button type="submit" class="btn btn-danger">Delete</button></form></td>';
        table += '</tr>';
      }
      table += '</tbody</table>';
    } else {
      table = stat;
    }

    $('.status').append(table);
  });
}

function AjaxError(x, e) {
  if (x.status == 0) {
    alert(' Check Your Network.');
  } else if (x.status == 404) {
    alert('Requested URL not found. Server could be offline.');
  } else if (x.status == 500) {
    alert('Internel Server Error.');
  }  else {
    alert('Unknown Error.\n' + x.responseText);
  }
}
