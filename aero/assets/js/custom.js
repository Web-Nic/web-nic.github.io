/*
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-Function for mobile
-Preloader
-Datepicker
-Modal warning activate
-Scale images
-Select customization
-Sliders
-Mask input
-FORM VALIDATION
-Input effects
*/



$(document).ready(function() {

    "use strict";


// Function for mobile
  let isMobile = /Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent);

  $('.header-top__btn_search').click(function() {
    let href = $(this).data('href');
    if(href) {
      window.location.href = href;
    }
  });

// Toggle TABS
  $(".js-togglemenu").click(function(){
    let menu = $(".js-togglemenu");
    let tabs = $(".js-togglemenu-tab");
    let tab = $(this).data("tab");

    menu.removeClass('active');
    $(this).addClass('active');

    tabs.removeClass('hidden');
    if(typeof tab !== 'undefined'){
      tabs.addClass('hidden');
      $(tab).removeClass('hidden');
    }

    return false;
  });


// Preloader

    let $preloader = $('#page-preloader'),
    $spinner   = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(50).fadeOut('slow');


// Animation

    if ($(window).width() > 767) {
        let topOffset = $(window).scrollTop();
        if (topOffset > 0) {
            $('.js-animation').addClass('active');
        } else {
         $('.js-animation').removeClass('active');
       }
        $(window).on('scroll', function () {
            let fromTop = $(this).scrollTop();
            if (fromTop > 0) {
                $('.js-animation').addClass('active');
            } else {
               $('.js-animation').removeClass('active');
             }

        });
    }

// Datepicker

  if ($('.js-date').length) {
    $('.js-date').datepicker({
      language: "en",
      todayHighlight: true,
      autoclose: true
    });
  }

  if ($('.js-date-group').length) {
    $('.js-date-group').datepicker({
      language: "en",
      todayHighlight: true,
      autoclose: true
    });
  }




// Clear value

  $('.js-input-clear').on('click', function() {
     $(this).prev().val("");
     $(this).parent('.ui-input').removeClass('ui-input_filled');
  })


// Schedule

  if ($(window).width() < 768) {
    $('.b-schedule-sort__list').addClass('collapse')
  }


// Modal warning

  let modalWarning = localStorage.getItem('warning');

  if(modalWarning === null) {
    $(window).load(function() {
      $("#modalWarning").modal('show');
    })
  }

  localStorage.setItem('warning', 'check');

// Modal swipe

  let modalSwipe = localStorage.getItem('swipe');

  if ($(window).width() < 1200) {
    if (modalSwipe === null) {
      $(window).load(function() {
        $("#modalSwipe").modal('show');
      });
    }
    localStorage.setItem('swipe', 'check');
  }


// Select customization

  if ($('.js-select').length) {
    $('.js-select').selectpicker();
  }


// Search mobile placeholder
  if ($(window).width() < 768) {
    $('.js-search-mobile').attr("placeholder", "Поиск");
   }


// Sliders

  if ($('[data-slick]').length) {
    $('[data-slick]').slick();
  }


// Mask input

  if ($('input[type=tel]').length) {
    $("input[type=tel]").mask("+1 (999) 999-99-99");
  };

// Footer search

  if ($(window).width() > 991) {
    $('.js-footer-search').on('focus', function() {
      $('.footer-search').addClass('active');
    });
    $('.js-footer-search__close').on('click', function() {
      $('.footer-search').removeClass('active');
    });
  }


});


// FORM VALIDATION

window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
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



// Input effects
  $(document).ready(function() {
    if (!String.prototype.trim) {
        (function() {
            let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

      [].slice.call( document.querySelectorAll( '.ui-input__field' ) ).forEach( function( inputEl ) {
          if( inputEl.value.trim() !== '' ) {
            $(inputEl.parentNode).addClass('ui-input_filled');
              //classie.add( inputEl.parentNode, 'ui-input_filled' );
          }
          inputEl.addEventListener( 'focus', onInputFocus );
          inputEl.addEventListener( 'blur', onInputBlur );
      } );

      function onInputFocus( ev ) {
        $(ev.target.parentNode).addClass('ui-input_filled');
      }

      function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
          $(ev.target.parentNode).removeClass('ui-input_filled');
        }
      }
  });

