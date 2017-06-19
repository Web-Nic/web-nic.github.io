$(function () {

	$('#slider-format').noUiSlider({
						start: [ 1 ],
						step: 1,
						range: {
							'min': 1,
							'max': 500
						},
						format: wNumb({
							decimals: 0,
							thousand: ' '
						})
	});


	$('#slider-format').Link('lower').to($('#number'));

	function setText( value, handleElement, slider ){

		if (value <= 11) {
			$('#price-one').text(1900);
			$('#action').text('0%');
			} else {
			if (value <= 20) {
				$('#price-one').text(1710);
				$('#action').text('10%');
				} else {
				if (value <= 29) {
					$('#price-one').text(1615);
					$('#action').text('15%');
					} else {
				if (value <= 44) {
					$('#price-one').text(1520);
					$('#action').text('20%');
					} else {
				if (value <= 65) {
					$('#price-one').text(1425);
					$('#action').text('25%');
					} else {
				if (value <= 99) {
					$('#price-one').text(1330);
					$('#action').text('30%');
					} else {
					$('#price-one').text(1235);
					$('#action').text('35%');
						}}}}}}

		$('#price-total').text($('#price-one').text() * value, null, wNumb({thousand: ' '}));
	}

	$('#slider-format').Link('lower').to(setText);

	var string = $('#slider-format')
	string = numeral(1000).format('0,0');


});
