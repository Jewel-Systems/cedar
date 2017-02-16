function getAllUsers() {
  $.ajaxSetup({
    error: AjaxError
  });

  $.get(domain + "user", function(users) {
    users = users.data;
    displayUsers(users);
  });
}
