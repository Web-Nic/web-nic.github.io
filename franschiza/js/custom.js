function changeIt(that){
    var vv = $(that).val();
    $(that).prev().val(vv)
    
}
var exit_show = 0;

$(document).ready(function(){

/*$( "window" ).mousemove(function( event ) {
var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
var clientCoords = "( " + event.clientX + ", " + 
console.log(event.clientY+; " )";

console.log(event.clientY);
console.log(event.pageY);

//$( "span:first" ).text( "( event.pageX, event.pageY ) : " + pageCoords );
//$( "span:last" ).text( "( event.clientX, event.clientY ) : " + clientCoords );
});*/




 $('body').mouseleave(function(event) {
    // console.log( event.pageY);
   //  console.log(event.clientY);
     
     if (!exit_show && event.clientY < 0){
         exit_show=1;
         $.colorbox({html: $('#exit_content').html()});
         
        /* var note = $('#note'),
		ts = new Date(2012, 0, 1),
		newYear = true;
         
         $('#countdown3').countdown({
		    timestamp	: ts,
		    callback	: function(hours, minutes, seconds){
			
			var message = "";
			message += "часов: " + hours + ", ";
			message += "минут: " + minutes + " и ";
			message += "секунд: " + seconds + " <br />";
			
			if(newYear){
				message += "осталось до Нового года!";
			}
			else {
				message += "осталось до момента через 10 дней!";
			}
			note.html(message);
		}
	});*/
         
         
     }

});

    var slider = $('.slider1').bxSlider({
	    slideWidth: 465,
	    minSlides: 2,
	    maxSlides: 100,
	    slideMargin: 10,
	    pager: false
	  });
    
    
   /* $('.slider1').bxSlider({
	    slideWidth: 465,
	    minSlides: 2,
	    maxSlides: 100,
	    slideMargin: 10,
	    pager: false
	  });*/
	  
	  
	  
    $(".vimeo").colorbox({iframe:true, innerWidth:500, innerHeight:409});
	$(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
	$(".inline").colorbox({inline:true});
   
    $('#add_review').validate( {
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: 'assets/components/ajax/connector.php',
                data: $('#add_review').serialize()+'&action=send_rev',
                dataType: 'json',
                success: function (data) 
                {
                  $.colorbox.close();
                  $('.slider1').prepend(data.output);
                    slider.reloadSlider();
                     $('#rev_name').val("");
                     $('#rev_text').val("");

                },
                error:function (data){
                }
            });
           // return false;
        },
        rules:{
            pagetitle: {
                minlength: 2,
                maxlength: 50
            },
            content:{
                 minlength: 10,
                maxlength: 450
            }
        },
         //errorElement: "label",errorPlacement: function(error, element) {       }
    });
    


});