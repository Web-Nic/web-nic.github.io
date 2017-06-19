$(document).ready(function(){
  $('.slider1').bxSlider({
    slideWidth: 140,
    minSlides: 5,
    maxSlides: 5,
    slideMargin: 20,    
    moveSlides: 1,
    pager: false
  });
  $('.slider2').bxSlider({
    slideWidth: 960,
    minSlides: 1,
    maxSlides: 1,
    moveSlides: 1,
    pager: false
  });
});


  function validateEmail(email) { 
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

$(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact1").submit(function() { return false; });

      
  });

$(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact2").submit(function() { return false; });

        
  });

  $(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact3").submit(function() { return false; });


  });

  $(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact4").submit(function() { return false; });
        

  });

  $(document).ready(function() {
    $(".modalbox").fancybox();
    $("#contact5").submit(function() { return false; });

        $("#send5").on("click", function(){
      var emailval  = $("#email3").val();
      var msgval    = $("#phone3").val();
      var msglen    = msgval.length;
      var mailvalid = validateEmail(emailval);
      
      if(mailvalid == false) {
        $("#email5").addClass("error");
      }
      else if(mailvalid == true){
        $("#email5").removeClass("error");
      }
      
      if(msglen < 6) {
        $("#phone5").addClass("error");
      }
      else if(msglen >= 6){
        $("#phone5").removeClass("error");
      }
      
      if(mailvalid == true && msglen >= 6) {
        // если обе проверки пройдены
        // сначала мы скрываем кнопку отправки
      
        
        
      }
    });
  });
