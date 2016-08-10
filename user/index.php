<?php
  // ob_start();
  // session_start();
  include "../resources/domain.php";

  $email = null;
  $pass = null;

  // echo var_export($_POST, true);
  var_dump($_POST);
  $email = $_POST['email'];
  $pass = $_POST['pass'];
  $login = array("email" => $email, "password" => $pass);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Cedar House</title>

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
      var login = <?php echo json_encode($login); ?>;
      $(document).ready(function() {
        $('.status').append('blah');
        $.getJSON("", function(data) {
          $('.status').append(data);
          alert(data);
          // var email = data["email"];
          // var password = data["password"];
          // $('.status').append("Email: " + email + "; Password: " + password);
        });
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
              <div class="col-md-6">
                <h3>Login Status</h3>
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
