function displayClasses() {
  $.get(domain + "class", function(data) {
    data = data.data;

    var display = '<table class="table"><thead class="thead-default"><tr><th>Class ID</th><th>Class</th><th>Options</th></tr></thead><tbody>';

    for (var i = 0; i < data.length; i++) {
      display += '<tr>';
      display += '<th scope="row">' + data[i].id + '</th>';
      display += '<td>' + capitalize(data[i].name) + '</td>';
      display += '<td class="flex-items-md-center"><form id="delete-class" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><button class="btn btn-danger btn-block">Delete</button></form></td>';
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

        $.get(domain + "class", function(cdata) {
          cdata = cdata.data;
          var classes = data[i].classes;

          for (var j = 0; j < classes.length; j++) {
            var id = classes[j].id;
            cdata = $.grep(cdata, function(n, a) {
              return n.id != id;
            })
          }
        });
      }
    }
  });
}

function checkRegistered(id) {

}
