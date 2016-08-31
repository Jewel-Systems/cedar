const domain = "http://localhost:200/api/v1/";

$(document).ready(function() {
  $('h2.addStatus').css("display", "none");
});

function statusMsg(msg) {
  $('.status').append(msg + "<br /><br />");
}
