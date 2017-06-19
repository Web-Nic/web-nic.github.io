$(document).ready(function() {

    "use strict";


////////////////////////////////////////////
// ISOTOPE FILTER
///////////////////////////////////////////


  if ($('.b-isotope').length > 0) {

    var $container = $('.b-isotope-grid');

    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.grid-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress( function() {
      $grid.isotope('layout');
    });

    $grid.isotope({ filter: '.vip:not(.transition)' });

    // filter items when filter link is clicked
    $('.b-isotope-filter a').on( 'click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });

    $('.b-isotope-filter a').on( 'click', function() {
      $('.b-isotope-filter').find('.current').removeClass('current');
      $( this ).parent().addClass('current');
    });
  }

// PRELOADER //

    var $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(50).fadeOut('slow');

});



////////////////////////////////////////////
// Image animation
///////////////////////////////////////////

(function() {
  var tiltSettings = [
  {},
  {
    movement: {
      imgWrapper : {
        translation : {x: 10, y: 10, z: 30},
        rotation : {x: 0, y: -10, z: 0},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      },
      lines : {
        translation : {x: 10, y: 10, z: [0,70]},
        rotation : {x: 0, y: 0, z: -2},
        reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
      },
      caption : {
        rotation : {x: 0, y: 0, z: 2},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      },
      overlay : {
        translation : {x: 10, y: -10, z: 0},
        rotation : {x: 0, y: 0, z: 2},
        reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
      },
      shine : {
        translation : {x: 100, y: 100, z: 0},
        reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
      }
    }
  }];

  function init() {
    var idx = 0;
    [].slice.call(document.querySelectorAll('a.tilter')).forEach(function(el, pos) {
      idx = pos%2 === 0 ? idx+1 : idx;
      new TiltFx(el, tiltSettings[idx-1]);
    });
  }

  // Preload all images.
  imagesLoaded(document.querySelector('body'), function() {
    document.body.classList.remove('loading');
    init();
  });

})();
