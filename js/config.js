$(document).ready(function() {
  $.get(domain + "config", function(data) {
    console.log(data);
  });
});
