# Form validation

The javascript validation code is based on jQuery. The validation is cross-browser and will give you the power to use future-proof input types such as phone, email, password, checkbox.

### Features

Validate form fields
Customizable messages
Works in all major browsers

### Usage

Initialize by adding class “js_validate” to form. And adding jquery function in your file main.js

     <pre>
     <code>
     <form class=”js_validate”>
     <input type=”text” required>
     </form>
     </code>
     </pre>

### Rules
#### phone
The enter value must be a valid phone.

     <pre>
     <code>
     <input data-validate=”phone” required>
     </code>
     </pre>
------

     <pre>
     <code>
     case "phone":
                  phone = true;
                 reg = /[0-9 -()+]{10}$/;
                 mark ($(this), !reg.test($.trim($(this).val())));
                 phone = false;
             break;
     </code>
     </pre>


#### email

The enter value must be a valid email.

     <pre>
     <code>
     <input data-validate=”email” required>
     </code>
     </pre>
--------

     <pre>
     <code>
     case "email":
                 email = true;
                 reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                 mark ($(this), !reg.test($.trim($(this).val())));
                 email = false;
             break;
     </code>
     </pre>


#### pass

The enter value must be a valid password.

     <pre>
     <code>
     <input data-validate=”pass” required>
     </code>
     </pre>
-------

     <pre>
     <code>
     case "pass":
                 password = true;
                 reg = /^[a-zA-Z0-9_-]{6,}$/;
                 mark ($(this), !reg.test($.trim($(this).val())));
                 password = false;
             break;
     </code>
     </pre>


#### undefined

Input must be filled by text.

     <pre>
     <code>
     <input type=”text” required>
     </code>
     </pre>
-------

     <pre>
     <code>
     case undefined:
                 mark ($(this), $.trim($(this).val()).length === 0);
             break;
     </code>
     </pre>


#### checkbox

You can validate a checkbox or radio.

     <pre>
     <code>
     $('.js_valid_radio').each(function(){
         var inp = $(this).find('input.required');
         var rezalt = 0;
             for (var i = 0; i < inp.length; i++) {
             if ($(inp[i]).is(':checked') === true) {
                 rezalt = 1;
                 break;
             } else {
                 rezalt = 0;
             }
         }
         if (rezalt === 0) {
             $(this).addClass(error_class).removeClass(norma_class);
             e=1;
         } else {
             $(this).addClass(norma_class).removeClass(error_class);
         }
     })
     </code>
     </pre>

### Events

#### success validation

This event fires when a validation is passed.

#### error validation

This event fires when a validation is failed.

     <pre>
     <code>
     function mark (object, expression) {
         if (expression) {
             object.parent('div').addClass(error_class).removeClass(norma_class);
             if (email && (object.val().length > 0)) {
                 object.parent('div').find('.error_text').text('Incorrect Email    Format');
             }
             if (password && (object.val().length > 0)) {
                 object.parent('div').find('.error_text').text('Password must be minimum 6 signs');
             }
             if (phone && (object.val().length > 0)) {
                 object.parent('div').find('.error_text').text('Incorrect phone Format');
             }
             e++;
         } else
             object.parent('div').addClass(norma_class).removeClass(error_class);
     }
     </code>
     </pre>

### Example

html code:

     <pre>
     <code>
     <form action="/" class="js_validate">  
             <div>
     <label>First Name*</label>
                 <input type="text" required>            
                 <span class="error_text"></span>
             </div>
         <div>
     <label>Last Name*</label>
                  <input type="text" required>            
                 <span class="error_text"></span>
             </div>
---------
         <span class="btn-form">
                 <button type="submit" class="btn">Submit Form</button>
         </span>
     </form>
     </code>
     </pre>
