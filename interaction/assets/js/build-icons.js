$(document).ready(function() {
  "use strict";
  
  function buildIcons(typeIcons, numberIcons) {
    let resultsBlock = $('.b-frame-icons__list');
    let elemIcon = `<li class="b-frame-icons__item"><img src="assets/img/general/ic/${typeIcons}.png"></li>`;
    resultsBlock.children().remove();

    switch(typeIcons) {
      case 'like':
        resultsBlock.append(`
          <li class="b-frame-icons__item b-frame-icons__item_like"><img src="assets/img/general/ic/dislike.png"></li>
          <li class="b-frame-icons__item b-frame-icons__item_like"><img src="assets/img/general/ic/like.png"></li>`);
        break;
      case 'smileys':
        resultsBlock.append(`<li class="b-frame-icons__item"><svg class="ic ic-smile ic-smile-1" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-1"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm b-frame-icons__item_md d-none"><svg class="ic ic-smile ic-smile-2" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-1"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm"><svg class="ic ic-smile ic-smile-3" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-1"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm b-frame-icons__item_md d-none"><svg class="ic ic-smile ic-smile-4" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-1"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm b-frame-icons__item_md d-none"><svg class="ic ic-smile ic-smile-5" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-1"></use></svg></li>
        <li class="b-frame-icons__item"><svg class="ic ic-smile ic-smile-6" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-2"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm b-frame-icons__item_md d-none"><svg class="ic ic-smile ic-smile-7" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-2"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm"><svg class="ic ic-smile ic-smile-8" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-2"></use></svg></li>
        <li class="b-frame-icons__item b-frame-icons__item_sm b-frame-icons__item_md d-none"><svg class="ic ic-smile ic-smile-9" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-3"></use></svg></li>
        <li class="b-frame-icons__item"><svg class="ic ic-smile ic-smile-10" width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#ic-smile-4"></use></svg></li>`);
        break;

      case 'counter':
        for (let i = 0; i < numberIcons; i++) {
          resultsBlock.append(`<li class="b-frame-icons__item b-frame-icons__item_count"><svg class="ic " width="40px" height="40px"><use xlink:href="assets/img/svg-symbols.svg#circle"></use></svg></li>`);
        }
        break;

      default:
        for (let i = 0; i < numberIcons; i++) {
          resultsBlock.append(elemIcon);
        }
    }
  }


  $(window).load(function() {
    if($('.b-frame_settings, .js-wrap-icons').length) {
      let numberIcons = $('.b-control-icons__btns .nav-link.active').attr('data-value');
      let typeIcons = $('.b-control-icons__btn.active').attr('data-icons-type');
      buildIcons(typeIcons, numberIcons);
    }
  });


  function toggleDefaultQuantity(number) {
  // If when switching the type of icons, there is no active quantity option, then switch to the default value
    $('.b-control-icons__btns .nav-link.active').removeClass('active');
    $('.b-control-icons__btns .nav-link').attr('data-value', function(ind, attr) {
      if (attr === number) {
        $(this).addClass('active')
      }
    });
  }

  $('.b-control-icons__btn').on('click', function() {
    let typeIcons = $(this).attr('data-icons-type');
    let numberIcons = $('.b-control-icons__btns .nav-link.active').attr('data-value');
    let btnsNumber = $('.b-control-icons__btns .nav-link');
    $('.b-control-icons__btn').removeClass('active');
    $('.b-frame-icons__item').removeClass('d-none');

    if (typeIcons === 'like') {
      $('.b-control-icons__btns .nav-link').addClass('d-none');
      $('.b-frame-icons__labels').addClass('d-none');
    }
    else if (typeIcons === 'smileys') {
      btnsNumber.removeClass('d-none');
      btnsNumber.each(function() {
        if ($(this).attr('data-value') === '7') {
          $(this).addClass('d-none');
          toggleDefaultQuantity('5');
        }
      });
      $('.b-frame-icons__labels').removeClass('d-none');
    } else {
      if (numberIcons === '3') {
        numberIcons = '5';
        toggleDefaultQuantity('5')
      }
      btnsNumber.removeClass('d-none');
      btnsNumber.each(function() {
        if ($(this).attr('data-value') === '3') {
          $(this).addClass('d-none');
        }
      });
      $('.b-frame-icons__item_sm').removeClass('d-none');
      $('.b-frame-icons__item_md').removeClass('d-none');
      $('.b-frame-icons__item_lg').removeClass('d-none');
      $('.b-frame-icons__labels').removeClass('d-none');
    }

    buildIcons(typeIcons, numberIcons);
  });



  $('.b-control-icons__btns .nav-link').on('click', function() {
    let typeIcons = $('.b-control-icons__btn.active').attr('data-icons-type');
    let numberIcons = $(this).attr('data-value');
    $('.b-control-icons__btns .nav-link').removeClass('active');
    $(`[data-value=${numberIcons}]`).addClass('active');
    buildIcons(typeIcons, numberIcons);
    if(typeIcons === 'smileys' && numberIcons == "3") {
      $('.b-frame-icons__item_sm').addClass('d-none');
    }
    if(typeIcons === 'smileys' && numberIcons == "10") {
      $('.b-frame-icons__item_md').removeClass('d-none');
      $('.b-frame-icons__item_lg').addClass('d-none');
    }
  });

  if($('.js-place-control-icons').length) {
    $('.b-control-sidebar .b-control-icons').clone(true, true).appendTo('.js-place-control-icons');
  }

  $('.b-control-sidebar .b-control-icons').clone(true, true).appendTo('.b-frame-icons__collapse');


})
