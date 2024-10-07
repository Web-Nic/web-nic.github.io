$(document).ready(function() {
    "use strict";

  // Button scroll up
  $('[data-wrap-scroll]').on('scroll', function () {
    let topScroll = $(this).scrollTop();
    if (topScroll > 200) {
        $('[data-scroll-up]').addClass('show');
    } else {
       $('[data-scroll-up]').removeClass('show');
     }
  });

  $('[data-scroll-up]').on( 'click', function() {
    $('[data-wrap-scroll]').animate( {scrollTop: 0}, 800 );
  });


  // Page with sticky header
  function stickyHeader() {
    let body = $('[data-sticky-header="body"]'),
        header = $('[data-sticky-header="header"]'),
        headerHeight = header.css('height');

    if ($(window).width() < 1024) {
      body.css('height', `auto`);
    } else {
      body.css('height', `calc(100vh - ${headerHeight})`);
    }


  }

  if ($('[data-sticky-header]').length && $(window).width() > 1023) {
    stickyHeader();
  }

  if ($('[data-sticky-header]').length) {
    $(window).resize(function() {
      setTimeout (stickyHeader, 50);
    })

  }


  // Fixed sidebar
  $('[data-sidebar-btn]').on('click', function() {
    // $('.b-sidebar-nav__link').collapse('hide');
    $('[data-sidebar-btn]').toggleClass('fixed');
    $('.l-page').toggleClass('fixed-nav');
    $('.b-sidebar').toggleClass('fixed');
    resetBlocksHeight();
    alignBlocksHeight();

    setTimeout (() => {stickyHeader()}, 0);
  })


  // Select customization
  if ($('.js-select').length) {
    $('.js-select').selectpicker();
  }

  // Sliders
  if ($('.js-slider').length) {
    $('.js-slider').slick();
  }

  // Password display
  $('.js-viewPassw').on('click', function() {
    if ($(this).prev().attr('type') == 'password') {
      $(this).addClass('st-view');
      $(this).prev().attr('type', 'text');
    }
    else {
      $(this).prev().attr('type', 'password');
      $(this).removeClass('st-view');
    }
  });


  // Preloader
  function preloader() {
    let val = parseInt($(this).val());
    let $circle = $('#svg #bar');

    if (isNaN(val)) {
      val = $('[data-spinner]').attr('data-pct');
      let pct = ((100-val)/100)*c;

      $circle.css({ strokeDashoffset: pct});
    }
    else {
      let r = $circle.attr('r');
      let c = Math.PI*(r*2);

      if (val < 0) { val = 0;}
      if (val > 100) { val = 100;}

      let pct = ((100-val)/100)*c;

      $circle.css({ strokeDashoffset: pct});

      $('[data-spinner]').attr('data-pct', val);
    }
  }
  let val = parseInt($(this).val());
  let $circle = $('#svg #bar');
  let r = $circle.attr('r');
  let c = Math.PI*(r*2);

  if (val < 0) { val = 0;}
  if (val > 100) { val = 100;}

  let pct = ((100-val)/100)*c;

  $circle.css({ strokeDashoffset: pct});

  $(window).on("load", function() {
    preloader();
  });

  $('#percent').on('change', preloader);


  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Accordion

  $('[data-accord="trigger"]').on('click', function() {
    $('[data-accord="item"].active').removeClass('active');
    $(this).toggleClass('open');
    $(this).parent('[data-accord="link"]').siblings('[data-accord="list"]').toggle();
    $(this).closest('[data-accord="item"]').addClass('active');
  });


  // Mobile navigation

  if ($(window).width() < 768) {
    $('.b-sidebar-nav__trigger').on('click', function() {
      $('li > .b-sidebar-nav__link').removeClass('active');
      $(this)
        .closest('li').siblings('li').removeClass('active')
        .children('.b-sidebar-nav__collapse').removeClass('active');
      $(this)
        .parents('li').addClass('active');
    })
  }


  // Auto height on input
  if ($('[data-autosize]').length) {
    autosize($('[data-autosize]'));
  }

  // Mobile Choose Template

  if ($(window).width() < 1024) {
    function closeTemplate() {
      $('.b-templates__pane.active').removeClass('active');
      $('.b-templates__link.active').removeClass('active').attr('aria-selected', 'false');
    }

    $('[data-close-template="true"]').on('click', function() {
      closeTemplate();
      $('body').css('overflow', '');
    });

    closeTemplate();

    $('.b-templates__link').on('click', function() {
      $('body').css('overflow', 'hidden');
    })
  }


  // Mobile structure navigation

  if ($(window).width() < 1024) {
    $('[data-nav-structure="trigger"]').on('click', function() {
      if($('.structureClone').length == 0) {
        $('[data-structure-list="true"]').clone(true, true).addClass('structureClone').appendTo('.b-modal-structure__body');
      }

      $('#modalStructure').modal();
    })
  }


  // Mobile breadcrumbs

  if ($(window).width() < 1024) {
    let el = $('.tab-pane.active [data-nav-structure="true"]'),
        elWidth = el.width(),
        widthParents = el.parents('.b-main-header__main').width(),
        widthCrumbs = widthParents;

    if (el.siblings().hasClass('btn-wrap')) {
      widthCrumbs = widthParents - el.siblings('.btn-wrap').outerWidth() - 10;
    }
    el.css('maxWidth', widthCrumbs);
    if (elWidth >  widthCrumbs && !el.hasClass('breadcrumb-wrap_one-elem')) {
      el.addClass('crop');
    }
  }


  // Align blocks height

  function alignBlocksHeight() {
    $('[data-toggle="align"]').each(function(item) {
      let alignBlocksChildren = $(this).attr('data-target');
      let maxHeight = 0;
      $(this).css('height') > $(alignBlocksChildren).css('height') ? maxHeight = $(this).css('height') :  maxHeight = $(alignBlocksChildren).css('height');
      $(this).css('height', maxHeight);
      $(alignBlocksChildren).css('height', maxHeight);
    })
  }

  function resetBlocksHeight() {
    $('[data-toggle="align"]').each(function(item) {
      let alignBlocksChildren = $(this).attr('data-target');
      $(this).css('height', '');
      $(alignBlocksChildren).css('height', '');
    })
  }

  alignBlocksHeight();

  $(window).resize(function() {
    alignBlocksHeight; // not working
  });

  // Changing the height of blocks when displaying a section
  function resetHeightCarrentBlock(el, container) {
    let parentEl = $(el).parents(container);
    parentEl.css('height', '');
    $(parentEl.attr('data-target')).css('height', '');
    setTimeout (alignBlocksHeight, 10);
  }

  $('[data-resize-frame]').on('click', function() {
    resetHeightCarrentBlock(this, $(this).attr('data-resize-frame'));
  });

  // Enable options
  $('[data-check]').on('click', function() {
    let childElem = $(this).attr('data-check');
    $(childElem).toggleClass('active');
  })

  // Collapse (alternative)
  $('[data-new-toggle="collapse"]').on('click', function() {
    let childElem = $(this).attr('data-target');
    $(childElem).toggleClass('show');
    autosize.update($('.b-frame__title'));
  })

  // Mobile grid switch
  $('[data-switcher-grid]').on('click', function() {
    $('.b-control-main_grid').toggleClass('st-view');
  })

  // Hide object
  $('[data-hide-object]').on('click', function() {
    let childElem = $(this).attr('data-hide-object');
    $(childElem).toggleClass('d-none');
  })

  // Enable mobile preview
  $('[data-mob-preview="mobile"]').on('click', function() {
    $('.b-frame, .b-frame-feedback').addClass('mob-preview');
    autosize.update($('[data-editing]'));
    resetBlocksHeight();
    alignBlocksHeight();
  })
  $('[data-mob-preview="desktop"]').on('click', function() {
    $('.b-frame, .b-frame-feedback').removeClass('mob-preview');
    resetBlocksHeight();
    alignBlocksHeight();
  })

  // Editing fields
  $('[data-editing]').keyup(function() {
    let editingElem = $(this).attr('data-editing');
    let textElem = $(this).val();
    $(editingElem).val(textElem);
  })
  $('[data-editing]').blur(function() {
    let linkForChild = $(this).attr('data-editing');
    autosize.update($(linkForChild));
    resetHeightCarrentBlock(this, '.b-frame__content');
    resetHeightCarrentBlock(this, '.b-frame__item');
    resetHeightCarrentBlock(this, '.b-frame-feedback__item');
    resetHeightCarrentBlock(this, '.b-control-options__item');
    resetHeightCarrentBlock(this, '.b-control-options-mvp__section');
    resetHeightCarrentBlock(this, '.b-control-question__body');
    resetHeightCarrentBlock(this, '.b-control-sidebar__templates');
    resetHeightCarrentBlock(this, '.b-control-options__parent');
    resetHeightCarrentBlock(this, '[data-toggle="align"]');
  })

  // Filter
  $('[data-filter]').on('click', function() {
    $('.b-modal-templates__item').hide();
    let elements = $('.b-modal-templates__item');
    let activeEl = $(this).attr('data-filter');
    elements.each(function() {
      if($(this).hasClass(activeEl)) {
        $(this).show();
      }
      if(activeEl === "all") {
        $(this).show();
      }
    })
  })



  // Enable anonymous if all checkboxes are disabled

  let switchVerifRespondent = $('.collapseVerificationOption .b-control-options__switch input');

  switchVerifRespondent.on('click', function() {

    let switchers = $('.collapseVerificationOption .b-control-options__switch input');

    let statusChecks = false;
    switchers.each(function() {
      if($(this).prop('checked')) {
        return statusChecks = true;
      }
    });

    if(!statusChecks) {
      $('#anonymousCheck').trigger('click');
      $('.b-frame__footer .btn').hide();
    } else {
      if($('.b-frame__footer .btn').is(':hidden')) {
        $('.b-frame__footer .btn').show();
      }
    }
    resetBlocksHeight();
    alignBlocksHeight();
  })

  $('#anonymousCheck').on('click', function() {
    if($(this).prop('checked')) {
      $(this).parents('.b-control-options__ver-gr').addClass('st-small');
      $('.b-frame__footer').hide();
    } else {
      $(this).parents('.b-control-options__ver-gr').removeClass('st-small');
      $('.b-frame__footer').show();
    }
    resetBlocksHeight();
    alignBlocksHeight();
  })

  switchVerifRespondent.on('click', function() {
    if($(this).prop('checked')) {
      $(this).parents('.b-control-options__table').find('.b-control-options__check').prop('disabled', false);
    } else {
      $(this).parents('.b-control-options__table').find('.b-control-options__check').prop('disabled', true);
    }
  })



  // Change page orientation
  $('[data-page-orientation]').on('change', function() {
    if ($(this).val() === 'landscape') {
      $('.b-frame').addClass('st-landscape');
      $('head').append('<style id="stylePage">@page {size: A4 landscape;}</style>')
    } else {
      $('.b-frame').removeClass('st-landscape');
      $('#stylePage').remove();
    }
  })



  // QRCode generation
  let qrBgColor = '#ffffff';

  if($('#QRCode').length) {
    $("#QRCode").qrcode({
      render: 'image',
      text: 'http://test.com/page-1',
      size: 208,
      background: qrBgColor,
      quiet: 2,
    });
  }


  // Change option template
  $('[data-css]').on('change', function() {
    let targetEl = $(this).attr('data-target');
    let cssEl = $(this).attr('data-css');
    $(targetEl).css(cssEl, $(this).val());

    if(cssEl === 'backgroundColor') { // Background printing
      $(':root').css('--print-bg', $(this).val());

      // Overload QR with new background. Needed to generate .doc
      qrBgColor = getComputedStyle(document.documentElement).getPropertyValue('--print-bg');
      $("#QRCode img").remove();
      $("#QRCode").qrcode({
        render: 'image',
        text: 'http://test.com/page-1',
        size: 200,
        background: qrBgColor,
      });
    }

  })


  // Printing QR
  $('[data-print]').on('click', function(el) {
    el.preventDefault();
      print();
  })



  // Phone mask
  if($('#phoneSelect').length) {
    let codePhone = $('#phoneSelect');
    let selectCountry = $('#phoneSelect');
    let cleavePhone = new Cleave('#phoneInput', {
        phone:           true,
        phoneRegionCode: 'UA'
    });

    selectCountry.on('change', function () {
      let el = this.value === '+371' || this.value === '+372' ? this.value + '999999999999' : this.value + '888888888888';
        cleavePhone.setPhoneRegionCode(this.value);
        cleavePhone.setRawValue(el);
    });
  }

  // Displaying questions

  $('#displayingQuestions').on('change', function() {
    if ($(this).val() === 'oneScreen') {
      $('.b-frame-group').addClass('st-group');
      $('[data-card-group]').addClass('st-group');
    } else {
      $('.b-frame-group').removeClass('st-group');
      $('[data-card-group]').removeClass('st-group');
    }

    resetBlocksHeight();
    alignBlocksHeight();
  })

  // Delete card
  $('[data-card-delete]').on('click', function() {
    let card = $(this).attr('data-card-delete');
    $(this).parents('[data-card]').remove();
    console.log(card);
    $(card).remove();

    resetBlocksHeight();
    alignBlocksHeight();
  })


  // Order beta test
  $('[data-order-beta-text]').on('click', function() {
    let elParrent = $(this).parent();
    let elLink;

    if($(this).parents('[data-order-beta]').find('[data-label]').length) {
      elLink = $(this).parents('[data-order-beta]').find('[data-label]');
    } else {
      elLink = $('.b-templates__link.active .b-templates__label');
    }
    elLink.empty();
    elLink.text('Очікуйте повідомлення').addClass('check');
    elParrent.empty();
    elParrent.text($(this).attr('data-order-beta-text')).addClass('check');
  })

  // Number of items selected
  $('[data-selected-icons] [type="radio"]').on('click', function() {
    let currentNumber = $(this).attr('data-number-icon');
    $('[data-selected-icons]').attr('data-selected-icons', currentNumber);

    $('#previewSection1').removeClass('d-none');
  })


  // Compare and activate block with higher height on mobile

  if ($(window).width() < 1024) {
    let frame = $('.b-control-frame'),
        sidebar = $('.b-control-sidebar'),
        frameHeight = frame.css('height'),
        sidebarHeight = sidebar.css('height');

    if(frameHeight < sidebarHeight) {
      frame.addClass('st-less');
      // sidebar.css('height', frameHeight);
    } else {
      sidebar.addClass('st-less');
      // frame.css('height', sidebarHeight);
    }

    // $('[data-mob-switcher]').on('shown.bs.tab', function () {
    //   autosize.update($('[data-autosize]'));
    //   resetBlocksHeight();
    //   alignBlocksHeight();
    //   if(frame.hasClass('st-less') &&  frame.hasClass('active')) {
    //     frame.css('height', '');
    //     sidebar.css('height', frameHeight);
    //   } else {
    //     sidebar.css('height', '');
    //   }
    //   if(sidebar.hasClass('st-less') &&  sidebar.hasClass('active')) {
    //     frame.css('height', sidebarHeight);
    //     sidebar.css('height', '');
    //   } else {
    //     frame.css('height', '');
    //   }
    // })
  }

  // Cloud tags
  let words = [
    {text: "Lorem", weight: 13, html: {class: "st-positive"}},
    {text: "Ipsum", weight: 10.5, html: {class: "st-negative"}},
    {text: "Dolor", weight: 9.4, html: {class: "st-neutral"}},
    {text: "Sit", weight: 8, html: {class: "st-positive"}},
    {text: "Amet", weight: 6.2, html: {class: "st-positive"}},
    {text: "Consectetur", weight: 5, html: {class: "st-positive"}},
    {text: "Adipiscing", weight: 5, html: {class: "st-positive"}},
  ];
  $('#cloudTags').jQCloud(words);


  // Dropdown that doesn't close when clicked in inner menu
  $('[data-bs-trigger]').on('click', function() {
    $(this).parent().toggleClass('st-show');
    $(this).next().toggle();
  })

  $(document).on('click', function (e) {
    let container = $('[data-bs-messenger]');
    if (container.has(e.target).length === 0) {
      $('[data-bs-messenger]').removeClass('st-show');
      $('[data-bs-dropdown]').hide();
    }
  });


  // Remove default status
  $('.b-frame__option-input').on('focus', function() {
    $(this).parents('.b-frame__option-item').removeClass('st-default')
  })

  // Push message
  function pushMessage(text) {
    let idMessage = Math.floor(Math.random() * 100000);
    let message = `<div class="ui-push-message" data-push-message id="push-${idMessage}"><span class="ui-push-message__text">${text}</span><button class="close" type="button" data-push-close><svg class="ic" width="20px" height="20px"><use xlink:href="assets/img/svg-symbols.svg#close"></use></svg></button></div>`;
    $('.ui-push-group').append(message);
    setTimeout(() => {$(`#push-${idMessage}`).addClass('active')}, 50);
    setTimeout(() => {$(`#push-${idMessage}`).removeClass('active')}, 3500);
    setTimeout(() => {removePushMessage($(`#push-${idMessage}`))}, 3800);

    $(`#push-${idMessage} [data-push-close]`).on('click', function() {
      $(`#push-${idMessage}`).removeClass('active');
      setTimeout(() => {removePushMessage($(`#push-${idMessage}`))}, 300);
    })
  }

  function removePushMessage(el) {
    $(el).remove()
  }


  // Copying values from input or textarea to clipboard
  $('[data-copy]').on('click', function() {
    let elCopy = $(this).attr('data-copy'),
        elVal,
        elMessage = $(this).attr('data-push');
    if($(elCopy).is("input")) {
      elVal = $(elCopy).val();
    } else {
      elVal = $(elCopy).text();
    }

    navigator.clipboard.writeText(elVal);
    pushMessage(elMessage);
  })

  // Messenger
  $('[data-messenger="trigger"]').on('click', function() {
    $(this).hide();
    $(this).parent().toggleClass('st-show');
    $(this).next().toggle();
  })

  $('[data-messenger="close"]').on('click', function () {
    $('[data-messenger="trigger"]').show();
    $('[data-messenger="body"]').hide();
    $('[data-messenger="main"]').removeClass('st-show');
  })

  $(document).on('click', function (e) {
    let container = $('[data-messenger="main"]');
    if (container.has(e.target).length === 0) {
      $('[data-messenger="main"]').removeClass('st-show');
      $('[data-messenger="body"]').hide();
      $('[data-messenger="trigger"]').show();
    }
  })

  // Messenger position
  $('[name="buttonPositionRadio"]').on('click', function() {
    let position = $(this).attr('id'),
        el = $('#websiteMessenger');

    switch(position) {
      case 'leftTopPosition':
        el.attr('data-position', 'left-top');
        break;
      case 'leftCenterPosition':
        el.attr('data-position', 'left-center');
        break;
      case 'leftBottomPosition':
        el.attr('data-position', 'left-bottom');
        break;
      case 'rightTopPosition':
        el.attr('data-position', 'right-top');
        break;
      case 'rightCenterPosition':
        el.attr('data-position', 'right-center');
        break;
      case 'rightBottomPosition':
        el.attr('data-position', 'right-bottom');
        break;
    }
  })


  // Messenger size
  $('[name="buttonSizeMessenger"]').on('click', function() {
    let size = $(this).attr('id'),
        el = $('#websiteMessenger');

    switch(size) {
      case 'microSize':
        el.attr('data-size', 'micro');
        break;
      case 'largeSize':
        el.attr('data-size', 'large');
        break;
    }
  })

  // Messenger form icon
  $('[name="formIcWidget"]').on('click', function() {
    let form = $(this).attr('id'),
        el = $('#websiteMessenger');

    switch(form) {
      case 'typeSquare':
        el.attr('data-messenger-form', 'square');
        break;
      case 'typeRounded':
        el.attr('data-messenger-form', 'rounded');
        break;
      case 'typeCircle':
        el.attr('data-messenger-form', 'circle');
        break;
    }
  })

  // Messenger type icon
  $('[name="viewIcWidget"]').on('click', function() {
    let form = $(this).attr('id'),
        el = $('#websiteMessenger');

    switch(form) {
      case 'typeQuest':
        el.attr('data-messenger-type', 'typeQuest');
        break;
      case 'typeTalk':
        el.attr('data-messenger-type', 'typeTalk');
        break;
      case 'typeSmile':
        el.attr('data-messenger-type', 'typeSmile');
        break;
    }
  })


  // Hide / show cells in table
  $('[data-table="hide-cell"]').on('click', function(ev) {
    ev.preventDefault();

    let cell = $(this).parents('th'),
        id = cell.attr('data-number-row'),
        table = $(this).parents('[data-table="table"]'),
        btnShow = `<button class="ui-table-sort__btn-show" type="button" data-table="show-td"></button>`,
        mergedCell = table.find('[data-table-colspan]'),
        numbeMergedCells = mergedCell.attr('colspan');

    table.find(`[data-number-row="${id}"]`).addClass('st-hide-cell');
    cell.prev().append(btnShow);
    showCells();

    if (cell.attr('data-table') == "second-row-cell") {
      numbeMergedCells--;
      mergedCell.attr('colspan', numbeMergedCells);
    }
  })

  function showCells() {
    $('[data-table="show-td"]').on('click', function() {
      let table = $(this).parents('[data-table="table"]'),
          mergedCell = table.find('[data-table-colspan]'),
          numbeMergedCells = mergedCell.attr('data-table-colspan');

      table.find('.st-hide-cell').removeClass('st-hide-cell');
      table.find('[data-table="show-td"]').remove();
      mergedCell.attr('colspan', numbeMergedCells);
    })
  }


  // Slider height block
  if ($('#heightBlock').length) {
    let sliderFormat = document.getElementById('heightBlock');

    noUiSlider.create(sliderFormat, {
        start: [100],
        step: 1,
        connect: [true, false],
        range: {
            'min': [0],
            'max': [100]
        },
        format: wNumb({
            decimals: 0,
        })
    });
    let inputFormat = document.getElementById('heightBlockInput');

    sliderFormat.noUiSlider.on('update', function (values, handle) {
        inputFormat.value = values[handle];
    });

    inputFormat.addEventListener('change', function () {
        sliderFormat.noUiSlider.set(this.value);
    });
  }

  // Slider width block
  if ($('#widthBlock').length) {
    let sliderFormat = document.getElementById('widthBlock');

    noUiSlider.create(sliderFormat, {
        start: [100],
        step: 1,
        connect: [true, false],
        range: {
            'min': [0],
            'max': [100]
        },
        format: wNumb({
            decimals: 0,
        })
    });
    let inputFormat = document.getElementById('widthBlockInput');

    sliderFormat.noUiSlider.on('update', function (values, handle) {
        inputFormat.value = values[handle];
    });

    inputFormat.addEventListener('change', function () {
        sliderFormat.noUiSlider.set(this.value);
    });
  }


  // Modal filter
  $('[data-filter="link"]').on('click', function() {
    let currentTarget = $(this).attr('data-target');

    $('[data-filter="body"] .modal-content').addClass('d-none');
    $(currentTarget).removeClass('d-none');
  })

  $('[data-filter="back"]').on('click', function() {
    $('[data-filter="body"] .modal-content').addClass('d-none');
    $('#filterMain').removeClass('d-none');
  })


  // Enumerator

  $(".js-minus").on('click', function() {
      let inputEl = jQuery(this).parent().children().next();
      let qty = inputEl.val();
      if (jQuery(this).parent().hasClass("js-minus"))
          qty++;
      else
          qty--;
      if (qty < 0)
          qty = 0;
      inputEl.val(qty);
  })


  $(".js-plus").on('click', function() {
      let inputEl = jQuery(this).parent().children().next();
      let qty = inputEl.val();
      if (jQuery(this).hasClass("js-plus"))
          qty++;
      else
          qty--;
      if (qty < 0)
          qty = 0;
      inputEl.val(qty);
  })
});


// Drag and drop
const blockes = document.querySelectorAll('.b-modal-type__rank-item'),
    boxes = document.querySelectorAll('.b-modal-type__rank');
let dragElem = null;

blockes.forEach(block =>{
  block.draggable = true;
  block.addEventListener('dragstart', startDragBlock);
  block.addEventListener('dragend', endDragBlock);
});

function startDragBlock(){
  console.log('dragstart');
  dragElem = this;
  setTimeout (()=> {
    this.classList.add('hide');
  }, 0);
}
function endDragBlock(){
  console.log('dragend');
  dragElem = null;
  this.classList.remove('hide');
}

boxes.forEach(box => {
  box.addEventListener('dragover', dragBoxOver);
  box.addEventListener('dragenter', dragBoxEnter);
  box.addEventListener('dragleave', dragBoxLeave);
  box.addEventListener('drop', dropInBox);
})

function dragBoxOver(evt){
  console.log('dragover');
  evt.preventDefault();
  this.classList.add('hover');
}
function dragBoxEnter(evt){
  console.log('dragenter');
  evt.preventDefault();
  this.classList.add('hover');
}
function dragBoxLeave(){
   console.log('dragleave');
  this.classList.remove('hover');
}
function dropInBox(evt){
  console.log('drop');
  this.append(dragElem);
  this.classList.remove('hover');
}


// Date picker

  let localeDatePicker = {
    days: ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П’ятниця', 'Субота'],
    daysShort: ['Нед', 'Пнд', 'Вів', 'Срд', 'Чтв', 'Птн', 'Сбт'],
    daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
    monthsShort: ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'],
    today: 'Сьогодні',
    clear: 'Очистити',
    dateFormat: 'dd.MM.yyyy',
    timeFormat: 'HH:mm',
    firstDay: 1
  };


  if (document.querySelector('.js-datePicker')) {
    let pickers = document.querySelectorAll('.js-datePicker');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
        isMobile: true,
        autoClose: true,
        locale: localeDatePicker,
        selectedDates: [new Date()],
      });
    })
  }

  if (document.querySelector('.js-datePickerRange')) {
    let pickers = document.querySelectorAll('.js-datePickerRange');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
        isMobile: true,
        autoClose: true,
        range: true,
        multipleDatesSeparator: ' - ',
        locale: localeDatePicker,
      });
    })
  }

  if (document.querySelector('.js-datePickerRangeIline')) {
    let pickers = document.querySelectorAll('.js-datePickerRangeIline');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
          range: true,
          inline: true,
          multipleDatesSeparator: ' - ',
          locale: localeDatePicker,
      });
    })
  }


  if (document.querySelector('.js-datePickerTime')) {
    let pickers = document.querySelectorAll('.js-datePickerTime');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
          isMobile: true,
          autoClose: true,
          timepicker: true,
          onlyTimepicker: true,
          selectedDates: [new Date()],
      });
    })
  }



  if (document.querySelector('.js-datePickerInline')) {
    let pickers = document.querySelectorAll('.js-datePickerInline');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
        locale: localeDatePicker,
        selectedDates: [new Date()],
        autoClose: true,
        position({$datepicker, $target, $pointer}) {
            let coords = $target.getBoundingClientRect(),
                dpHeight = $datepicker.clientHeight,
                dpWidth = $datepicker.clientWidth;

            let top = coords.y + coords.height + window.scrollY - dpHeight;
            let left = coords.x + coords.width / 2 - dpWidth / 2;

            $datepicker.style.left = `${left}px`;
            $datepicker.style.top = `${top}px`;

            $pointer.style.display = 'none';
        }
      });
    })
  }



  if (document.querySelector('.js-datePickerTimeInline')) {
    let pickers = document.querySelectorAll('.js-datePickerTimeInline');
    pickers.forEach(function(item) {
      new AirDatepicker(item, {
        locale: localeDatePicker,
        selectedDates: [new Date()],
        autoClose: true,
        timepicker: true,
        onlyTimepicker: true,
        timeFormat: 'hh:mm',
        position({$datepicker, $target, $pointer}) {
            let coords = $target.getBoundingClientRect(),
                dpHeight = $datepicker.clientHeight,
                dpWidth = $datepicker.clientWidth;

            let top = coords.y + coords.height + window.scrollY - dpHeight;
            let left = coords.x + coords.width / 2 - dpWidth / 2;

            $datepicker.style.left = `${left}px`;
            $datepicker.style.top = `${top}px`;

            $pointer.style.display = 'none';
        }
      });
    })
  }


  // Countdown timer

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock() {
    let clock = document.querySelector('[data-countdown="elem"]'),
        daysSpan = clock.querySelector('[data-countdown="days"]'),
        hoursSpan = clock.querySelector('[data-countdown="hours"]'),
        minutesSpan = clock.querySelector('[data-countdown="minutes"]'),
        secondsSpan = clock.querySelector('[data-countdown="seconds"]'),
        endtime = clock.dataset.endtime;

    function updateClock() {
      let t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
  }

  if (document.querySelector('[data-countdown="elem"]')) {
    initializeClock();
  }


// Build tree

let tree = document.querySelector('[data-tree="main"]'),
    treeInner = document.querySelector('[data-tree="wrap"]'),
    treeInnerStyle = window.getComputedStyle(treeInner),
    dragging = false;

tree.addEventListener('mousedown', (e) => {
  dragging = true;

  tree.classList.add('st-dragging');

  let translateX = parseInt(treeInnerStyle.getPropertyValue('--tree-x')),
      translateY = parseInt(treeInnerStyle.getPropertyValue('--tree-y'));

  startX = e.pageX - translateX;
  startY = e.pageY - translateY;
})

document.body.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  treeInner.style.setProperty('--tree-x', `${e.pageX - startX}px`);
  treeInner.style.setProperty('--tree-y', `${e.pageY - startY}px`);
})

document.body.addEventListener('mouseup', () => {
  tree.classList.remove('st-dragging');
  dragging = false
})

let treeIncrement = document.querySelector('[data-tree="increment"]'),
    treeDecrement = document.querySelector('[data-tree="decrement"]'),
    treeMoveLeft = document.querySelector('[data-tree="nav-left"]'),
    treeMoveRight = document.querySelector('[data-tree="nav-right"]'),
    treeMoveTop = document.querySelector('[data-tree="nav-top"]'),
    treeMoveBottom = document.querySelector('[data-tree="nav-bottom"]'),
    treeScale = .7;

treeIncrement.addEventListener('click', (e) => {
  treeScale += .1;
  treeInner.style.setProperty('--tree-scale', `${treeScale}`);
});

treeDecrement.addEventListener('click', (e) => {
  treeScale -= .1;
  treeInner.style.setProperty('--tree-scale', `${treeScale}`);
});

treeMoveRight.addEventListener('touchend', (e) => {
  let translateX = parseInt(treeInnerStyle.getPropertyValue('--tree-x')),
      widthTree = tree.offsetWidth;
  treeInner.style.setProperty('--tree-x', `${translateX - widthTree / 3}px`);
});

treeMoveLeft.addEventListener('touchend', (e) => {
  let translateX = parseInt(treeInnerStyle.getPropertyValue('--tree-x')),
      widthTree = tree.offsetWidth;
  treeInner.style.setProperty('--tree-x', `${translateX + widthTree / 3}px`);
});

treeMoveTop.addEventListener('touchend', (e) => {
  let translateY = parseInt(treeInnerStyle.getPropertyValue('--tree-y')),
      heightTree = tree.offsetHeight;
  treeInner.style.setProperty('--tree-y', `${translateY + heightTree / 3}px`);
});

treeMoveBottom.addEventListener('touchend', (e) => {
  let translateY = parseInt(treeInnerStyle.getPropertyValue('--tree-y')),
      heightTree = tree.offsetHeight;
  treeInner.style.setProperty('--tree-y', `${translateY - heightTree / 3}px`);
});


// Displaying the navigation bar for touch devices
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  document.querySelector('.b-tree__nav').style.display = "block";
}


// let treeCollapseBtn = document.querySelectorAll('[data-tree="collapse"]');
// treeCollapseBtn.addEventListener('click', function() {
//   // this.classList.toggle('show');
//   this.parentElement.parentElement.classList.toggle('st-widt-group');
// });

$('[data-tree="collapse"]').on('click', function() {
  $(this).closest('.b-tree__block').toggleClass('st-widt-group')
})
