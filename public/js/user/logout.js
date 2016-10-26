$(document).ready(function() {
  if (sessionStorage.email !== null) {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_type");
    sessionStorage.removeItem("fname");
    sessionStorage.removeItem("lname");
    sessionStorage.removeItem("created_at");
    sessionStorage.removeItem("privileges");
    sessionStorage.removeItem("device_loaned");
    setTimeout(function() {
      window.location = "/";
    }, 3000);
  } else {
    window.location = "/";
  }
});
