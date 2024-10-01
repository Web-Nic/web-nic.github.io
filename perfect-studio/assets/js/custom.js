$(document).ready(function() {

    "use strict";


// Preloader

    let $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(50).fadeOut('slow');



// Menu activation

  $('.navbar-toggler').on( 'click', function() {
    $('.header').toggleClass('active');
  });


// Card clients activation

  $('.b-clients__trigger').on( 'click', function() {
    $(this).parents('.b-clients').toggleClass('active');
  });



// Slider contacts

  $('.js-contacts-trigger').on("click", function(){

      if(!$(this).parents('.footer-contacts__item').hasClass('active')){
        $('.js-slider-contacts').toggleClass('active');
      }

  });

  $('.js-contacts-arr').on("click", function(){
      $('.js-slider-contacts').toggleClass('active');
  });



// Select customization

  if ($('.selectpicker').length) {
    $('.selectpicker').selectpicker();
  }



// Main slider

  if ($('#main-slider').length) {

      let sliderWidth = $("#main-slider").data("slider-width");
      let sliderHeigth = $("#main-slider").data("slider-height");
      let sliderArrows = $("#main-slider").data("slider-arrows");
      let sliderButtons = $("#main-slider").data("slider-buttons");

       $('#main-slider').each(function(index, element) {

        $(this).sliderPro({
            width:  sliderWidth,
            height: sliderHeigth,
            arrows: sliderArrows,
            buttons: sliderButtons,
            fade: true,
            fullScreen: true,
            touchSwipe: false,
            autoplay: false,
            getTotalSlides: true
        });

      let slider = $(this).data('sliderPro');

      $(this).append('<div class="slider-counter"><span class="slider-counter__item active text-primary">' + (parseInt(slider.getSelectedSlide()) + 1) +
    '</span>' + '<span class="slider-counter__item">' + slider.getTotalSlides() + '</span></div>');

      slider.on('gotoSlide', function(event) {
        $(this).find('.slider-counter .active').text(event.index + 1);
      });

    });

  }


// Sliders

  if ($('.js-slider').length) {
    $('.js-slider').slick();
  }


// Mask input

  if ($('input[type=tel]').length) {
    $("input[type=tel]").mask("+1 (999) 999 99 99");
  };


// Form order

  $('.js-stages-trigger').on("click", function(){
    $(this).parents('.js-stages-section').removeClass('active');
    $(this).parents('.js-stages-section').next().addClass('active');
  });



//  File input customization

    // Browser supports HTML5 multiple file?
    let multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

      return this.each(function() {

        let $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
            $wrap = $('<div class="file-upload-wrapper">'),
            $input = $('<input type="text" class="file-upload-input form-control"  placeholder="До 5 мб."  required />'),
            // Button that will be used in non-IE browsers
            $button = $('<button type="button" class="file-upload-button"><span class="ic"><svg width="22" height="24"><use xlink:href="../svg-symbols.svg#clip"></use></svg></span></button>'),
            // Hack for IE
            $label = $('<label class="file-upload-button" for="'+ $file[0].id +'"><svg class="ic" width="22" height="24"><use xlink:href="../svg-symbols.svg#clip"></use></svg></button></label>');

        // Hide by shifting to the left so we
        // can still trigger events
        $file.css({
          position: 'absolute',
          left: '-9999px'
        });

        $wrap.insertAfter( $file )
          .append( $file, $input, ( isIE ? $label : $button ) );

        // Prevent focus
        $file.attr('tabIndex', -1);
        $button.attr('tabIndex', -1);

        $button.click(function () {
          $file.focus().click(); // Open dialog
        });

        $file.change(function() {

          let files = [], fileArr, filename;

          // If multiple is supported then extract
          // all filenames from the file array
          if ( multipleSupport ) {
            fileArr = $file[0].files;
            for ( let i = 0, len = fileArr.length; i < len; i++ ) {
              files.push( fileArr[i].name );
            }
            filename = files.join(', ');

          // If not supported then just take the value
          // and remove the path to just show the filename
          } else {
            filename = $file.val().split('\\').pop();
          }

          $input.val( filename ) // Set the value
            .attr('title', filename) // Show filename in title tootlip
            .focus(); // Regain focus

        });

        $input.on({
          blur: function() { $file.trigger('blur'); },
          keydown: function( e ) {
            if ( e.which === 13 ) { // Enter
              if ( !isIE ) { $file.trigger('click'); }
            } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
              // On some browsers the value is read-only
              // with this trick we remove the old input and add
              // a clean clone with all the original events attached
              $file.replaceWith( $file = $file.clone( true ) );
              $file.trigger('change');
              $input.val('');
            } else if ( e.which === 9 ){ // TAB
              return;
            } else { // All other keys
              return false;
            }
          }
        });

      });

    };

  $('input[type=file]').customFile();


  // Test of displaying a message about sending an application

  $('.ui-form__submit').on('click', function() {
    $('.b-stages').fadeOut(300);
    $('.b-stages-success').fadeIn(300);
  })

});


// FORM VALIDATION

window.addEventListener('load', function() {
  let forms = document.getElementsByClassName('needs-validation');
  let validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);


// Lazy background

document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
