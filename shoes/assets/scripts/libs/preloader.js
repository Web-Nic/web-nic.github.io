$(window).load(function() {
		var preloaderDelay = 350,
				preloaderFadeOutTime = 800;
		function hidePreloader() {
				var loadingAnimation = $('.spinner'),
						preloader = $('.spinner');
				loadingAnimation.fadeOut();
				preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		};
		hidePreloader();
});
