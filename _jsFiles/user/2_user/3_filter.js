$(document).ajaxStop(function() {
  $('div.dropdown-menu.user button.dropdown-item').click(function(event) {
    var filter = $(this).text();
    filterByAccount(filter.toLowerCase());
  });
});
