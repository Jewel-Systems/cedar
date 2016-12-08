$(document).one('ajaxStop',function(event, xhr, settings) {
  $('form#changePermission-f select[name=user]').change(function(event) {
    var user_id = $(this).val();

    $('form#changePermission-f input[name="type"]').removeAttr('checked');

    $.get(domain + "user/" + user_id, function(data) {
      data = data.data;
      if (data.privilages.length > 0) {
        for (var i = 0; i < data.privilages.length; i++) {
          if (data.privilages[i].type == "mac") {
            $('form#changePermission-f input[name="type"].mac').attr('checked', '');
          } else {
            $('form#changePermission-f input[name="type"].camera').attr('checked', '');
          }
        }
      }
    });
  });

  $('form#changePermission-f').submit(function(event) {
    var data = $(this).serializeArray();
    var mac = false;
    var cam = false;

    // Checks to see if Privilege is already given
    $.get(domain + "user/" + data[0].value, function(udata) {
      udata = udata.data;
      for (var i = 0; i < udata.privilages.length; i++) {
        if (udata.privilages[i].type == "mac") {
          mac = true;
        } else {
          cam = true;
        }
      }

      if (data.length === 3) {
        // If privilege isn't given then it will be given
        if (!mac) {
          privilege("PUT", data[0].value, "mac");
        }

        if (!cam) {
          privilege("PUT", data[0].value, "camera");
        }
      } else if (data.length === 2) {
        var type = data[1].value;

        // If mac was selected
        if (type == "mac") {
          // If mac privilege wasn't given, then give it
          if (!mac) {
            privilege("PUT", data[0].value, "mac");
          }

          // Since camera isn't selected therefore the user want to revoke privilege
          // Check if camera privilege was given, if it is then revoke it.
          if (cam) {
            privilege("DELETE", data[0].value, "camera");
          }
        }

        // If camera was selected
        if (type == "camera") {
          // If camera privilege wasn't given, then give it
          if (!cam) {
            privilege("PUT", data[0].value, "camera");
          }

          // Since mac isn't selected therefore the user want to revoke privilege.
          // Check if mac privilege was given, if it is then revoke it.
          if (mac) {
            privilege("DELETE", data[0].value, "mac");
          }
        }
      } else {
        if (mac) {
          privilege("DELETE", data[0].value, "mac");
        }

        if (cam) {
          privilege("DELETE", data[0].value, "camera");
        }
      }
      $('#changePermission-m').modal('toggle');
    });
    event.preventDefault();
  });

});
