var GLOBAL_currentpage = "";

function funcAnimation() {

    ///////////////////////////////////////////////////////////////////////////////////////
    // Animation for main wrapper.
    ///////////////////////////////////////////////////////////////////////////////////////

    const $wrapper = $('#main-wrapper');

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

        const randomImage = [
            "assets/images/silk_icons/application.png",
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
        const $floater = $('<img class="floaters" style="position:absolute; zoom: .8; -moz-transform: scale(0.8); z-index: 100;  left:-20px; top:100px;" src="assets/images/silk_icons/star.png">');
        $floater.attr('src', randomImage[RandomInteger(0, randomImage.length - 1)]);
        $floater.appendTo($('#main-banner')[0]);

        // Animations for floater.
        $floater.velocity({left: '102%'}, {duration: 20000, complete: function() {$floater.remove()}});

        upAnimation();

        function upAnimation() {

            $floater.velocity({top: "90%"}, {queue: false, duration: 2000, complete: downAnimation});

        }

        function downAnimation() {

            $floater.velocity({top: "70%"}, {queue: false, duration: 2000, complete: upAnimation});

        }

    }

}




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
        const $text = $(this).find("p");
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
        const $text = $(this).find("p");
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

        window.history.pushState({}, 'jacobrown.io - Home', '?home');

        AnimationLoadHome();

    });

    /// Game Nav Button click event.
    $("#main-nav-game").on("click", function() {
        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Game', '?game');

        AnimationLoadGame();

    });

        /// Porfolio Nav Button click event.
        $("#main-nav-portfolio").on("click", function() {
            event.preventDefault();

            window.history.pushState({}, 'jacobrown.io - Portfolio', '?portfolio');

            AnimationLoadPortfolio();

        });

    /// Bio Nav Button click event.
    $("#main-nav-bio").on("click", function() {
        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Bio', '?bio');

        AnimationLoadBio();


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

$("#background-code").ready(function() {

    var $code = $("#background-code");
    var modifiedHTML = "";
    var absIndex = 0;
    var newlineArrays = {};

    var span = '<span style=\"display:inline-block; width: 25px;\"></span>';

    $code.html().split('{end}').forEach(function(currLine, index, array) {

        newlineArrays[index] = absIndex;

        currLine.split('').forEach(function(currChar, index, array) {

            if (currChar === '^')
                currChar = span;

            absIndex++;
            modifiedHTML = modifiedHTML + '<span style="color:#F0F0F0; background-color:#F0F0F0;" id="background-code-node-' + absIndex + '\">' + currChar + '</span>';

        });

        modifiedHTML = modifiedHTML + "<br>";

    });

    $code.html(modifiedHTML);

    var $codeLines = $("#background-code-line");

    for (var line in newlineArrays) {
        $codeLines.html($codeLines.html() + ( parseInt(line) + 1) + "<br>");
    }

    var floor = 1;
    var elevator = 0;
    var lengthOfSequence = -1;

    var interval = setInterval(function() {

        if (floor === absIndex)
            clearInterval(this);

        var $currNode = $("#background-code-node-" + floor);
        $currNode.velocity({color:"#000"}, {queue: false, duration: 100});
        $currNode.velocity({backgroundColor:["#F0F0F0","#000"]}, {queue: false, duration: 300});

        floor++;

    },200);

});

//
//
//
function backgroundCodeAnimation() {

    console.log("Load background");

}


var popupVisible = false;
function createPDFPopup() {

    console.log("Popup enabled");
    // JQuery generating an image elements.
    const $pdfPopup = $(
        '<div class="popup"> <p><i>Click anywhere on the page to close.</i></p>' +
        '<object data="assets/Brown,%20Jacob%20-%20Resume%20(5.24.2017).pdf" type="application/pdf" width="100%" height="100%">' +
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

function grabParameter() {

    var directoryString = location.search.split('/');

    if(directoryString.length > 0) {

        var explodedParameterString = directoryString[0].replace('?', '').toLowerCase();

        return explodedParameterString;

    }

    return undefined;

}

//
//
//
$("#main-content").ready(function() {

     var parameterString = grabParameter();

     if (parameterString === "home")
         AnimationLoadHome();
     else if (parameterString === "portfolio")
         AnimationLoadPortfolio();
     else if (parameterString === "bio")
         AnimationLoadBio();
     else if (parameterString === "game")
         AnimationLoadGame();
     else
         AnimationLoadHome();

});

function AnimationLoadHome() {

    var $content = $("#main-content");

    $content.load("includes/main.html",function() {

        $("#page-main").velocity({opacity: 1.0}, {duration: 1000});
    });

}

function AnimationLoadGame() {

    var $content = $("#main-content");

    $content.load("includes/game.html",function() {

        $("#page-game").velocity({opacity: 1.0}, {duration: 1000});
    });

}

function AnimationLoadPortfolio () {

    var $content = $("#main-content");
    $content.load("includes/portfolio.html", function() {

        $("#page-portfolio").velocity({opacity: 1.0}, {duration: 1000});

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

}

function AnimationLoadBio() {

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
}