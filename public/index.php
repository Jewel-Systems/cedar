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

    <script type="text/javascript">
      $(document).ready(function () {
      // $(document).ajaxStart(function () {
        $('.content img.loading').fadeIn(1000);
        $('.content img.loading').css('display', 'block');
      // });

      // $(document).ajaxComplete(function () {
        $('.content img.loading').delay(2000).fadeOut(1000);
        $('.content p.greeting').delay(5000).fadeIn(1000);
        $('.content p.greeting').delay(2000).fadeOut(1000);
        $('.content .panel').delay(10000).fadeIn(1000);
      // });
      });
    </script>
  </head>
  <body>
    <div class="container-fluid">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">
              <img src="images/logo.png" class="img-responsive" alt="Cedar House" />
            </a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="#">Home</a></li>
              <li><a href="#">News</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row content">
          <img src="images/balls.gif" class="img-responsive loading" alt="loading" />
          <p class="greeting"><span class="glyphicon glyphicon-user"></span>Hello</p>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title text-center">Login</h3>
            </div>
            <div class="panel-body">
              <p>Present your QR code</p>
              <img class="img-responsive" src="http://placehold.it/350x300" alt="placeholder" />
            </div>
          </div>
        </div>
        <div class="row footer">
          <div class="col-md-12">
            <span class="pull-left">Copyright &copy; Cedar House</span><span class="pull-right text-right">Education for our time</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
