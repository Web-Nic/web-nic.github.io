/*
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-SETTING
-Sticky Header
-Zoom Images
-POST SLIDER
-Disable  Animated
-Dropdown Menu Fade
-Animated Entrances
-SCROLL TOP
-Chars Start
-Prefooter
-ISOTOPE FILTER
-SLIDERS
-Animated WOW
*/
$(document).ready(function() {


	"use strict";


	/////////////////////////////////////////////////////////////////
	// SETTING
	/////////////////////////////////////////////////////////////////

	var windowHeight = $(window).height();
	var windowWidth = $(window).width();



	$('ul li:last-child').addClass('li-last');




	var tabletWidth = 767;
	var mobileWidth = 640;



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
	//  Zoom Images
	/////////////////////////////////////


	$("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000});



	if (windowWidth < mobileWidth) {


		/////////////////////////////////////
		//  Disable Mobile Animated
		/////////////////////////////////////


		$("body").removeClass("animated-css");


	}


	$('.animated-css .animated:not(.animation-done)').waypoint(function() {



		var animation = $(this).data('animation');

		$(this).addClass('animation-done').addClass(animation);

	}, {
		triggerOnce: true,
		offset: '90%'
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



	$('.js-scroll-top').click(function(event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 2000);
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



	/*Prefooter*/

	$('.pre-footer').click(function() {

		$('.pre-footer-content').toggle();

	});




/////////////////////////////////////////////////////////////////
// Date picker
/////////////////////////////////////////////////////////////////

$(document).ready(function() {
    $('.datetimepicker').datetimepicker({
    timepicker:false,
    format:'d/m/Y'
    });
});




////////////////////////////////////////////
// ISOTOPE FILTER
///////////////////////////////////////////




$(window).load(function() {

	var $container = $('.isotope-filter');

	$container.imagesLoaded(function() {
		$container.isotope({
			// options
			itemSelector: '.isotope-item'
		});
	});

	// filter items when filter link is clicked
	$('#filter  a').click(function() {
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		return false;
	});

});



/////////////////////////////////////////////////////////////////
// Accordion
/////////////////////////////////////////////////////////////////

$(document).ready(function() {

	$('.btn-collapse').click(function(){
		$('.panel').removeClass('panel-default');
		$(this).parents('.panel').addClass('panel-default');
	});

});



});


/////////////////////////////////////////////////////////////////
// Sliders
/////////////////////////////////////////////////////////////////
(function() {

	"use strict";

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
				var min600 = $owl.data('min600');
				var min800 = $owl.data('min800');
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
						[600, min600],
						[800, min800],
						[1200, min1200]
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

})();


/////////////////////////////////////////////////////////////////
// Animated WOW
/////////////////////////////////////////////////////////////////
new WOW().init();
