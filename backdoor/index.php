<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet">

    <script type="text/javascript" src="assets/js/lib/jquery-3.2.1.js"></script>
    <script src="assets/js/lib/FileTree/jquery.easing.js" type="text/javascript"></script>
    <script src="assets/js/lib/FileTree/jqueryFileTree.js" type="text/javascript"></script>
    <link href="assets/js/lib/FileTree/jqueryFileTree.css" rel="stylesheet" type="text/css" media="screen">



    <script></script>
    <link rel="stylesheet" type="text/css" href="assets/css/styles.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>

    <title>Todo List</title>
</head>
<body>

<div id="container">

    <h1>Coursework Portfolio</h1>

    <div id="main-content">


        <div id="fileTree-container">
        <div id="fileTree">


        </div>
        </div>


            <code id="code-container">


            </code>


    </div>

    <h1 style="font-size:16px;">Powered by FileTree.js and Highlight.js</h1>

</div>

<script type="text/javascript">

    $(document).ready( function() {

        $('#fileTree').fileTree({ root: '../../../../../projects/', script: 'assets/js/lib/FileTree/connectors/jqueryFileTree.php', folderEvent: 'click', expandSpeed: 750, collapseSpeed: 750, expandEasing: 'easeOutBounce', collapseEasing: 'easeOutBounce', loadMessage: 'Un momento...' }, function(file) {

            //console.log(window.location.pathname + file.replace("../../../../../", ""));
            filelocation = window.location.pathname + file.replace("../../../../../", "");

            fileextension = filelocation.split(".")[1];

            if (fileextension === "zip") {

                window.location.href = filelocation;
                return;
            }

            $.get(filelocation, function(result) {

                filter = result
                        .replace(/\>/g,"&gt;")
                        .replace(/\</g,"&lt;");

                $container = $("#code-container");

                $container.html(filter);

                $container
                    .attr('style', "")
                    .attr('class', "");

                if (fileextension === "txt") {
                    restyle = filter
                        .replace(/\{h2-start}/g,'<h2>')
                        .replace(/\{h2-end}/g,'</h2>')
                        .replace(/\{h3-start}/g,'<h3>')
                        .replace(/\{h3-end}/g,'</h3>');

                    $container.attr('class', "nohighlight");
                    $container.attr('style', "white-space: pre-line;");
                    $container.html(restyle);
                }

                hljs.highlightBlock(document.getElementById("code-container"));

            });

        });

    });
</script>

<script type="text/javascript" src="assets/js/todo.js"></script>

</body>
</html>