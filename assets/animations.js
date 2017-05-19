
function funcAnimation() {

    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});

    var pageID = queryDict["page"];

    const $box = $('#main-wrapper');

    if (pageID !== "undefined") {

        if (pageID === "bio.php")
        $box.css('margin', "170px auto auto auto");
        if (pageID === "portfolio.php") {
            $box.css('margin', "205px auto auto auto");

            const $milestones = $('.milestones');
            $milestones.prependTo($('#main-wrapper')[0]);
        }
    }

    $box.velocity("slideDown", {duration: 1000});
    $box.velocity( { scale: 1.25, translateY: 50, boxShadowBlur: 35 }, {duration:1000});

    var $projects = $(".project-overview").each(function(i, obj) {

        $(obj).velocity({opacity: 1.0}, {delay: 1000, duration: 1000});

    });

    const $projectImages = $(".project-image");

    $projectImages.velocity({opacity: 1.0}, {delay:1250, easing: [4]});

    const $title = $("#main-banner-logo p");
    $title.velocity({translateY: 20}, {loop:true, duration:7500, delay:2000});
    $title.velocity({translateY: -20}, {loop:true, duration:7500});

    const $cave = $(".cls-1");
    $cave.velocity({fill: "#FFFFFF"}, {loop:true, duration:7500,delay:10000})
    .velocity({fill: "#000000"}, {loop:true, duration:7500,delay:10000});


    setInterval(createFloaters, 2500);

    function createFloaters() {

        var randomImage = ["assets/images/silk_icons/application.png",
            "assets/images/silk_icons/application_edit.png",
            "assets/images/silk_icons/application_xp_terminal.png",
            "assets/images/silk_icons/bug_link.png",
            "assets/images/silk_icons/database_table.png",
            "assets/images/silk_icons/medal_gold_1.png",
            "assets/images/silk_icons/ruby.png",
            "assets/images/silk_icons/server_add.png",
            "assets/images/silk_icons/star.png",
            "assets/images/silk_icons/television.png",
            "assets/images/silk_icons/user_red.png",
            "assets/images/silk_icons/wrench.png"];


        const $floater = $('<img class="floaters" style="position:fixed; z-index: -10;  left:-20px; top:100px;" src="assets/images/silk_icons/star.png">');
        $floater.attr('src', randomImage[GetRandomInt(0, randomImage.length - 1)]);
        $floater.appendTo($('#css-jacobbrown')[0]);

        $floater.velocity({left: '102%'}, {duration: 20000, complete: function() {$floater.remove()}});
        upAnimation();

        function upAnimation() {

            $floater.velocity({top: "60%"}, {queue: false, duration: 2000, complete: downAnimation});

        }

        function downAnimation() {

            $floater.velocity({top: "40%"}, {queue: false, duration: 2000, complete: upAnimation});

        }

    }

}

$(document).ready(function() {

    var timerArray = {};
    $navButtons = $("#main-nav li");

    $navButtons.mouseover(function () {

        var $text = $(this.firstChild);
        $text.active = true;

        var randomInt = GetRandomInt(0,10);

        if (randomInt <= 5) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0}, {queue: false, duration: 500});
        }
        if (randomInt === 6) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0}, {queue: false, duration: 500});
        }
        if (randomInt >= 7 && randomInt <= 8) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0, rotateZ:360}, {duration: 500});
        }
        if (randomInt >= 9) {

            var colors = ['#ff0000', '#00ff00', '#0000ff'];

            clearInterval(timerArray[$text.text()]);
            timerArray[$text.text()] = setInterval(changeColor, 100);

            function changeColor() {


                $text.velocity("stop");

                if ($text.active) {
                    var random_color = colors[Math.floor(Math.random() * colors.length)];
                    $text.velocity({scale: 2.0, color: random_color, rotateZ: -0}, {duration: 100});
                }
                else {
                    clearInterval(timerArray[$text.text()]);
                    $text.velocity($text.timerColor);
                }
            }
        }





    });
    $navButtons.mouseleave(function () {


        var $text = $(this.firstChild);
        $text.active = false;
        clearInterval(timerArray[$text.text()]);

        $text
            .velocity("stop")
            .velocity({color: "#FFFFFF", scale: 1.0, rotateZ: -0}, {queue: false, duration: 500});

        $(this).css('rotation', '');
    });


    var $projects = $(".project-overview").each(function(i, obj) {
        //test

        $(obj).mouseover(function () {

            this.style.zIndex = 10;

            $(this)
                .velocity("stop")
                .velocity({opacity:1.0, scale: 1.5, boxShadowBlur: 35, rotateZ: -0},625, [500, 20], {queue: false, duration: 500});



        });
        $(obj).mouseleave(function () {

            this.style.zIndex = 1;

            $(this)
                .velocity("stop")
                .velocity({opacity:1.0, color: "white", boxShadowBlur: 0, scale: 1.0, color:"white", rotateZ: -0}, {duration: 500});
        });

    });

    var $circle = $(".timeline-circle");

    $circle.mouseover(function () {

        $(this)
            .velocity("stop")
            .velocity({opacity:0.0}, {queue: false, duration: 500});



    });
    $circle.mouseleave(function () {

        $(this)
            .velocity("stop")
            .velocity({opacity:1.0}, {duration: 500});
    });


    var $nodes = $("#main-banner-logo p");

    $nodes.mouseover(function () {

        console.log("Yes");

        $(this)
            .velocity({color:"#0066ff"}, {duration: 500, queue:false});



    });
    $nodes.mouseleave(function () {

        $(this)
            .velocity({color:"#FFFFFF"}, {duration: 500, queue:false});
    });

    var $milestone = $("#timeline-bigcircle-one");

});

function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function milestoneOne() {

    $('#milestone-one div').css('visibility', "visible");

    $('#milestone-one div')
        .velocity({opacity: 1.0}, {duration: 500});

}