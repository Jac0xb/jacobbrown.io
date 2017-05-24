<!--

    Created by Jacob Brown
    HTML Comment Documentation is for general educational purposes, enjoy.

-->
<!DOCTYPE html>
<html id="css-html" lang="en">

<head>

    <link rel="icon" type="image/png"
          href="assets/images/silk_icons/application_xp_terminal.png" />

    <!-- Loading Fonts from Google -->
    <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

    <!-- Loading JQuery Library -->
    <script src="http://code.jquery.com/jquery-3.2.1.js" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="      crossorigin="anonymous"></script>

    <!-- Loading VelocityJS Library -->
    <script src="includes/libraries/velocity.js" type="text/javascript"></script>
    <!--<script src="includes/javascript/drift.js" type="text/javascript"></script>-->

    <!-- Loading website animations -->
    <script src="assets/animations.js" type="text/javascript"></script>

    <script>

        $(document).ready( function() {
            $("#main-content").load("includes/main.php");
        });

    </script>

    <!-- Charset of webpage -->
    <meta charset="utf-8">
    <!-- Homepage of webpage -->
    <title>jacobbrown.io</title>
    <!-- The styling sheet guide for the webpage -->
    <link href="assets/mainstyle.css" type = "text/css" rel="stylesheet" />
    <!-- Setting the viewport of the webpage -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Author of the website, thats me! -->
    <meta name="author" content="Jacob Brown">
    <!-- Meta description of webpage -->
    <meta name="description" content="My Personal / Professional Webspace">
    <!-- Allows robots to dig through the site for information. (See. Web Crawling) -->
    <meta name="robots" content="all">

</head>

<!-- The "onload" element property is a JavaScript hook which
allows a JS function to be ran when element is fully loaded. -->
<body onload="funcAnimation()" id="css-jacobbrown">


<!-- The 'wrapper' element around the site contenet. -->
<div id="main-wrapper">

    <!-- Places the contents of the header.php into this HTML position -->
    <?php include("includes/header.php"); ?>

    <!-- The stuff inbetween the header and the footer -->
    <div id="main-content">

    </div>

    <?php include("includes/footer.php"); ?>

</div>
</body>


</html>