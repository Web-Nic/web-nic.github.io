(function($) {

	"use strict";

/* ==========================================================================
   ieViewportFix - fixes viewport problem in IE 10 SnapMode and IE Mobile 10
   ========================================================================== */

	function ieViewportFix() {

		var msViewportStyle = document.createElement("style");

		msViewportStyle.appendChild(
			document.createTextNode(
				"@-ms-viewport { width: device-width; }"
			)
		);

		if (navigator.userAgent.match(/IEMobile\/10\.0/)) {

			msViewportStyle.appendChild(
				document.createTextNode(
					"@-ms-viewport { width: auto !important; }"
				)
			);
		}

		document.getElementsByTagName("head")[0].
				appendChild(msViewportStyle);

	}

/* ==========================================================================
   exists - Check if an element exists
   ========================================================================== */

	function exists(e) {
		return $(e).length > 0;
	}

/* ==========================================================================
   isTouchDevice - return true if it is a touch device
   ========================================================================== */

	function isTouchDevice() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}



/* ==========================================================================
   handleMobileMenu
   ========================================================================== */

	var MOBILEBREAKPOINT = 979;

	function handleMobileMenu() {

		if ($(window).width() > MOBILEBREAKPOINT) {

			$("#mobile-menu").hide();
			$("#mobile-menu-trigger").removeClass("mobile-menu-opened").addClass("mobile-menu-closed");

		} else {

			if (!exists("#mobile-menu")) {

				$("#menu").clone().attr({
					id: "mobile-menu",
					"class": "fixed"
				}).insertAfter("#nav-wrap");

				$("#mobile-menu > li > a, #mobile-menu > li > ul > li > a").each(function() {
					var $t = $(this);
					if ($t.next().hasClass('sub-menu') || $t.next().is('ul') || $t.next().is('.sf-mega')) {
						$t.append('<span class="ic-mob-down mobile-menu-submenu-arrow mobile-menu-submenu-closed"></span>');
					}
				});

				$(".mobile-menu-submenu-arrow").click(function(event) {
					var $t = $(this);
					if ($t.hasClass("mobile-menu-submenu-closed")) {
						$t.parent().siblings("ul").slideDown(300);
						$t.parent().siblings(".sf-mega").slideDown(300);
						$t.removeClass("mobile-menu-submenu-closed ic-mob-down").addClass("mobile-menu-submenu-opened ic-mob-up");
					} else {
						$t.parent().siblings("ul").slideUp(300);
						$t.parent().siblings(".sf-mega").slideUp(300);
						$t.removeClass("mobile-menu-submenu-opened ic-mob-up").addClass("mobile-menu-submenu-closed ic-mob-down");
					}
					event.preventDefault();
				});

				$("#mobile-menu li, #mobile-menu li a, #mobile-menu ul").attr("style", "");

			}

		}

	}

/* ==========================================================================
   showHideMobileMenu
   ========================================================================== */

	function showHideMobileMenu() {

		$("#mobile-menu-trigger").click(function(event) {

			var $t = $(this),
				$n = $("#mobile-menu");

			if ($t.hasClass("mobile-menu-opened")) {
				$t.removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
				$n.slideUp(300);
			} else {
				$t.removeClass("mobile-menu-closed").addClass("mobile-menu-opened");
				$n.slideDown(300);
			}
			event.preventDefault();

		});

	}

/* ==========================================================================
   handleAccordionsAndToogles
   ========================================================================== */

   function handleAccordionsAndToogles() {

		// accordion

		$(".accordion .accordion-item").click(function(e) {
			e.preventDefault();
			if($(this).next("div").is(":visible")){
				$(this).removeClass('active').next("div").slideUp("slow");
			} else {
				$('.accordion .accordion-item').removeClass('active');
				$(".accordion .accordion-item-content").slideUp("slow");
				$(this).addClass('active').next("div").slideToggle("slow");
			}
		});

		$(".accordion .accordion-item:eq(0)").trigger('click').addClass('active');

		// toggle

		$(".toggle .toggle-item").click(function(e) {
			e.preventDefault();
			$(this).toggleClass('active').next("div").slideToggle("slow");
		});

		$(".toggle .toggle-item:eq(0)").trigger('click').addClass('active');

   }





/* ==========================================================================
   When document is ready, do
   ========================================================================== */

	$(document).ready(function() {

		ieViewportFix();

		handleMobileMenu();
		showHideMobileMenu();

		handleAccordionsAndToogles();

	});



/* ==========================================================================
   When the window is resized, do
   ========================================================================== */

	$(window).resize(function() {

		handleMobileMenu();

	});


})(window.jQuery);

// non jQuery scripts below
