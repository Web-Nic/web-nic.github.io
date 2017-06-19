$(function () {
	'use strict';


	// ====== Modal ======

	//$('.fancybox').fancybox();

	$('.various').fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});



	// ===== Click more ======

	$('.btn_more').click(function () {
			$('.description__text-more').slideToggle('slow');
		});


	// ===== Button up =====

	$(window).scroll(function() {
		if($(this).scrollTop() !== 0) {
		$('#toTop').fadeIn();
		} else {
		$('#toTop').fadeOut();
		}
	});

	$('#toTop').click(function() {
			$('body,html').animate({scrollTop:0},800);
	});


	// ====== Form send =====

	$(document).on('click', '.js-order', function(){
		$('#modal-order').arcticmodal();
	});

	$(document).on('click', '.js-buy', function(){
		$('#modal-buy').arcticmodal();
	});


	// Scroll on anchor

		$("#menu").on("click","a", function (event) {
			//отменяем стандартную обработку нажатия по ссылке
			event.preventDefault();

			//забираем идентификатор бока с атрибута href
			var id  = $(this).attr('href'),

			//узнаем высоту от начала страницы до блока на который ссылается якорь
				top = $(id).offset().top;

			//анимируем переход на расстояние - top за 1500 мс
			$('body,html').animate({scrollTop: top}, 1500);
		});


});


