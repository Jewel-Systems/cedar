$(document).ajaxStop(function(event, xhr, settings) {
  $('div.dropdown-menu.reservation-type button.dropdown-item').click(function(event) {
    filterByTypeR($(this).text());
  });

  $('div.dropdown-menu.reservation-user button.dropdown-item').click(function(event) {
    filterByUser($(this).text());
  });

  $('div.dropdown-menu.reservation-class button.dropdown-item').click(function(event) {
    filterByClass($(this).text());
  });
});
