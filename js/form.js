//declaring varibles
const $selectTheme = $('.select-theme');
const $cornflowerBlue = $('.cornflowerblue');
const $darkSlateGrey = $('.darkslategrey');
const $gold = $('.gold');
const $tomato = $('.tomato');
const $steelBlue = $('.steelblue');
const $dimGrey = $('.dimgrey');
const mainCheckbox = document.getElementsByTagName('input')[name='all'];
const jsFrameworksCheckbox = document.getElementsByTagName('input')[name='js-frameworks'];
const jsLibsCheckbox = document.getElementsByTagName('input')[name='js-libs'];
const expressCheckbox = document.getElementsByTagName('input')[name='express'];
const nodeCheckbox = document.getElementsByTagName('input')[name='node'];
const buildtoolsCheckbox = document.getElementsByTagName('input')[name='build-tools'];
const npmCheckbox = document.getElementsByTagName('input')[name='npm'];
const $creditCardDiv = $('#credit-card');
const $paypalIDiv = $('.paypal-info');
const $bitcoinDiv = $('.bitcoin-info');
const $invalidName = $('<span>   Please enter a name</span>');
const $invalidEmail = $('<span>   Please enter a valid email</span>');
const $invalidActivities = $('<span>   Please select at least one activity</span>');
const $invalidCardNum = $('<p>Please enter a credit card number between 13 and 16 digits</p>');
const $noZip = $('<p>Please enter a zipcode</p>');
const $invalidZip = $('<p>Please enter a 5 digit zipcode</p>');
const $invalidCvv = $('<p>Please enter a 3 digit CVV</p>');
let eventCostTotal = 0;
let $totalDisplay = $('<span>Total: $' + eventCostTotal + '</span>');

//function to style and hide error messages
function errorStyle(errorMessage) {
  errorMessage.css('color', 'red');
  errorMessage.hide();
}

//invalid name message to show if user does not enter a name
$('#name').prev().append($invalidName);
errorStyle($invalidName);

//invalid email message to show if user does not enter a valid email address
$('#mail').prev().append($invalidEmail);
errorStyle($invalidEmail);

//invalid activities selection message to show if user does not select at least one activity
$('.activities').prepend($invalidActivities);
errorStyle($invalidActivities);

//invalid credit card number message to show if user does not input a correct credit card.
$invalidCardNum.insertBefore( $( ".pay" ) );
errorStyle($invalidCardNum);

//invalid zip code message to show if user does not input anything into the zipcode feild.
$noZip.insertBefore( $( ".pay" ) );
errorStyle($noZip);

//invalid zip code message to show if user does not input a correctly formatted zipcode.
$invalidZip.insertBefore( $( ".pay" ) );
errorStyle($invalidZip);

//invalid ccv message to show if user does not input a correctly formatted ccv number
$invalidCvv.insertBefore( $( ".pay" ) );
errorStyle($invalidCvv);

//Calling focus to the name input field so the cursor appears in the name input when the page loads.
$('#name').focus();

//hiding otherTitle text field
$('#other-title').hide();

/*showing other-title input when "other" is selected in the dropdown menu and
hiding if anything else is selected.*/
$('#title').change( function () {
if ($('#title').val() === 'other') {
  $('#other-title').show();
} else {
  $('#other-title').hide();
}
});

//hiding color div until a t-shirt theme is selected
  $('#colors-js-puns').hide();

//Making the only option in the color select field "Please select a T-shirt theme" on page load
  $('#color').empty();
  $('#color').append($selectTheme);

//function to append colors
function showColors (color1, color2, color3,) {
  $('#colors-js-puns').show();
  $('#color').append(color1);
  $('#color').append(color2);
  $('#color').append(color3);
}

//changing color options based on T-Shirt theme selected
$('#design').change( function () {
  $('#color').empty();

  if ($('#design').val() === 'js puns') {
      showColors($cornflowerBlue, $darkSlateGrey, $gold);
  }
  else if ($('#design').val() === 'heart js'){
      showColors($tomato, $steelBlue, $dimGrey);
  }
  else if ($('#design').val() === 'select theme'){
      $('#colors-js-puns').hide();
}
});

//Function to disable a checkbox and change its label color and text style
function disableCheckbox(checkbox) {
  const checkboxLabel = checkbox.parentElement;
  checkbox.disabled = true;
  checkboxLabel.style.color = 'lightgrey';
  checkboxLabel.style.textDecoration = 'line-through';

}

//function to enable a checkbox and set its label color and text style back to default
function enableCheckbox(checkbox) {
  const checkboxLabel = checkbox.parentElement;
  checkbox.disabled = false;
  checkboxLabel.style.color = '';
  checkboxLabel.style.textDecoration = 'none';
}



//Adding the total event cost to the page.
$('.activities').append($totalDisplay);

/* If an event checkbox is changed it will check if there are other events that
are scheduled for the same day and time and disable the appropriate checkboxes.
Will also total the cost of selected events and display it on the page*/
$('.activities').change( function () {

  eventCostTotal = 0;
  $totalDisplay.remove();

  if(mainCheckbox.checked === true) {
    $invalidActivities.hide();
    eventCostTotal += 200;
  }

  if(jsFrameworksCheckbox.checked === true) {
    $invalidActivities.hide();
    disableCheckbox(expressCheckbox);
      eventCostTotal += 100;
  } else {
      enableCheckbox(expressCheckbox);
  }

  if(expressCheckbox.checked === true) {
      $invalidActivities.hide();
      disableCheckbox(jsFrameworksCheckbox);
      eventCostTotal += 100;
  } else {
      enableCheckbox(jsFrameworksCheckbox);

  }

  if(jsLibsCheckbox.checked === true) {
      $invalidActivities.hide();
      disableCheckbox(nodeCheckbox);
      eventCostTotal += 100;
  } else {
      enableCheckbox(nodeCheckbox);
  }

  if(nodeCheckbox.checked === true) {
      $invalidActivities.hide();
      disableCheckbox(jsLibsCheckbox);
      eventCostTotal += 100;
  } else {
      enableCheckbox(jsLibsCheckbox);
  }

  if(buildtoolsCheckbox.checked === true) {
      $invalidActivities.hide();
      eventCostTotal += 100;
  }

  if(npmCheckbox.checked === true) {
      $invalidActivities.hide();
      eventCostTotal += 100;
  }

  $totalDisplay = $('<span>Total: $' + eventCostTotal + '</span>');
  $('.activities').append($totalDisplay);

});


//removing "select payment method" option and hiding paypal abd bitcoin divs
document.getElementById('payment').firstElementChild.remove();
$paypalIDiv.hide();
$bitcoinDiv.hide();

//Displays the appropriate payment method divs, when a selection is made from the payment select field.
$('#payment').change( function () {
  if ($('#payment').val() === 'credit card') {
        $creditCardDiv.show();
        $paypalIDiv.hide();
        $bitcoinDiv.hide();
}

  else if ($('#payment').val() === 'paypal') {
            $creditCardDiv.hide();
            $paypalIDiv.show();
            $bitcoinDiv.hide();
            $invalidCardNum.hide();
            $noZip.hide();
            $invalidZip.hide();
            $invalidCvv.hide();
}

  else if ($('#payment').val() === 'bitcoin') {
            $creditCardDiv.hide();
            $paypalIDiv.hide();
            $bitcoinDiv.show();
            $invalidCardNum.hide();
            $noZip.hide();
            $invalidZip.hide();
            $invalidCvv.hide();
}
});



//funtion to test if the user has entered a properly formatted email address
function validateEmail(email)
{
    const mail = /\S+@\S+\.\S+/;
    return mail.test(email);
}

//keyup event to let the user know in real time if there is an error with their email address
$('#mail').keyup( function () {
  const $email = $('#mail').val();
  if (!validateEmail($email)) {
      $('#mail').css('border-color', 'red');
      $invalidEmail.show();
 }
 else {
     $('#mail').css('border-color', '');
     $invalidEmail.hide();
 }

});

/* When the form is submitted. Verifies if the required fields are filled in correctly and
displays an error message and red border for the feils that do not meet the requirements.
If all fields are filled in correctly the form will submit.*/

 $('button').click( function (event) {
   const $name = $('#name').val();
   const $email = $('#mail').val();
   const $creditCardNum = $('#cc-num');
   const $zipCode = $('#zip');
   const $cvv = $('#cvv');
   let verified1 = false;
   let verified2 = false;
   let verified3 = false;
   let verified4 = false;
   let verified5 = false;
   let verified6 = false;
   event.preventDefault();

    if( $name === '') {
        $('#name').css('border-color', 'red');
        $invalidName.show();
    }
    else {
        $('#name').css('border-color', '');
          $invalidName.hide();
          verified1 = true;
    }

     if (!validateEmail($email)) {
         $('#mail').css('border-color', 'red');
         $invalidEmail.show();
    }
    else {
        $('#mail').css('border-color', '');
        $invalidEmail.hide();
        verified2 = true;
    }

    if ($('.activities input').each(function () {
        if(this.checked){
            $invalidActivities.hide();
            verified3 = true;
            return false;
        }
        else {
            $invalidActivities.show();
        }
      }));

    if ($("#payment").val() === 'credit card') {
        let ccNum = $('#cc-num').val();
        let zip = $('#zip').val();
        let cvv = $('#cvv').val();

        if(!isNaN(ccNum) && ccNum.length >= 13 && ccNum.length <= 16) {
          $invalidCardNum.hide();
          $creditCardNum.css('border-color', '');
          verified4 = true;
        }
        else {
          $invalidCardNum.show();
          $creditCardNum.css('border-color', 'red');
        }

        /*The zipcode field will display two different error messages depending
        on the error. Either the field is blank or dose not meet the 5 digit requireent. */
        if(!isNaN(zip) && zip.length === 5) {
          $invalidZip.hide();
          $noZip.hide();
          $zipCode.css('border-color', '');
          verified5 = true;
        }
        else if (zip === '') {
          $invalidZip.hide();
          $noZip.show();
          $zipCode.css('border-color', 'red');
        }
        else if (isNaN(zip) || ((zip.length === 5) === false)) {
          $noZip.hide();
          $invalidZip.show();
          $zipCode.css('border-color', 'red');
        }

        if(!isNaN(cvv) && cvv.length == 3) {
          $invalidCvv.hide();
          $cvv.css('border-color', '');
          verified6 = true;
        }
        else {
          $invalidCvv.show();
          $cvv.css('border-color', 'red');
        }
    }
    else {
          verified4 = true;
          verified5 = true;
          verified6 = true;
      }

    if (verified1 && verified2 && verified3 && verified4 && verified5 && verified6) {
        $('form').submit();
    }
 });
