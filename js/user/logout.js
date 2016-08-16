$(document).ready(function() {
  if (sessionStorage.email !== null) {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("pass");
    sessionStorage.removeItem("user");
    setTimeout(function() {
      window.location = "/cedar";
    }, 3000);
  } else {
    window.location = "/cedar";
  }
});
