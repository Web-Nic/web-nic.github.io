$(document).ready(function() {
    "use strict";
    if ($('.js-slider').length > 0) {
        $('.js-slider').slick({
            arrows: true
        });
    }
    if ($('.slider-for').length > 0) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }]
        });
    }
    if ($('.slider-objects-for').length > 0) {
        $('.slider-objects-for').each(function(key, item) {
            var sliderIdName = 'slider' + key;
            var sliderNavIdName = 'sliderNav' + key;
            this.id = sliderIdName;
            $('.slider-objects-nav')[key].id = sliderNavIdName;
            var sliderId = '#' + sliderIdName;
            var sliderNavId = '#' + sliderNavIdName;
            $(sliderId).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: sliderNavId
            });
            $(sliderNavId).slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: sliderId,
                dots: false,
                arrows: true,
                centerMode: false,
                adaptiveHeight: true,
                focusOnSelect: true,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        centerMode: true
                    },
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            });
        });
    }
    if ($('.popup-with-zoom-anim').length > 0) {
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
    }
    if ($('.js-zoom-images').length > 0) {
        $('.js-zoom-images').magnificPopup({
            type: 'image',
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    }
});
