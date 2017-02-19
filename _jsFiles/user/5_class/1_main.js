function displayClasses() {
  $.get(domain + "class", function(data) {
    data = data.data;

    var display = '<table class="table"><thead class="thead-default"><tr><th>Class ID</th><th>Class</th><th>Options</th></tr></thead><tbody>';

    if (data.length === 0) {
      display += '<tr>';
      display += '<td colspan="3" class="text-center">No results found</td>';
      display += '</tr>';
    }

    for (var i = 0; i < data.length; i++) {
      display += '<tr>';
      display += '<th scope="row">' + data[i].id + '</th>';
      display += '<td>' + capitalize(data[i].name) + '</td>';
      display += '<td class="flex-items-md-center"><form id="delete-class" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><button class="btn btn-danger btn-block" type="submit">Delete</button></form></td>';
      display += '</tr>';
    }

    display += '</tbody></table>';

    fillDropdown();

    if($.trim($('.caramel .chocolate').html()).length) {
      $('.caramel .chocolate').empty();
    }

    $('.caramel .chocolate').append(display);
  });
}

function fillDropdown() {
  $.get(domain + "user", function(data) {
    data = data.data;

    for (var i = 0; i < data.length; i++) {
      if (data[i].type == "student") {
        $('#registerStudent-f select#userName').append('<option value="' + data[i].id + '">' + capitalize(data[i].fname) + '</option>');
        $('#deregisterStudent-f select#userName').append('<option value="' + data[i].id + '">' + capitalize(data[i].fname) + '</option>');
      }
    }
    checkRegistered();
    checkDeregistered();
  });
}

function checkRegistered() {
  var id = $('#registerStudent-f select#userName option:selected').val();
  $("#registerStudent-f select#classes").empty();
  $.get(domain + "user/" + id, function(udata) {
    udata = udata.data;

    var class_ids = udata.classes.map(function(cls) {
      return cls.id;
    });

    $.get(domain + "class", function(cdata) {
      cdata = cdata.data;

      cdata = cdata.filter(function(n) {
        return class_ids.indexOf(n.id) === -1;
      });

      if (cdata.length === 0) {
        $('#registerStudent-f select#classes').append('<option>No more classes to register for</option>');
        $('#registerStudent-f button').attr('disabled', 'disabled');
      }

      for (var a = 0; a < cdata.length; a++) {
        $('#registerStudent-f select#classes').append('<option value="' + cdata[a].id + '">' + cdata[a].name + '</option>');
      }
    });
  });
}

function checkDeregistered() {
  var id = $('#deregisterStudent-f select#userName option:selected').val();
  $("#deregisterStudent-f select#classes").empty();

  $.get(domain + "user/" + id, function(udata) {
    udata = udata.data;

    var class_ids = udata.classes.map(function(cls) {
      return cls.id;
    });

    $.get(domain + "class", function(cdata) {
      cdata = cdata.data;

      cdata = cdata.filter(function(n) {
        return class_ids.indexOf(n.id) > -1;
      });

      if (cdata.length === 0) {
        $('#deregisterStudent-f select#classes').append('<option>No classes registered</option>');
        $('#deregisterStudent-f button').attr('disabled', 'disabled');
      }

      for (var a = 0; a < cdata.length; a++) {
        $('#deregisterStudent-f select#classes').append('<option value="' + cdata[a].id + '">' + cdata[a].name + '</option>');
      }
    });
  });
}
