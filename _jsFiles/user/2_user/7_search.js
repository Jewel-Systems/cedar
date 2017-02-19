// FILENAME: 7_search.js
// DESCRIPTION: Search functions for the Users management page. Search functions include: User ID, Name and Email.

$(document).one("ajaxStop", function() {
  $('form#searchUser').submit(function(event) {
    var data = $(this).serializeArray();

    $.get(domain + "user", function(udata) {
      var users = udata.data;
      checkValue(data[0].value, data[1].value, users);
    });

    event.preventDefault();
  });
});

function checkValue(value, type, users) {
  var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

  if ($.isNumeric(value) && type == "id") {
    searchByID(value, users);
  } else if (testEmail.test(value) && type == "email") {
    searchByEmail(value, users);
  } else if ($.type(new String(value)) === "string" && type == "name" && value != ''){
    searchByName(value, users);
  } else {
    displayUsers(users);
  }
}

function searchByID(value, users) {
  users = users.filter(function(n) {
    return value.indexOf(n.id) > -1;
  });

  displayUsers(users);
}

function searchByName(value, users) {
  users = users.filter(function(n) {
    return value.indexOf(n.fname) > -1
  });

  displayUsers(users);
}

function searchByEmail(value, users) {
  users = users.filter(function(n) {
    return value.indexOf(n.email) > -1;
  });

  displayUsers(users);
}
