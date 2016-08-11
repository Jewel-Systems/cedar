<?php
  // ob_start();
  // session_start();
  include "../resources/domain.php";

  // $email = null;
  // $pass = null;

  // echo var_export($_POST, true);
  // var_dump($_POST);
  $email = $_POST['email'];
  $pass = $_POST['pass'];
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cedar House</title>
    <link rel="shortcut icon" href="images/index.ico" />

    <!-- CSS -->
    <link rel="stylesheet" href="../css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="../css/style.css" type="text/css" />

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script type="text/javascript" src="../js/jquery-3.1.0.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script type="text/javascript" src="../js/bootstrap.min.js"></script>
    <script type="text/javascript">
      var details = [
        {
          "email" : "bob@cedarhouse.co.za",
          "password" : "1234",
        },
        {
          "email" : "bob2@cedarhouse.co.za",
          "password" : "1234",
        }
      ];
      $(document).ready(function() {
        var email = "<?= $email ?>";
        var pass = "<?= $pass ?>";
        var msg = null;
        for (var i = 0; i < details.length; i++) {
          if (details[i]["email"].localeCompare(email)) {
            if (details[i]["password"] == pass) {
              msg = "Logged in<br />";
            } else {
              msg = "Email or password entered incorrectly<br />";
            }
          } else {
            msg = "Email or password entered incorrectly<br />";
          }
        }
        $('.status').append("Status: " + msg + "<br /><br />");
        $.get("<?= domain ?>user", function(data, status) {
          console.log(data);
          console.log(data["data"].length);
          data = data["data"];
          var table = '<table class="table table-striped"><thead><th>ID</th><th>Full Name</th><th>Email</th></thead><tbody>';
          for (var i = 0; i < data.length; i++) {
            table += "<tr>";
              table += "<th>" + data[i]["id"] + "</th>";
              table += "<td>" + data[i]["fname"] + " " + data[i]["lname"] + "</td>";
              table += "<td>" + data[i]["email"] + "</td>";
            table += '</tr>';
          }
          table += '</tbody</table>';
          $('.status').append(table);
        });
        // var data = {
        //   "email" : email,
        //   "password" : pass,
        // };
        // $.ajax({
        //   type: 'POST',
        //   url: 'getUser/',
        //   data: data,
        //   success: function (jsondata) {
        //
        //   }
        // });
      });
    </script>
  </head>
  <body>
    <div class="container-fluid">
      <?php
        include "../layout/navbar.php";
      ?>
      <div class="container">
        <div class="row content">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title text-center">Logged In</h3>
            </div>
            <div class="panel-body">
              <div class="col-md-12">
                <div class="status">

                </div>
              </div>
            </div>
          </div>
        </div>
        <?php
          include "../layout/footer.php";
        ?>
      </div>
    </div>
  </body>
</html>
