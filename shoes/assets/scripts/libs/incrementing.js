$(function() {

  $(".numbers-row").prepend('<div class="numbers-row__btn numbers-row__btn_inc">+</div>');

   $(".numbers-row").append('<div class="numbers-row__btn numbers-row__btn_dec">-</div>');


  $(".numbers-row__btn").on("click", function() {

    var $button = $(this);
    var oldValue = $button.parent().find("input").val();

    if ($button.text() == "+") {
  	  var newVal = parseFloat(oldValue) + 1;
  	} else {
	   // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
	    } else {
        newVal = 0;
      }
	  }

    $button.parent().find("input").val(newVal);

  });

});
