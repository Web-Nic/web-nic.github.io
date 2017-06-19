/*
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-SETTING
-Preloader
-Sticky Header
-Loader blocks
-Scroll Animation
-Dropdown Menu Fade
-Menu Android
-Scroll menu
-Parallax
-Search Animation
-Disable Mobile Animated
-Animated Entrances
-Scroll top
-Accordion
-Filter accordion
-Tabs on hover
-Сustomization select
-Tooltip
-Zoom Images
-Ticker
-ISOTOPE FILTER
-HOME SLIDER
-OWL Sliders
-Scroll button
*/



$(document).ready(function() {

    "use strict";



/////////////////////////////////////////////////////////////////
// SETTING
/////////////////////////////////////////////////////////////////

    var windowHeight = $(window).height();
    var windowWidth = $(window).width();


    var tabletWidth = 767;
    var mobileWidth = 640;



/////////////////////////////////////////////////////////////////
// Preloader
/////////////////////////////////////////////////////////////////


    var $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(50).fadeOut('slow');



/////////////////////////////////////
//  Sticky Header
/////////////////////////////////////


    if (windowWidth > tabletWidth) {

        var headerSticky = $(".layout-theme").data("header");
        var headerTop = $(".layout-theme").data("header-top");

        if (headerSticky.length) {
            $(window).on('scroll', function() {
                var winH = $(window).scrollTop();
                var $pageHeader = $('.header');
                if (winH > headerTop) {

                    $('.yamm').addClass("animated");
                    $('.yamm').addClass("animation-done");
                    $('.yamm').addClass("bounce");
                    $pageHeader.addClass('sticky');

                } else {

                    $('.yamm').removeClass("bounce");
                    $('.yamm').removeClass("animated");
                    $('.yamm').removeClass("animation-done");
                    $pageHeader.removeClass('sticky');
                }
            });
        }
    }



/////////////////////////////////////
//  Loader blocks
/////////////////////////////////////


    $( "#scroll-next" ).on( "click", function() {

        var hiddenContent =  $( "#scroll-next + .list-goods") ;

        $( "#scroll-next").hide() ;
        hiddenContent.show() ;
        hiddenContent.addClass("animated");
        hiddenContent.addClass("animation-done");
        hiddenContent.addClass("bounceInUp");

    });



/////////////////////////////////////////////////////////////////
//   Dropdown Menu Fade
/////////////////////////////////////////////////////////////////


    $(".dropdown").hover(
        function() {
            $('.dropdown-menu', this).stop(true, true).slideDown("fast");
            $(this).toggleClass('open');
        },
        function() {
            $('.dropdown-menu', this).stop(true, true).slideUp("fast");
            $(this).toggleClass('open');
        }
    );


    $(".yamm .navbar-nav>li").hover(
        function() {
            $('.dropdown-menu', this).fadeIn("fast");
        },
        function() {
            $('.dropdown-menu', this).fadeOut("fast");
        });


    window.prettyPrint && prettyPrint();
    $(document).on('click', '.yamm .dropdown-menu', function(e) {
        e.stopPropagation();
    });



/////////////////////////////////////
//  Menu Android
/////////////////////////////////////

$( '.navbar-nav li:has(ul)' ).doubleTapToGo();



/////////////////////////////////////
//  Search Animation
/////////////////////////////////////


    $('#search-open, #search-close').on('click', function(e) {
        e.preventDefault();
        $('.header-search ').toggleClass('open-search');
        $('.header-search').toggleClass('open');
    });



/////////////////////////////////////
//  Disable Mobile Animated
/////////////////////////////////////

    if (windowWidth < mobileWidth) {

        $("body").removeClass("animated-css");

    }


        $('.animated-css .animated:not(.animation-done)').waypoint(function() {

                var animation = $(this).data('animation');

                $(this).addClass('animation-done').addClass(animation);

        }, {
                        triggerOnce: true,
                        offset: '90%'
        });



//////////////////////////////
// Animated Entrances
//////////////////////////////



    if (windowWidth > 1200) {

        $(window).scroll(function() {
                $('.animatedEntrance').each(function() {
                        var imagePos = $(this).offset().top;

                        var topOfWindow = $(window).scrollTop();
                        if (imagePos < topOfWindow + 400) {
                                        $(this).addClass("slideUp"); // slideUp, slideDown, slideLeft, slideRight, slideExpandUp, expandUp, fadeIn, expandOpen, bigEntrance, hatch
                        }
                });
        });

    }


/////////////////////////////////////
//  SCROLL TOP
/////////////////////////////////////


    if ($('body').length) {
        $(window).on('scroll', function() {
            var winH = $(window).scrollTop();

            if (winH > 500) {
                $(".scroll-top").addClass('scroll-top-view');
            } else {
                $(".scroll-top").removeClass('scroll-top-view');
            }
        });
    }


    $(document).on("click", ".scroll-top", function (event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });



/////////////////////////////////////
//  Scroll menu
/////////////////////////////////////


    $("#menu").on("click","a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),

            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1500);
    });



/////////////////////////////////////
//  Parallax
/////////////////////////////////////

    $('.jarallax').jarallax();


/////////////////////////////////////
//  Search Animation
/////////////////////////////////////


    $(document).on("click", ".btn_header_search", function (event) {
        event.preventDefault();
        $(".search-form-modal").addClass("open");
    });
    $(document).on("click", ".search-form_close", function (event) {
        event.preventDefault();
        $(".search-form-modal").removeClass("open");
    });




/////////////////////////////////////////////////////////////////
// Accordion
/////////////////////////////////////////////////////////////////

    $(".btn-collapse").on('click', function () {
            $(this).parents('.panel-group').children('.panel').removeClass('panel-default');
            $(this).parents('.panel').addClass('panel-default');
            if ($(this).is(".collapsed")) {
                $('.panel-title').removeClass('panel-passive');
            }
            else {$(this).next().toggleClass('panel-passive');
        };
    });



/////////////////////////////////////////////////////////////////
// Filter accordion
/////////////////////////////////////////////////////////////////


    $('.js-filter').on('click', function() {
            $(this).prev('.wrap-filter').slideToggle('slow')});

    $('.js-filter').on('click', function() {
            $(this).toggleClass('filter-up filter-down')});



/////////////////////////////////////
//  Tabs on hover
/////////////////////////////////////

    $('.js-tabs > li > a').hover(function() {
        $(this).tab('show');
    });






/////////////////////////////////////////////////////////////////
// Сustomization select
/////////////////////////////////////////////////////////////////

    $('.selectpicker').selectpicker();







/////////////////////////////////////
//  Tooltip
/////////////////////////////////////


    $('.link-tooltip-1').tooltip({
    template: '<div class="tooltip tooltip-1" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  });
    $('.link-tooltip-2').tooltip({
    template: '<div class="tooltip tooltip-2" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  });




/////////////////////////////////////
//  Zoom Images
/////////////////////////////////////


    $(".prettyPhoto").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000});



/////////////////////////////////////
//  Ticker
/////////////////////////////////////


    $('.newsticker').newsTicker({
    max_rows: 5,
    row_height: 30,
    speed: 600,
    direction: 'up',
    duration: 4000,
    autostart: 1,
    pauseOnHover: 0
});


////////////////////////////////////////////
// HOME SLIDER
///////////////////////////////////////////


    if ($('.my-slider').length > 0) {


            var sliderWidth = $("#my-slider-1").data("slider-width");
            var sliderHeigth = $("#my-slider-1").data("slider-height");


            $( '#my-slider-1' ).sliderPro({
                width:  sliderWidth,
                height: sliderHeigth,
                arrows: false,
                buttons: false,
                waitForLayers: true,
                fade: true,
                autoScaleLayers: false,
                autoplay: true
            });


            var sliderWidth = $("#my-slider-2").data("slider-width");
            var sliderHeigth = $("#my-slider-2").data("slider-height");

            $( '#my-slider-2' ).sliderPro({
                width:  sliderWidth,
                height: sliderHeigth,
                arrows: false,
                buttons: false,
                waitForLayers: true,
                fade: true,
                autoScaleLayers: true,
                autoplay: true
            });


            var sliderWidth = $("#my-slider-3").data("slider-width");
            var sliderHeigth = $("#my-slider-3").data("slider-height");

            $( '#my-slider-3' ).sliderPro({
                width:  sliderWidth,
                height: sliderHeigth,
                arrows: true,
                buttons: false,
                waitForLayers: true,
                fade: true,
                thumbnailArrows: true,
                autoScaleLayers: true,
                autoplay: true
            });


    }





/////////////////////////////////////////////////////////////////
// OWL Sliders
/////////////////////////////////////////////////////////////////

    var Core = {

        initialized: false,

        initialize: function() {

                if (this.initialized) return;
                this.initialized = true;

                this.build();

        },

        build: function() {

        // Owl Carousel

            this.initOwlCarousel();
        },
        initOwlCarousel: function(options) {

            $(".enable-owl-carousel").each(function(i) {
                var $owl = $(this);

                var itemsData = $owl.data('items');
                var navigationData = $owl.data('navigation');
                var paginationData = $owl.data('pagination');
                var singleItemData = $owl.data('single-item');
                var autoPlayData = $owl.data('auto-play');
                var transitionStyleData = $owl.data('transition-style');
                var mainSliderData = $owl.data('main-text-animation');
                var afterInitDelay = $owl.data('after-init-delay');
                var stopOnHoverData = $owl.data('stop-on-hover');
                var min480 = $owl.data('min480');
                var min768 = $owl.data('min768');
                var min992 = $owl.data('min992');
                var min1200 = $owl.data('min1200');

                $owl.owlCarousel({
                    navigation : navigationData,
                    pagination: paginationData,
                    singleItem : singleItemData,
                    autoPlay : autoPlayData,
                    transitionStyle : transitionStyleData,
                    stopOnHover: stopOnHoverData,
                    navigationText : ["<i></i>","<i></i>"],
                    items: itemsData,
                    itemsCustom:[
                                    [0, 1],
                                    [465, min480],
                                    [750, min768],
                                    [975, min992],
                                    [1185, min1200]
                    ],
                    afterInit: function(elem){
                                if(mainSliderData){
                                        setTimeout(function(){
                                                $('.main-slider_zoomIn').css('visibility','visible').removeClass('zoomIn').addClass('zoomIn');
                                                $('.main-slider_fadeInLeft').css('visibility','visible').removeClass('fadeInLeft').addClass('fadeInLeft');
                                                $('.main-slider_fadeInLeftBig').css('visibility','visible').removeClass('fadeInLeftBig').addClass('fadeInLeftBig');
                                                $('.main-slider_fadeInRightBig').css('visibility','visible').removeClass('fadeInRightBig').addClass('fadeInRightBig');
                                        }, afterInitDelay);
                                    }
                    },
                    beforeMove: function(elem){
                        if(mainSliderData){
                                $('.main-slider_zoomIn').css('visibility','hidden').removeClass('zoomIn');
                                $('.main-slider_slideInUp').css('visibility','hidden').removeClass('slideInUp');
                                $('.main-slider_fadeInLeft').css('visibility','hidden').removeClass('fadeInLeft');
                                $('.main-slider_fadeInRight').css('visibility','hidden').removeClass('fadeInRight');
                                $('.main-slider_fadeInLeftBig').css('visibility','hidden').removeClass('fadeInLeftBig');
                                $('.main-slider_fadeInRightBig').css('visibility','hidden').removeClass('fadeInRightBig');
                        }
                    },
                    afterMove: sliderContentAnimate,
                    afterUpdate: sliderContentAnimate,
                });
            });

            function sliderContentAnimate(elem){
                var $elem = elem;
                var afterMoveDelay = $elem.data('after-move-delay');
                var mainSliderData = $elem.data('main-text-animation');
                if(mainSliderData){
                    setTimeout(function(){
                        $('.main-slider_zoomIn').css('visibility','visible').addClass('zoomIn');
                        $('.main-slider_slideInUp').css('visibility','visible').addClass('slideInUp');
                        $('.main-slider_fadeInLeft').css('visibility','visible').addClass('fadeInLeft');
                        $('.main-slider_fadeInRight').css('visibility','visible').addClass('fadeInRight');
                        $('.main-slider_fadeInLeftBig').css('visibility','visible').addClass('fadeInLeftBig');
                        $('.main-slider_fadeInRightBig').css('visibility','visible').addClass('fadeInRightBig');
                    }, afterMoveDelay);
                }
            }
        },

    };

    Core.initialize();


});
