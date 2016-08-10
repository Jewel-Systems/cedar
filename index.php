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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link rel="stylesheet" href="css/home.css" type="text/css" />

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.2/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

    <!-- Script for the QRCode camera -->
    <script type="text/javascript" src="grid.js"></script>
    <script type="text/javascript" src="version.js"></script>
    <script type="text/javascript" src="detector.js"></script>
    <script type="text/javascript" src="formatinf.js"></script>
    <script type="text/javascript" src="errorlevel.js"></script>
    <script type="text/javascript" src="bitmat.js"></script>
    <script type="text/javascript" src="datablock.js"></script>
    <script type="text/javascript" src="bmparser.js"></script>
    <script type="text/javascript" src="datamask.js"></script>
    <script type="text/javascript" src="rsdecoder.js"></script>
    <script type="text/javascript" src="gf256poly.js"></script>
    <script type="text/javascript" src="gf256.js"></script>
    <script type="text/javascript" src="decoder.js"></script>
    <script type="text/javascript" src="qrcode.js"></script>
    <script type="text/javascript" src="findpat.js"></script>
    <script type="text/javascript" src="alignpat.js"></script>
    <script type="text/javascript" src="databr.js"></script>

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
                <!-- <video id="v" autoplay=""></video> -->
                <img class="img-responsive" src="http://placehold.it/350x300" alt="placeholder" />
              </div>
              <div class="col-md-6">
      			  	<div class="loginmodal-container">
        					<h1>Login to Your Account</h1><br>
        				  <form action="user/" method="post">
          					<input type="text" name="email" placeholder="Email" required>
          					<input type="password" name="pass" placeholder="Password" required>
          					<input type="submit" name="login" class="login loginmodal-submit" value="Login">
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
