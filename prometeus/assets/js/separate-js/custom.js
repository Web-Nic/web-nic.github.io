/*
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-SETTING
-Preloader
-Sticky Header
-Dropdown Menu Fade
-Menu Android
-Sidebar menu
-Search Animation
-Disable Mobile Animated
-Animated Entrances
-Scroll top
-Accordion
-Filter accordion
-Tooltips
-Calendar
-Loader blocks
-Chars Start
-Сustomization select
-Enumerator
-Date picker
-Zoom Images
-ISOTOPE FILTER
-HOME SLIDER
-CAROUSEL PRODUCTS
-PRICE RANGE
-Input effects
-OWL Sliders
-Animated WOW
-Chart
-Map
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




    // Transition delay
    $('.yamm .nav a').click(function(e) {
        e.preventDefault();
        var goTo = this.getAttribute("href");
        setTimeout(function() {
            window.location = goTo;
        }, 500);
    });




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




/////////////////////////////////////////////////////////////////
//   Dropdown Menu Fade
/////////////////////////////////////////////////////////////////


    $(".yamm .dropdown").hover(
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


/////////////////////////////////////////////////////////////////
//   Sidebar menu
/////////////////////////////////////////////////////////////////


                    var mySlidebars = new $.slidebars(); // Create new instance of Slidebars

                    // Event handler
                    function eventHandler(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    }


                    // Close
                    $('.close').on('click', function(e) {
                        eventHandler(e);
                        mySlidebars.slidebars.close();
                    });



/////////////////////////////////////
//  Search Animation
/////////////////////////////////////


    $('.search-open, .search-close').on('click', function(e) {
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

    $('.scroll-top').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });



    $('.scroll-down').on('click', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: 10000
        }, 3000);
    });


/////////////////////////////////////
//  Scroll block
/////////////////////////////////////


    $(".js-scroll").on("click", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),

            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1500);
    });



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
//  Tooltip
/////////////////////////////////////


    $('.link-tooltip-1').tooltip({
    template: '<div class="tooltip tooltip-1" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  });
    $('.link-tooltip-2').tooltip({
    template: '<div class="tooltip tooltip-2" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  });



/////////////////////////////////////
//  Loader blocks
/////////////////////////////////////


    $( ".scroll-next" ).on( "click", function() {

        var hiddenContent =  $( ".scroll-next + .scroll-blocks") ;

        $( ".scroll-next").hide() ;
        hiddenContent.show() ;
        hiddenContent.addClass("animated");
        hiddenContent.addClass("animation-done");
        hiddenContent.addClass("bounceInUp");

    });


/////////////////////////////////////
//  Chars Start
/////////////////////////////////////

    if ($('body').length) {
            $(window).on('scroll', function() {
                    var winH = $(window).scrollTop();

                    $('.list-progress').waypoint(function() {
                            $('.chart').each(function() {
                                    CharsStart();
                            });
                    }, {
                            offset: '80%'
                    });
            });
    }


        function CharsStart() {
            $('.chart').easyPieChart({
                    barColor: false,
                    trackColor: false,
                    scaleColor: false,
                    scaleLength: false,
                    lineCap: false,
                    lineWidth: false,
                    size: false,
                    animate: 7000,

                    onStep: function(from, to, percent) {
                            $(this.el).find('.percent').text(Math.round(percent));
                    }
            });

        }



/////////////////////////////////////////////////////////////////
// Сustomization select
/////////////////////////////////////////////////////////////////

    $('.selectpicker').selectpicker();









/////////////////////////////////////////////////////////////////
// Date picker
/////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $('.datetimepicker').datetimepicker({
    startDate:'2015/01/01'
    });
});



/////////////////////////////////////
//  Zoom Images
/////////////////////////////////////


    $(".prettyPhoto").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000});



////////////////////////////////////////////
// ISOTOPE FILTER
///////////////////////////////////////////


 $('.grid').isotope({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    // use element for option
    columnWidth: '.grid-sizer'
  }
})



    var $container = $('.isotope');

    // filter items when filter link is clicked
    $('.isotope-button').click(function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });




////////////////////////////////////////////
// HOME SLIDER
///////////////////////////////////////////



    if ($('#my-slider').length > 0) {


            var sliderWidth = $("#my-slider").data("slider-width");
            var sliderHeigth = $("#my-slider").data("slider-height");

            $( '#my-slider' ).sliderPro({
            width:  sliderWidth,
            height: sliderHeigth,
            fade: true,
            loop: false,
            arrows: true,
            touchSwipe: false,
            buttons: false,
            autoplay: true,
            autoScaleLayers: false,
            thumbnailHeight: 40,
            thumbnailWidth: 40,
            thumbnailPointer: false,
            thumbnailsPosition: 'right',
            thumbnailTouchSwipe: true,
            breakpoints: {
                500: {
                    thumbnailWidth: 30,
                    thumbnailHeight: 30
                }
            }
        });
    }


////////////////////////////////////////////
// CAROUSEL PRODUCTS
///////////////////////////////////////////



    if ($('#slider-product').length > 0) {

        // The slider being synced must be initialized first
        $('#carousel-product').flexslider({
            animation: "slide",
            controlNav: false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            maxItems: 6,
            itemWidth: 50,
            itemMargin: 0,
            asNavFor: '#slider-product'
        });

        $('#slider-product').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            sync: "#carousel-product"
        });
    }







/////////////////////////////////////////////////////////////////
// Input effects
/////////////////////////////////////////////////////////////////

    (function() {
            // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
            if (!String.prototype.trim) {
                (function() {
                    // Make sure we trim BOM and NBSP
                    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                    String.prototype.trim = function() {
                        return this.replace(rtrim, '');
                    };
                })();
            }

            [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
                // in case the input is already filled..
                if( inputEl.value.trim() !== '' ) {
                    classie.add( inputEl.parentNode, 'input--filled' );
                }

                // events:
                inputEl.addEventListener( 'focus', onInputFocus );
                inputEl.addEventListener( 'blur', onInputBlur );
            } );

            function onInputFocus( ev ) {
                classie.add( ev.target.parentNode, 'input--filled' );
            }

            function onInputBlur( ev ) {
                if( ev.target.value.trim() === '' ) {
                    classie.remove( ev.target.parentNode, 'input--filled' );
                }
            }
        })();


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



/////////////////////////////////////////////////////////////////
// Chart
/////////////////////////////////////////////////////////////////
var pieData = [
        {
            value: 30,
            color:"#fec015",
            highlight: "#fec015",
            label: "label 01"
        },
        {
            value: 25,
            color: "#feac17",
            highlight: "#feac17",
            label: "label 02"
        },
        {
            value: 20,
            color: "#fe8c19",
            highlight: "#fe8c19",
            label: "label 03"
        },
        {
            value: 15,
            color: "#ff671c",
            highlight: "#ff671c",
            label: "label 04"
        },
        {
            value: 10,
            color: "#ff521d",
            highlight: "#ff521d",
            label: "label 05"
        }

    ];


    var randomScalingFactor = function(){ return Math.round(Math.random()*400)};
    var lineChartData = {
      labels : ["","","","",""],
      datasets : [
        {
          label: "My First dataset",
          fillColor : "#feac17",
          strokeColor : "rgba(220,220,220,1)",
          pointColor : "rgba(220,220,220,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(220,220,220,1)",
          data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        },
        {
          label: "My Second dataset",
          fillColor : "#ff521d",
          strokeColor : "rgba(151,187,205,1)",
          pointColor : "rgba(151,187,205,1)",
          pointStrokeColor : "#fff",
          pointHighlightFill : "#fff",
          pointHighlightStroke : "rgba(151,187,205,1)",
          data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
        }
      ]

    };


	 if ($('#canvas').length > 0) {

  window.onload = function(){
    var ctx2 = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx2).Line(lineChartData, {
      responsive: true,
      scaleShowVerticalLines: false
    });
  };

	 }



     if ($('#chart-area').length > 0) {
    window.onload = function(){
        var ctx = document.getElementById("chart-area").getContext("2d");
        window.myPie = new Chart(ctx).Pie(pieData);
    };
}



/////////////////////////////////////////////////////////////////
// Map
/////////////////////////////////////////////////////////////////


 if ($('.section-contacts').length > 0) {

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            scrollwheel: false,

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        // Let's also add a marker while we're at it
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(40.6700, -73.9400),
            map: map,
            title: 'Snazzy!'
        });
    }


	   }
