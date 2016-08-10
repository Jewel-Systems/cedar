<?php
  // ob_start();
  // session_start();
  include "../resources/domain.php";

  // echo var_export($_POST, true);
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

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="../css/style.css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
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
      var login = <?= json_encode($login); ?>;
      alert(login);
      $(document).ready(function() {
        $('.status').html('blah');
        $.getJSON("index.php", function(data) {
          $('.status').html(data);
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
