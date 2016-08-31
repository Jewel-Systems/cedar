const domain = "http://localhost:200/link/";

$(document).ready(function() {
  $('h2.addStatus').css("display", "none");
});

function statusMsg(msg) {
  $('.status').append(msg + "<br /><br />");
}
