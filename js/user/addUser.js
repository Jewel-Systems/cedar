$(document).ready(function() {
  $('form#add').submit(function(event) {
    var data = $(this).serializeArray();
    var jsondata = "{";
    var pass1 = null;
    var pass2 = null;
    for (var i = 0; i < data.length; i++) {
      if (data[i]["name"] === "pass1") {
        pass1 = data[i]["value"];
      } else if (data[i]["name"] === "pass2") {
        pass2 = data[i]["value"];
      }
      if ((i == (data.length - 1)) || (i == (data.length - 2))) {
        if ((pass1 === pass2) && (i == (data.length - 1))) {
          $('h4.addStatus').css('display', 'none');
          jsondata += "\"password\" : \"" + pass1 + "\"}";
          $.ajax({
            url: domain + "user",
            type: "POST",
            data: jsondata,
            success: function (result, status, xhr) {
              if (result) {
                $('table.users-table').remove();
                getUsers();
                statusMsg("Added new user");
                $('div.modal#addUser').modal('toggle');
              } else {
                alert(result["success"]);
              }
            },
            error: function(xhr, status, error) {
              var response = JSON.parse(xhr["responseText"]);
              console.log(response["error"]);
              $('h4.addStatus').css("display", "block").append(response["error"]);
            },
          });
        } else if ((pass1 !== pass2) && (i == (data.length - 1))) {
          $('h4.addStatus').css("display", "block").append("Passwords don't match");
          event.preventDefault();
        }
      } else {
        jsondata += "\"" + data[i]["name"] + "\" : \"" + data[i]["value"] + "\", ";
      }
    }
    event.preventDefault();
  });
});
