var details = [
  {
    "email" : "bob@cedarhouse.co.za",
    "password" : "1234",
    "type" : "student",
  },
  {
    "email" : "bob2@cedarhouse.co.za",
    "password" : "5678",
    "type" : "teacher",
  }
];

$(document).ready(function() {

  if (sessionStorage.email == null) {
    window.location = "/cedar";
  } else {
    var msg = null;
    var error = 0;
    var success = 0;
    var email = sessionStorage.email;
    if (typeof sessionStorage.pass == "undefined") {
      msg = "Logged in<br />";
      getUsers();
    } else {
      var pass = sessionStorage.pass;

      for (var i = 0; i < details.length; i++) {
        if ((details[i]["email"] === email) && (details[i]["password"] === pass)) {
          sessionStorage.user = details[i]["type"];
          msg = "Logged in<br />";
          success = 1;
          getUsers();
        } else {
          error++;
        }
      }
      
      if (success > 0) {
        error = 0;
      }
    }

    if (error > 0) {
      msg = "Email or password entered incorrectly<br />";
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("pass");
      sessionStorage.removeItem("email");
      $('button#addUserBut').css("display", "none");
      setTimeout(function() {
        window.location = "/cedar";
      }, 3000);
    } else {
      sessionStorage.removeItem("pass");
      var user = sessionStorage.user;
      user = user.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      $('h3.user-type').html(user);
    }
    statusMsg(msg);
  }
});
