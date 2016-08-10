<?php
  // ob_start();
  // session_start();
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
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link rel="stylesheet" href="css/home.css" type="text/css" />

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script type="text/javascript" src="js/jquery-3.1.0.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script type="text/javascript" src="js/bootstrap.min.js"></script>

    <!-- Script for the QRCode camera -->
    <script type="text/javascript" src="js/grid.js"></script>
    <script type="text/javascript" src="js/version.js"></script>
    <script type="text/javascript" src="js/detector.js"></script>
    <script type="text/javascript" src="js/formatinf.js"></script>
    <script type="text/javascript" src="js/errorlevel.js"></script>
    <script type="text/javascript" src="js/bitmat.js"></script>
    <script type="text/javascript" src="js/datablock.js"></script>
    <script type="text/javascript" src="js/bmparser.js"></script>
    <script type="text/javascript" src="js/datamask.js"></script>
    <script type="text/javascript" src="js/rsdecoder.js"></script>
    <script type="text/javascript" src="js/gf256poly.js"></script>
    <script type="text/javascript" src="js/gf256.js"></script>
    <script type="text/javascript" src="js/decoder.js"></script>
    <script type="text/javascript" src="js/qrcode.js"></script>
    <script type="text/javascript" src="js/findpat.js"></script>
    <script type="text/javascript" src="js/alignpat.js"></script>
    <script type="text/javascript" src="js/databr.js"></script>

    <script type="text/javascript">
      $(document).ready(function () {
      // $(document).ajaxStart(function () {
        // $('.content img.loading').fadeIn(1000);
        // $('.content img.loading').css('display', 'block');
      // });

      // $(document).ajaxComplete(function () {
        // $('.content img.loading').delay(2000).fadeOut(1000);
        // $('.content p.greeting').delay(5000).fadeIn(1000);
        // $('.content p.greeting').delay(2000).fadeOut(1000);
        // $('.content .panel').delay(10000).fadeIn(1000);
        $('.content .panel').fadeIn(1000);
      // });
      });
    </script>
  </head>
  <body>
    <div class="container-fluid">
      <?php
        include "layout/navbar.php";
      ?>
      <div class="container">
        <div class="row content">
          <img src="images/balls.gif" class="img-responsive loading" alt="loading" />
          <p class="greeting">Hello</p>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title text-center">Login</h3>
            </div>
            <div class="panel-body">
              <div class="col-md-6">
                <p>Present your QR code</p>
                <video id="v" autoplay=""></video>
                <!-- <img class="img-responsive" src="http://placehold.it/350x300" alt="placeholder" /> -->
              </div>
              <div class="col-md-6">
      			  	<div class="loginmodal-container">
        					<h1>Login to Your Account</h1><br>
        				  <form action="user/" method="post">
          					<input type="text" name="email" placeholder="Email" required>
          					<input type="password" name="pass" placeholder="Password" required>
          					<input type="submit" class="login loginmodal-submit" value="Login">
        				  </form>
        				</div>
              </div>
            </div>
          </div>
        </div>
        <?php
          include "layout/footer.php";
        ?>
      </div>
    </div>
  </body>
</html>
