var GLOBAL_currentpage = "";

function funcAnimation() {

    // Determining what page the user is looking at.
    const queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});

    const pageID = queryDict["page"];

    ///////////////////////////////////////////////////////////////////////////////////////
    // Animation for main wrapper.
    ///////////////////////////////////////////////////////////////////////////////////////

    const $wrapper = $('#main-wrapper');
    var offset = 1;

    if (pageID !== "undefined") {

        if (pageID === "bio")
            offset = 50;
        if (pageID === "portfolio")
            offset = 10;
        if (pageID === "main")
            offset = 10;
    }

    const $milestones = $('.milestones');
    $milestones.prependTo($wrapper[0]);
    $wrapper.velocity( { boxShadowBlur: 35 }, {duration:1000});

    ///////////////////////////////////////////////////////////////////////////////////////
    // Animation for 'jacobbrown.io' logo.
    ///////////////////////////////////////////////////////////////////////////////////////

    const $title = $("#main-banner-logo").find( "p" );
    $title.velocity({translateY: 20}, {loop:true, duration:7500, delay:2000});
    $title.velocity({translateY: -20}, {loop:true, duration:7500});

    ///////////////////////////////////////////////////////////////////////////////////////
    // Cave at the bottom of the website animation.
    ///////////////////////////////////////////////////////////////////////////////////////

    const $cave = $(".cls-1");
    $cave.velocity({fill: "#FFFFFF"}, {loop:true, duration:7500,delay:10000})
    .velocity({fill: "#000000"}, {loop:true, duration:7500,delay:10000});


    // Timer for createFloaters every 2.5 seconds.
    setInterval(createFloaters, 2500);

    // Creates floaters that traverse the whole of the webpage.
    function createFloaters() {

        const randomImage = ["assets/images/silk_icons/application.png",
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

        // JQuery generating an image elements.
        const $floater = $('<img class="floaters" style="position:fixed; z-index: -10;  left:-20px; top:100px;" src="assets/images/silk_icons/star.png">');
        $floater.attr('src', randomImage[RandomInteger(0, randomImage.length - 1)]);
        $floater.appendTo($('#css-jacobbrown')[0]);

        // Animations for floater.
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

//
//
//
$(document).ready(function() {

    var $content = $("#main-content");

    $content.load("includes/main.html", function() {

        $("#page-main").velocity({opacity: 1.0}, {duration: 1000});
    });
});

// Runs when document is loaded.
$(document).ready(function() {

    //
    //
    //

    ///////////////////////////////////////////////////////////////////////////////////////
    // Navigation animations.
    ///////////////////////////////////////////////////////////////////////////////////////

    const timerArray = {};
    const $navButtons = $("#main-nav").find("li");

    // Mouse over hook for navigation buttons.
    $navButtons.mouseover(function () {

        this.style.zIndex = 0;
        const $text = $(this);
        $text.active = true;

        const randomInt = RandomInteger(0,1000);

        if (randomInt <= 950 ) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0}, {queue: false, duration: 500});
        }
        else if (randomInt > 950 && randomInt <= 975) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0, rotateZ:360}, {queue: false, duration: 500});
        }
        else if (randomInt > 975 && randomInt <= 1000) {

            const ranColors = ['#0000ff', '#00ff00', '#ff0000'];

            clearInterval(timerArray[$text.text()]);
            timerArray[$text.text()] = setInterval(changeColor, 100);

            // Changes the font color of the element.
            function changeColor() {

                $text.velocity("stop");

                if ($text.active) {
                    const color = ranColors[RandomInteger(0, 2)];
                    $text.velocity({scale: 2.0, color: color, rotateZ: -0}, {duration: 100});
                }
                else {
                    clearInterval(timerArray[$text.text()]);
                    $text.velocity($text.timerColor);
                }
            }
        }
    });

    // Animations for leaving navigation buttons.
    $navButtons.mouseleave(function () {

        this.style.zIndex = 5;
        const $text = $(this);
        $text.active = false;
        clearInterval(timerArray[$text.text()]);

        $text
            .velocity("stop")
            .velocity({color: "#FFFFFF", scale: 1.0, rotateZ: -0}, {queue: false, duration: 500});

        $(this).css('rotation', '');
    });

    /// Home Nav Button click event.
    $("#main-nav-home").on("click", function() {
        event.preventDefault();

        var $content = $("#main-content");

        $content.load("includes/main.html",function() {

            $("#page-main").velocity({opacity: 1.0}, {duration: 1000});
        });
    });

    /// Porfolio Nav Button click event.
    $("#main-nav-portfolio").on("click", function() {
        event.preventDefault();

        var $content = $("#main-content");

        $content.load("includes/portfolio.html", function() {

            $("#page-portfolio").velocity({opacity: 1.0}, {duration: 1000});

            ///////////////////////////////////////////////////////////////////////////////////////
            // Resume button
            ///////////////////////////////////////////////////////////////////////////////////////
            const $popup = $(".section-popup-button");

            $popup.mouseover(function () {

                var $paragraphElement = $(this).find("p");

                $paragraphElement.velocity({wordSpacing: 15}, {duration: 500, queue:false});




            });
            $popup.mouseleave(function () {


                var $paragraphElement = $(this).find("p");
                $paragraphElement.velocity({wordSpacing: 1}, {duration: 500, queue:false});
            });

        });
    });

    /// Bio Nav Button click event.
    $("#main-nav-bio").on("click", function() {
        event.preventDefault();

        var $content = $("#main-content");

        $content.load("includes/bio.html", function() {
            var $projectOverview = $(".project-overview");

            $projectOverview.each(function(i, obj) {

                $(obj).velocity({opacity: 1.0}, {duration: 1000});

            });

            const $projectImages = $(".project-image");

            $projectImages.velocity({opacity: 1.0}, {easing: [4]});

            ///////////////////////////////////////////////////////////////////////////////////////
            // Animations for project class animations.
            ///////////////////////////////////////////////////////////////////////////////////////
            const $projects = $projectOverview.each(function(i, obj) {

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
                        .velocity({opacity:1.0, boxShadowBlur: 0, scale: 1.0, color:"white", rotateZ: -0}, {duration: 500});
                });

            });

        });

    });


    ///////////////////////////////////////////////////////////////////////////////////////
    // Animation for old portfolio page.
    ///////////////////////////////////////////////////////////////////////////////////////
    /**
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
    **/

    ///////////////////////////////////////////////////////////////////////////////////////
    // Animation for logo.
    ///////////////////////////////////////////////////////////////////////////////////////
    const $logosection = $("#main-banner-logo").find("p");

    $logosection.mouseover(function () {

        $(this)
            .velocity({color:"#0066ff"}, {duration: 500, queue:false});



    });
    $logosection.mouseleave(function () {

        $(this)
            .velocity({color:"#FFFFFF"}, {duration: 500, queue:false});
    });

});

///////////////////////////////////////////////////////////////////////////////////////
// Given a range, returns a random integer within range.
///////////////////////////////////////////////////////////////////////////////////////
function RandomInteger(minVal, maxVal) {
    return Math.floor( Math.random() * ( maxVal - minVal + 1 ) ) + minVal;
}

///////////////////////////////////////////////////////////////////////////////////////
// Animation for old portfolio page.
///////////////////////////////////////////////////////////////////////////////////////
/**
function milestoneOne() {

    $('#milestone-one div').css('visibility', "visible");

    $('#milestone-one div')
        .velocity({opacity: 1.0}, {duration: 500});

}
 **/

var popupVisible = false;
function createPDFPopup() {

    console.log("Popup enabled");
    // JQuery generating an image elements.
    const $pdfPopup = $(
        '<div class="popup"> <p><i>Click anywhere on the page to close.</i></p>' +
        '<object data="assets/Brown,%20Jacob%20-%20Resume%20(5.22.2017).pdf" type="application/pdf" width="100%" height="100%">' +
        '<p>Alternative text - include a link <a href="assets/Brown,%20Jacob%20-%20Resume%20(5.22.2017).pdf"">to the PDF!</a></p>' +
        '</object>' +
        '</div>');
    $pdfPopup.prependTo($('#css-jacobbrown')[0]);

    setTimeout(function () {popupVisible = true;}, 100);
}


$(document).click(function() {

    if (popupVisible) {
        var $popup = $(".popup");
        $popup.remove();
        popupVisible = false;
    }

});
$(".popup").click(function(e) {
    e.stopPropagation();
    return false;
});