let GLOBAL_FloaterInterval = 2500;
let GLOBAL_ResumeURL = "assets/Brown,%20Jacob%20-%20Resume%20(5.24.2017).pdf";
let GLOBAL_CurrentPage = "";
let GLOBAL_TypingSpeeds = [50,250];
let GLOBAL_TypingBackgrounds = [1,5];
let GLOBAL_TypingEnabled = true;
let GLOBAL_PopupVisible = false;


/**
 *  Loads animations on loading of body of HTML.
 */
function funcAnimation() {

    // Animation for main wrapper.
    const $wrapper = $('#main-wrapper');
    const $milestones = $('.milestones');
    $milestones.prependTo($wrapper[0]);
    $wrapper.velocity( { boxShadowBlur: 35 }, {duration:1000});

    // Animation for 'jacobbrown.io' logo.
    const $title = $("#main-banner-logo").find( "p" );
    $title.velocity({translateY: 20}, {loop:true, duration:7500, delay:2000});
    $title.velocity({translateY: -20}, {loop:true, duration:7500});

    // Cave at the bottom of the website animation.
    const $cave = $(".cls-1");
    $cave.velocity({fill: "#FFFFFF"}, {loop:true, duration:7500,delay:10000})
    .velocity({fill: "#000000"}, {loop:true, duration:7500,delay:10000});

    // Timer for createFloaters every 2.5 seconds.
    setInterval(createFloaters, GLOBAL_FloaterInterval);

}

/**
 *  Creates floaters that traverse the banner of the webpage.
 */
function createFloaters() {

    //
    const randomImage = [
        "assets/images/silk_icons/accept.png",
        "assets/images/silk_icons/script_code.png",
        "assets/images/silk_icons/server.png",
        "assets/images/silk_icons/world.png",
        "assets/images/silk_icons/email_link.png",
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

    const floaterElement = "<img class='floaters' style='position:absolute; zoom: .8; -moz-transform: scale(0.8); z-index: 100;  left:-20px; top:100px;' src='assets/images/silk_icons/star.png'>";

    // JQuery generating an image elements.
    const $floater = $(floaterElement);
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

// Runs when HTML document is loaded.
// Initializes the hooks/automated animations for the webpage.

$(document).ready(function() {


    $(".logo-node").click( function() {

        AnimationLoadHome();

    });

    //
    // Footer personal information protection
    //
    $("#footer-phonenumber").hover(function() {

        //$(this).text("phone number ");

    });

    $("#footer-email").hover(function() {

        $(this).text("email jacobbrown41@outlook.com");

    });

    ///////////////////////////////////////////////////////////////////////////////////////
    // Background coding animation load up.
    ///////////////////////////////////////////////////////////////////////////////////////
    generateBackground();
    function generateBackground() {

        // Disable mobile display of typing animation.
        if (typeof window.orientation !== 'undefined') { return; }

        $("#background-code").load("includes/codebackgrounds/backgroundCode-" + RandomInteger(GLOBAL_TypingBackgrounds[0], GLOBAL_TypingBackgrounds[1]) + ".html", function () {

            // Declaring variables needed to parse HTML files into animation format.
            let $code = $("#background-code");
            $code.css('opacity','1.0');
            let modifiedHTML = "";
            let absIndex = 0;
            let newlineArrays = {};

            let span = '<span style="display:inline-block; width: 25px;"></span>';
            $code.html().split('{end}').forEach(function (currLine, index) {

                newlineArrays[index] = absIndex;

                let symbolIndices = [];
                let symbolStack = [];

                if (currLine.includes("&lt;") || currLine.includes("&gt;")) {

                    let regexLessThan = new RegExp("&lt;", 'gi');
                    let regexGreaterThan = new RegExp("&gt;", 'gi');

                    while (regexLessThan.exec(currLine) && regexGreaterThan.exec(currLine)) {
                        symbolIndices.push(( regexLessThan.lastIndex - 4 ));
                        symbolStack.push("&lt;");
                        symbolIndices.push(( regexGreaterThan.lastIndex - 4 ));
                        symbolStack.push("&gt;");
                    }
                }

                let floorIndex = 0;
                let ignoreIndex = -1;
                let ignoreLength = -1;

                if (symbolIndices.length > 0) {
                    ignoreIndex = symbolIndices[floorIndex];
                }

                currLine.split('').forEach(function (currChar, charIndex) {

                    if (charIndex === ignoreIndex)
                        ignoreLength = 3;


                    if (ignoreLength > 0) {
                        ignoreLength--;
                        return;

                    }

                    if (ignoreLength === 0) {
                        absIndex++;
                        modifiedHTML = modifiedHTML + '<span style="color:#F0F0F0; background-color:#F0F0F0;" id="background-code-node-' + absIndex + '\">' + symbolStack[floorIndex] + '</span>';
                        ignoreIndex = symbolIndices[++floorIndex];
                        ignoreLength = -1;
                        return;
                    }

                    // '^' Tab character replacement.
                    if (currChar === '^')
                        currChar = span;

                    absIndex++;
                    modifiedHTML = modifiedHTML + '<span style="color:#F0F0F0; background-color:#F0F0F0;" id="background-code-node-' + absIndex + '\">' + currChar + '</span>';

                });

                modifiedHTML = modifiedHTML + "<br>";

            });

            $code.html(modifiedHTML);

            // Code line manipulation.
            let $codeLines = $("#background-code-line");
            $codeLines.css("opacity","1.0");

            for (let line in newlineArrays) {
                $codeLines.html($codeLines.html() + '<span id=\"background-code-line-' + line + '\" style="opacity: 0">' + ( parseInt(line) + 1) + "</span>" + "<br>");
            }

            // Variables for the typing animations.
            let currNode = 0;
            let line = 0;
            let currNextLine = -1;
            $("#background-code-line-0").velocity({opacity: 1.0}, {queue: false, duration: 100});

            if (GLOBAL_TypingEnabled)
                setTimeout(typeAnimation, 200);

            // Simulates the typing of code in the background.
            function typeAnimation() {

                if (currNextLine < 0) {
                    currNextLine = newlineArrays[line++];
                }

                if (currNode >= currNextLine) {

                    let $currLine = $("#background-code-line-" + line);
                    $currLine.velocity({opacity: 1.0}, {queue: false, duration: 100});
                    currNextLine = -1;

                }

                // Animation of the code.
                let $currNodeElement = $("#background-code-node-" + currNode);
                $currNodeElement.velocity({color: "#000"}, {queue: false, duration: 100});
                $currNodeElement.velocity({backgroundColor: ["#F0F0F0", "#000"]}, {queue: false, duration: 300});

                currNode++;

                if (currNode > absIndex) {
                    let $codeElement = $("#background-code");
                    $codeElement.velocity({opacity: '0.0'}, {duration: 10000, complete: function() {$codeElement.empty();}});
                    let $codeLineElement = $("#background-code-line");
                    $codeLineElement.velocity({opacity: '0.0'}, {duration: 10000, complete: function() {$codeLineElement.empty();}});
                    setTimeout(function(){generateBackground();},10100);

                    return;
                }
                if (GLOBAL_TypingEnabled)
                    setTimeout(typeAnimation, RandomInteger(GLOBAL_TypingSpeeds[0], GLOBAL_TypingSpeeds[1]));

            }

        });

    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // Navigation animations.
    ///////////////////////////////////////////////////////////////////////////////////////
    const timerArray = {};
    const $navButtons = $("#main-nav").find("li");

    ///////////////////////////////////////////////////////////////////////////////////////
    // Mouse event hook for navigation buttons.
    ///////////////////////////////////////////////////////////////////////////////////////

    // Mouse over/enter navigation elements.
    $navButtons.mouseover(function () {

        // Styling changes, defaults.
        $(this).attr('z-index', 30);
        $(this).attr('cursor', 'pointer');

        // Getting the paragraph inside the navigation list element.
        const $text = $(this).find("p");
        $text.active = true;
        const randomInt = RandomInteger(0,1000);

        // Normal animation.
        if (randomInt <= 950 ) {
            $text
                .velocity("stop")
                .velocity({scale: 2.0}, {queue: false, duration: 500});
        }
        // Rotation animation.
        else if (randomInt > 900 && randomInt <= 950) {
            //$text
            //    .velocity("stop")
            //    .velocity({scale: 2.0, rotateZ:360}, {queue: false, duration: 500});
        }
        // Color changing animation.
        else if (randomInt > 950) {

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
            }
        }
    });

    // Mouse leave navigation elements.
    $navButtons.mouseleave(function () {

        $(this).attr('z-index', 0);
        $(this).attr('cursor', 'pointer');
        const $text = $(this).find("p");
        $text.active = false;
        clearInterval(timerArray[$text.text()]);

        $text
            .velocity("stop")
            .velocity({color: "#FFFFFF", scale: 1.0, rotateZ: -0}, {queue: false, duration: 500});

        $(this).css('rotation', '');
    });

    /// onClick event for home button.
    $("#main-nav-home").on("click", function() {

        if (GLOBAL_CurrentPage === "home")
            return;

        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Home', '?home');
        AnimationLoadHome();

    });

    /// onClick event for game button.
    $("#main-nav-game").on("click", function() {

        if (GLOBAL_CurrentPage === "game")
            return;

        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Game', '?game');
        AnimationLoadGame();

    });

    /// onClick event for portfolio button.
    $("#main-nav-portfolio").on("click", function() {

        if (GLOBAL_CurrentPage === "portfolio")
            return;

        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Portfolio', '?portfolio');
        AnimationLoadPortfolio();

    });

    /// onClick event for bio button.
    $("#main-nav-bio").on("click", function() {

        if (GLOBAL_CurrentPage === "bio")
            return;

        event.preventDefault();

        window.history.pushState({}, 'jacobrown.io - Bio', '?bio');
        AnimationLoadBio();

    });

    //
    // Settings menu events
    //

    $("#settings-menu-icon").on("click", function() {

        console.log("Clicked");

    });

    $('#setting-menu-form-1').submit(function () {
        event.preventDefault();

        let menuSettings = $('#setting-menu-form-1-input').val();

        GLOBAL_TypingSpeeds[0] = (100 - (parseInt(menuSettings)))/3 ;
        GLOBAL_TypingSpeeds[1] = (100 - (parseInt(menuSettings)))/3 ;
        return false;

    });

    // Old portfolio code.
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
// Animation for old portfolio page.
///////////////////////////////////////////////////////////////////////////////////////
    /**
     function milestoneOne() {

    $('#milestone-one div').css('visibility', "visible");

    $('#milestone-one div')
        .velocity({opacity: 1.0}, {duration: 500});

}
     **/

        ///////////////////////////////////////////////////////////////////////////////////////
        // Animation for banner logo.
        ///////////////////////////////////////////////////////////////////////////////////////

    const $logoSection = $("#main-banner-logo").find("p");

    $logoSection.mouseover(function () {
        $(this).velocity({color:"#0066ff"}, {duration: 500, queue:false});
    });

    $logoSection.mouseleave(function () {
        $(this).velocity({color:"#FFFFFF"}, {duration: 500, queue:false});
    });

});

/**
 * Given a range, returns a random integer within range.
 * @param minVal
 * @param maxVal
 * @returns {*}
 * @constructor
 */
function RandomInteger(minVal, maxVal) {
    return Math.floor( Math.random() * ( maxVal - minVal + 1 ) ) + minVal;
}

/**
 * Creates a popup page of the resume PDF.
 */
function createPDFPopup() {

    console.log("Popup enabled");
    // JQuery generating an image elements.
    const $pdfPopup = $(
        '<div class="popup"> <p><i>Click anywhere on the page to close.</i></p>' +
        '<object data=\"' + GLOBAL_ResumeURL + '\" type="application/pdf" width="100%" height="100%">' +
        '<p><a href=\"' + GLOBAL_ResumeURL + '\">Click here to see PDF.</a></p>' +
        '</object>' +
        '</div>');
    $pdfPopup.prependTo($('#css-jacobbrown')[0]);

    setTimeout(function () {GLOBAL_PopupVisible = true;}, 100);
}

// If the PDF popup is open, onClick for closing popup menu.
$(document).click(function() {

    if (GLOBAL_PopupVisible) {
        let $popup = $(".popup");
        $popup.remove();
        GLOBAL_PopupVisible = false;
    }

});

// Stops popup menu from closing when popup is closing.
$(".popup").click(function(e) {
    e.stopPropagation();
    return false;
});

/**
 * Gets the currently viewed page.
 * @returns {*}
 */
function grabParameter() {

    let directoryString = location.search.split('/');

    if(directoryString.length > 0) {
        return directoryString[0].replace('?', '').toLowerCase();
    }

    return undefined;

}

///////////////////////////////////////////////////////////////////////////////////////
// Loads the webpage of the parameter.
///////////////////////////////////////////////////////////////////////////////////////
$("#main-content").ready(function() {

    let parameterString = grabParameter();

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

/**
 *  Loads the home page.
 */
function AnimationLoadHome() {

    GLOBAL_CurrentPage = "home";

    let $content = $("#main-content");

    $content.load("includes/main.html",function() {

        $("#page-main").velocity({opacity: 1.0}, {duration: 1000});
    });

}

/**
 * Loads the game page.
 */
function AnimationLoadGame() {

    GLOBAL_CurrentPage = "game";

    let $content = $("#main-content");

    $content.load("includes/game.html",function() {

        $("#page-game").velocity({opacity: 1.0}, {duration: 1000});
    });

}

/**
 * Loads the portfolio page.
 */
function AnimationLoadPortfolio () {

    GLOBAL_CurrentPage = "portfolio";

    let $content = $("#main-content");
    $content.load("includes/portfolio.html", function() {

        $("#page-portfolio").velocity({opacity: 1.0}, {duration: 1000});

        const $popup = $(".section-popup-button");

        $popup.mouseover(function () {

            let $paragraphElement = $(this).find("p");
            $paragraphElement.velocity({wordSpacing: 1.5}, {duration: 500, queue:false});

        });
        $popup.mouseleave(function () {

            let $paragraphElement = $(this).find("p");
            $paragraphElement.velocity({wordSpacing: 1}, {duration: 500, queue:false});

        });

    });

}

/**
 * Loads the bio page.
 */
function AnimationLoadBio() {

    GLOBAL_CurrentPage = "bio";

    let $content = $("#main-content");
    $content.load("includes/bio.html", function() {

        let $projectOverview = $(".project-overview");

        $projectOverview.each(function(i, obj) {

            $(obj).velocity({opacity: [1.0,0]}, {duration: 1000});

        });

        const $projectImages = $(".project-image");

        $projectImages.velocity({opacity: [1.0,0]}, {easing: [4]});

        ///////////////////////////////////////////////////////////////////////////////////////
        // Animations for project class animations.
        ///////////////////////////////////////////////////////////////////////////////////////
        $projectOverview.each(function(i, obj) {

            // Disable mobile display of project popup animation.
            if (typeof window.orientation !== 'undefined') { return; }

            $(obj).mouseover(function () {

                this.style.zIndex = 100;

                $(this)
                    .velocity("stop")
                    .velocity({opacity:1.0, scale: 1.5, boxShadowBlur: 35, rotateZ: -0},625, [500, 20], {queue: false, duration: 500});



            });
            $(obj).mouseleave(function () {

                this.style.zIndex = 0;

                $(this)
                    .velocity("stop")
                    .velocity({opacity:1.0, boxShadowBlur: 0, scale: 1.0, color:"white", rotateZ: -0}, {duration: 500});
            });

        });

    });
}