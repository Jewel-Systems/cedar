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
            table += "<td>" + capitalize(datas[i].type) + "</td>";
            table += '<td><form id="deleteUser" class="pull-right delete" method="post"><input type="hidden" id="inputId" name="id" value="' + datas[i].id + '" /><input type="hidden" id="inputFname" name="fname" value="' + datas[i].fname + '" /><input type="hidden" id="inputLname" name="lname" value="' + datas[i].lname + '" /><input type="hidden" id="inputEmail"  name="email" value="' + datas[i].email + '" /><button type="submit" class="btn btn-danger">Delete</button></form><a class="pull-right" href="' + domain + 'user/card/' + datas[i].id + '/pdf" target="_blank"><button class="btn btn-primary" type="button">Retrieve Card</button></a></td>';
            table += '</tr>';
          }
        }
      }
    } else {
      table = stat;
    }

    $('.users-table tbody').append(table);
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
