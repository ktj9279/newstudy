/*
 notifyMe jQuery Plugin v1.0.0
 Copyright (c)2014 Sergey Serafimovich
 Licensed under The MIT License.
*/

function explode(){
    $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
    $(".message").fadeOut();
}

function myTimeout() {
    setTimeout(function(){
        explode();
    },4000);
}

(function(e) {
    e.fn.notifyMe = function() {

        // Alert messages
        var thvalid        = '<p class="notify-valid">Congrats! You are in list.<br>We will inform you as soon as we finish.</p>';
        var thproblem      = '<p class="notify-valid">Your e-mail address is incorrect.<br>Please check it and try again.</p>';
        var thoops         = '<p class="notify-valid">Oops. Looks like something went wrong.<br>Please try again later.</p>';
        var thfake         = '<p class="notify-valid">This email address looks fake or invalid.<br>Please enter a real email address.</p>';
        var thavailability = '<p class="notify-valid">Service is not available at the moment.<br>Please check your internet connection or try again later.</p>';

        var i = e(this).find("input[name=email]");
        var s = e(this).attr("action");
        var o = e(this).find(".note");
        //var thform = document.getElementById("notifyMe");

        // e(this).on("submit", function(t) {
        //     t.preventDefault();
        //     var h = i.val();
        //     var p = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     if (p.test(h)) {
        //         $(".message").removeClass("error bad-email success-full");
        //         $(".message").hide().html('').fadeIn();
        //         $(".fa-spinner").addClass("fa-spin").removeClass("opacity-0");
        //         o.show();
        //         e.ajax({
        //             type: "POST",
        //             url: s,
        //             data: {
        //                 email: h
        //             },
        //             dataType: "json",
        //             error: function(e) {
        //                 o.hide();
        //                 $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
        //                 $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
        //                 if (e.status === 404) {
        //                     $(".message").html(thavailability).fadeIn();
        //                     myTimeout();
        //                 } else {
        //                     $(".message").html(thoops).fadeIn();
        //                     myTimeout();
        //                 }
        //             }
        //         }).done(function(e) {
        //             o.hide();
        //             if (e.status === "success") {
        //                 $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
        //                 $(".message").removeClass("bad-email").addClass("success-full");
        //                 $(".block-message").addClass("show-block-valid").removeClass("show-block-error");
        //                 $(".message").html(thvalid).fadeIn();
        //                 thform.reset();
        //             }
        //             else {
        //                 if (e.type === "ValidationError") {
        //                     $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
        //                     $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
        //                     $(".message").html(thfake).fadeIn();
        //                     myTimeout();
        //                 } else {
        //                     $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
        //                     $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
        //                     $(".message").html(thoops).fadeIn();
        //                     myTimeout();
        //                 }
        //             }
        //         });
        //
        //     } else {
        //         $(".fa-spinner").addClass("opacity-0").removeClass("fa-spin");
        //         $(".message").addClass("bad-email").removeClass("success-full");
        //         $(".block-message").addClass("show-block-error").removeClass("show-block-valid");
        //         $(".message").html(thproblem).fadeIn();
        //         myTimeout();
        //         o.hide();
        //     }
        //
        //     // Reset and hide all messages on .keyup()
        //     $("#notifyMe input").on('keyup keypress', function(e) {
        //         var code = e.keyCode || e.which;
        //
        //         if (code === 13) {
        //             e.preventDefault();
        //             $("#notifyMe").submit();
        //           } else {
        //
        //             clearTimeout(myTimeout);
        //
        //             $(".block-message").addClass("").removeClass("show-block-valid show-block-error");
        //             $(".message").fadeOut();
        //         }
        //     });
        // });
    };

})(jQuery);