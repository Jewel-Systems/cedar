$(document).ready(function() {
  if (sessionStorage.email !== null) {
    sessionStorage.removeItem("udata");
    sessionStorage.removeItem("user_id");
    setTimeout(function() {
      window.location = "/";
    }, 3000);
  } else {
    window.location = "/";
  }
});
