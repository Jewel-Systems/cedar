function getClasses() {
  $.get(domain + "class", function(data) {
    data = data.data;

    var display = '<table class="table"><thead class="thead-default"><tr><th>Class ID</th><th>Class</th><th>Options</th></tr></thead><tbody>';

    for (var i = 0; i < data.length; i++) {
      display += '<tr>';
      display += '<th scope="row">' + data[i].id + '</th>';
      display += '<td>' + capitalize(data[i].name) + '</td>';
      display += '<td class="flex-items-md-center"><form id="delete-class" method="POST"><input type="hidden" name="id" value="' + data[i].id + '" /><button class="btn btn-danger btn-block">Delete</button></form></td>';
      display += '</tr>';

      $('#registerStudent-f select#classes').append('<option value="' + data[i].id + '">' + data[i].name + '</option>');
    }

    display += '</tbody></table>';

    if($.trim($('.caramel .chocolate').html()).length) {
      $('.caramel .chocolate').empty();
    }

    $('.caramel .chocolate').append(display);
  });
}
