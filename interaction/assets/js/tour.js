$(document).ready(function() {
  "use strict";

  // Activate tour
  let localValue = localStorage.getItem('tourIndex');

  if(localValue === null && $('.p-index').length) {
    $(window).load(function() {
      $("#modalTourWelcome").modal('show');
      localStorage.setItem('tourIndex', 'check');
    })
  }


  $('[data-tour="true"]').on('click', function() {
    if ($('.elClone').length) {
      $('.elClone').remove();
    }
    let el = $(this).data('block');
    let elCoord = $(el).offset();
    let elWidth = $(el).outerWidth();
    let elClone = $(`${el}:first`).clone();
    elClone.appendTo('body').addClass('elClone').css({'position' : 'fixed', 'zIndex' : '9999', 'left': elCoord.left, 'top': elCoord.top, 'width': elWidth});

    if ($(window).width() < 1024) {
      let wrapNav = $('.b-main-header'),
          paddX = parseInt(wrapNav.css('padding-left')),
          paddTop = parseInt(wrapNav.css('padding-top')),
          paddBtm = parseInt(wrapNav.css('padding-bottom'));

      if (el === '.breadcrumb-wrap' || el === '.b-main-header__survey') {
        elClone.css({'paddingTop' : paddTop, 'paddingLeft' : paddX, 'paddingBottom': paddBtm, 'paddingRight' : paddX, 'top': elCoord.top - paddTop, 'width': elWidth + paddX * 2});
      }
      if (el === '.breadcrumb-wrap') {
        elClone.css({'left': 0});
      }
      if (el === '.b-main-header__survey') {
        elClone.css({'right': 0, 'left': 'auto'});
      }
    }
  })

  $('[data-dismiss="modal"].close, [data-tour="close"]').on('click', function() {
    if ($('.elClone').length) {
      $('.elClone').remove();
    }
  })
})
