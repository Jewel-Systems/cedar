$(document).ajaxStop(function() {
  $('div.dropdown-menu.device button.dropdown-item').click(function(event) {
    var filter = $(this).text();
    if (filter == "Active" || filter == "Inactive") {
      filterByActive(filter);
    } else if (filter == "Mac" || filter == "Mac/Win" || filter == "Camera") {
      filterByType(filter);
    }
  });
});
