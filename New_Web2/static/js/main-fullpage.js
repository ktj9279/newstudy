/*
* PURE - Sublime Coming Soon Template
* Build Date: July-August 2016
* Last Update: March 2017
* Author: Madeon08 for ThemeHelite
* Copyright (C) 2016 ThemeHelite
* This is a premium product available exclusively here : http://themeforest.net/user/Madeon08/portfolio
*/

/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. Newsletter panel
    3. FullPage Syntax
    4. Portfolio images
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).load(function(){
    "use strict";

    setTimeout(function(){

        $("#preloader").removeClass('flipInY').addClass('fadeOut');
        
    },1000);

    setTimeout(function(){

        
        $("#loading").addClass('vanish');

        $('.open-anim').each(function(i) {
            (function(self) {
                setTimeout(function() {
                    $(self).removeClass('opacity-0').addClass('animated-middle fadeInUp');
                },(i*150)+150);
                })(this);
            });


    },2800);

    setTimeout(function(){

        $("#loading").remove();


        $("#open-newsletter").removeClass('opacity-0').addClass('animated-middle jello');

    },3200);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. Newsletter panel ................. */
    /* ------------------------------------- */

    $('#open-newsletter , .close-newsletter').on( "click", function() {
        $(".fp-section , #info").toggleClass("newsletter-opened");
        return false;
    });

    $(document).click(function(e) {

        if (e.target.id !== 'info' && !$('#info').find(e.target).length) {
            $(".fp-section , #info").removeClass("newsletter-opened");
        }
    });

    $("#notifyMe").notifyMe();

    /* ------------------------------------- */
    /* 3. FullPage Syntax .................. */
    /* ------------------------------------- */

    $('#fullpage').fullpage({
        navigation: true,
        navigationTooltips: ['Home', 'About', 'Services', 'Portfolio', 'Contact'],
        responsiveWidth: 1025
    });

    if ($(window).width() < 1025) {
        $( "#invert-slideshow" ).insertAfter( "#invert-text" );
    }

     $(window).resize(function() {
        if ($(window).width() < 1025) {
            $( "#invert-slideshow" ).insertAfter( "#invert-text" );
        }
        else {
            $( "#invert-text" ).insertAfter( "#invert-slideshow" );
        }
    });

    /* ------------------------------------- */
    /* 4. Portfolio images ................. */
    /* ------------------------------------- */

    $('.gallery-link')
        // Background set up
        .each(function(){
        $(this)
        // Add a photo container
        .append('<div class="photo"></div>')
        // Set up a background image for each link based on data-image attribute
        .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
    });
 
});