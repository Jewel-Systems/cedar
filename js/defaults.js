const domain = "http://steve.zanity.net:53455/api/v1/";

$(document).ready(function() {
  $('h2.addStatus').css("display", "none");
});

function statusMsg(msg) {
  $('.status').append(msg + "<br /><br />");
}
