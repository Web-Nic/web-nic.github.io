$(document).ready(function() {
      $("#form1").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
          },
          
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#form1').ajaxSubmit({
            success: function(result) {
              $('input[type=text], input[type=email], textarea').val('');
                  $('#answer').css({display: 'block'}).animate({'opacity': '1', 'top': '150px'}, 300);
              $('#wrap').css({display: 'block'}).animate({'opacity': '0.5'}, 300);
            }
          });
        }
      });
      $("#form2").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#form2').ajaxSubmit({
            success: function(result) {
            $('input[type=text], input[type=email], textarea').val('');
              $('#answer').css({display: 'block'}).animate({'opacity': '1', 'top': '150px'}, 300);
              $('#wrap').css({display: 'block'}).animate({'opacity': '0.5'}, 300);
            }
          });
        }
      });
      $("#contact5").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#contact5').ajaxSubmit({
            success: function(result) {
            $('input[type=text], input[type=email], textarea').val('');
              $('#answer').css({display: 'block'}).animate({'opacity': '1', 'top': '150px'}, 300);
              $('#wrap').css({display: 'block'}).animate({'opacity': '0.5'}, 300);
            }
          });
        }
      });
       $("#contact1").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#contact1').ajaxSubmit({
            success: function(result) {
              $("#contact1").fadeOut("fast", function(){
                $(this).before("<p><strong>Ваша заявка принята!<br> Наш менеджер свяжется с Вами в ближайшее время!</strong></p>");
                $(".title-form").toggleClass("hdn");
                setTimeout("$.fancybox.close()", 5000);
              });
            }
          });
        }
      });
      $("#contact2").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#contact2').ajaxSubmit({
            success: function(result) {
               $("#contact2").fadeOut("fast", function(){
                $(this).before("<p><strong><a style='text-align: center; display: block; width: 100%;' href='files/price.zip'>Сохранить файл</a></strong></p>");
                $(".title-form").toggleClass("hdn");
                setTimeout("$.fancybox.close()", 5000);
              });
            }
          });
        }
      });
      
      $("#contact3").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#contact3').ajaxSubmit({
            success: function(result) {
                $("#contact3").fadeOut("fast", function(){
                $(this).before("<p><strong>Ваша заявка принята!<br> Наш менеджер свяжется с Вами в ближайшее время!</strong></p>");
                $(".title-form").toggleClass("hdn");
                setTimeout("$.fancybox.close()", 5000);
              });
            }
          });
        }
      });
        $("#contact4").validate({
        rules: {
          name: {
            required: true,
          },
          phone: {
            required: true,
          },
          
          email: {
            required: true,
            email: true
          },
        },
        messages: {
          name: {
            required: "Поле не может быть пустым",
          },
          phone: {
            required: "Поле не может быть пустым",
            email: "Введите номер телефона"
          },   
          email: {
            required: "Поле не может быть пустым",
            email: 'Неверный E-mail'
          },
        },
        submitHandler: function(form) {
          $('#contact4').ajaxSubmit({
            success: function(result) {
                $("#contact4").fadeOut("fast", function(){
                $(this).before("<p><strong>Ваша заявка принята!<br> Наш менеджер свяжется с Вами в ближайшее время!</strong></p>");
                $(".title-form").toggleClass("hdn");
                setTimeout("$.fancybox.close()", 5000);
              });
            }
          });
        }
      });
      
      
      
});