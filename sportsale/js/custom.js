
$(document).ready(function() {

    "use strict";


/////////////////////////////////////
//  Carousels
/////////////////////////////////////


  if ($('.slider-for').length > 0) {
      $('.slider-for').each(function(key, item) {
          var sliderIdName = 'slider' + key;
          var sliderNavIdName = 'sliderNav' + key;
          var sliderNavArr = 'sliderNavArr' + key;
          this.id = sliderIdName;
          $('.slider-nav')[key].id = sliderNavIdName;
          var sliderId = '#' + sliderIdName;
          var sliderNavId = '#' + sliderNavIdName;
          var sliderNavArr = '#' + sliderNavArr;
          $(sliderId).slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              fade: true,
              arrows: false,
              asNavFor: sliderNavId
          });
          $(sliderNavId).slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              focusOnSelect: true,
              autoplay: false,
              vertical: true,
              arrows: true,
              asNavFor: sliderId,
              appendArrows: sliderNavArr,
              responsive: [{
                  breakpoint: 992,
                  settings: {
                    vertical: false
                  },
              }]
          });
      });
  }

/////////////////////////////////////////////////////////////////
//Fixed navigation
/////////////////////////////////////////////////////////////////
      var fromTop = 0;
      $(window).on('scroll', function (event){
         var st = $(this).scrollTop();
         if (st > fromTop){
           $('.header').removeClass('fixed');
         } else {
           $('.header').addClass('fixed');
         }
         fromTop = st;
      });

/////////////////////////////////////////////////////////////////
// Mask input
/////////////////////////////////////////////////////////////////

  $("input[type=tel]").mask("+38 (999) 999 99 99");

/////////////////////////////////////////////////////////////////
//COUNTDOWN
/////////////////////////////////////////////////////////////////


  if ($('.js-countdown').length > 0) {

    $.countdown.regionalOptions.ru = {
      labels: ['Лет','Месяцев','Недель','дней','часов','минут','секунд'],
      labels1: ['Год','Месяц','Неделя','день','час','минута','секунда'],
      labels2: ['Года','Месяца','Недели','дня','часа','минуты','секунды'],
      compactLabels: ['л','м','н','д'],
      compactLabels1: ['г','м','н','д'],
      whichLabels: function(amount) {
        var units = amount % 10;
        var tens = Math.floor((amount % 100) / 10);
        return (amount === 1 ? 1 : (units >= 2 && units <= 4 && tens !== 1 ? 2 :
          (units === 1 && tens !== 1 ? 1 : 0)));
      },
      digits: ['0','1','2','3','4','5','6','7','8','9'],
      timeSeparator: ':',
      isRTL: false
    };
    $.countdown.setDefaults($.countdown.regionalOptions.ru);

    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes() * 60;
    var hours = date.getHours() * 3600;
    var now = seconds + minutes + hours;
    var time = 86400 - now;

    $('.js-countdown').countdown({until: time, format: 'DHMS'});
  }

/////////////////////////////////////////////////////////////////
//Smooth navigation
/////////////////////////////////////////////////////////////////
  $(".js-nav").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
      top = $(id).offset().top;

    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  });


/////////////////////////////////////////////////////////////////
//Form validate
/////////////////////////////////////////////////////////////////

  $('.js_validate [type="submit"]').on("click", function(){
      return validate($(this).parents(".js_validate"));
  });

  function validate(form){
      var error_class = "has-error";
      var norma_class = "has-success";
      var item        = form.find("[required]");
      var e           = 0;
      var reg         = undefined;
      var pass        = form.find('.password').val();
      var pass_1      = form.find('.password_1').val();
      function mark (object, expression) {
          if (expression) {
              object.parent('div').addClass(error_class).removeClass(norma_class);
              e++;
          } else
              object.parent('div').addClass(norma_class).removeClass(error_class);
      }
      form.find("[required]").each(function(){
          switch($(this).attr("data-validate")) {
              case undefined:
                  mark ($(this), $.trim($(this).val()).length === 0);
              break;
              case "email":
                  reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                  mark ($(this), !reg.test($.trim($(this).val())));
              break;
              case "phone":
                  reg = /[0-9 -()+]{10}$/;
                  mark ($(this), !reg.test($.trim($(this).val())));
              break;
              case "pass":
                  reg = /^[a-zA-Z0-9_-]+$/;
                  mark ($(this), !reg.test($.trim($(this).val())));
              break;
              case "pass1":
                  mark ($(this), (pass_1 !== pass || $.trim($(this).val()).length === 0));
              break;
              default:
                  reg = new RegExp($(this).attr("data-validate"), "g");
                  mark ($(this), !reg.test($.trim($(this).val())));
              break
          }
      })
      $('.js_valid_radio').each(function(){
       var inp = $(this).find('input.required');
          var rezalt = 0;
          for (var i = 0; i < inp.length; i++) {

           if ($(inp[i]).is(':checked') === true) {
            rezalt = 1;
            break;
           } else {
            rezalt = 0;
           }
          };
          if (rezalt === 0) {
              $(this).addClass(error_class).removeClass(norma_class);
              e==1;
          } else {
              $(this).addClass(norma_class).removeClass(error_class);
          }
      })
      if (e == 0) {
       return true;
      }
      else {
          form.find("."+error_class+" input:first").focus();
          return false;
      }
  }



/////////////////////////////////////
//  Scroll Animation
/////////////////////////////////////


if ($('.scrollreveal').length > 0) {
    window.sr = ScrollReveal({
        reset:true,
        duration: 1000,
        delay: 200
    });

    sr.reveal('.scrollreveal');
  }



  //////////////////////////////
  // Parallax(Stellar)
  //////////////////////////////

  if ($('.stellar').length > 0) {
      $.stellar({
          responsive: true
      });
  }
});
