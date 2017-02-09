// FILENAME: 7_search.js
// DESCRIPTION: Search functions for the Users management page. Search functions include: User ID, Name and Email.

$(document).one("ajaxStop", function() {
  $('form#searchReservation').submit(function(event) {
    var data = $(this).serializeArray();
    var query = data[0].value;
    var full_name = query.search(" ");
    var f = query;
    var l = "";

    if (full_name === -1) {
      var n = query.split(" ");
      f = n[0];
      l = n[1];
    }

    $.get(domain + "user/search", {fname: f, lname: l}, function(data) {

    });
  });
});
