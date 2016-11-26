var $name    = $('#name-field');
var $email   = $('#email-field');
var $phone   = $('#phone-field');
var $warning = $('div#warning');
var $pwdB    = $('#pwd-b-field');
var $pwdA    = $('#pwd-a-field');
var $submit  = $('#register-submit');

// compare passwords
var doesItMatch = function(a, b) {
  return a === b;
};

// check name contains first and last (at least)

var validateName = function() {
  if (!$name.val()) {
    $warning.html(`
      <h4>Please enter your name</h4>
      <h4>... so we need to know what to call you</h4>
    `);
    return false;
  }
  else if ($name.val().split(' ').length < 2) {
    $warning.html(`
      <h4>Please enter your first AND last name</h4>
    `);
    return false;
  }
  else {
    $warning.empty();
    return true;
  }

};

// check passwords match and meet criteria
var validatePassword = function() {
  if (!$pwdA.val()|| !$pwdB.val()) {
    $warning.html(`
      <h4>Please enter your password in both fields</h4>
    `);
    return false;
  }
  else if ($pwdA.val().length < 8) {
    $warning.html(`
      <h4>Please make sure your password is 8 or more characters</h4>
    `);
    return false;
  }
  else if (!doesItMatch($pwdA.val(), $pwdB.val())) {
    $warning.html(`
      <h4>Uh-oh - your passwords don't match!</h4>
    `);
    return false;
  }
  else {
    $warning.empty();
    return true;
  }
};

var validateEmail = function() {
  if (!$email.val()) {
    $warning.html(`
      <h4>Please enter a valid email address</h4>
    `);
    return false;
  }
  else {
    $warning.empty();
    return true;
  }
}

// validate phone number entry
var validatePhoneNumber = function() {
  // if empty, display warning
  if (!$phone.val()) {
    $warning.html(`
      <h4>Please enter a phone number</h4>
      <h4>(used only to notify you of your order status)</h4>
    `);
    return false;
  }
  // if incorrectly formatted...
  else if ($phone.val().length < 10) {
   $warning.html(`
      <h4>Please enter your phone number like this:</h4>
      <h4>3331115555 (no extra characters)</h4>
    `);
    return false;

  }
  else if ($phone.val().length > 10) {
   $warning.html(`
      <h4>Your phone number is too long...</h4>
      <h4>Please enter your phone number like this:</h4>
      <h4>3331115555 (no extra characters)</h4>
    `);
    return false;
  }
  else {
    $warning.empty();
    return true;
  }
};

var makeSubmitButtonActive = function() {
  $submit.toggleClass('form-ready-btn');
  $submit.toggleClass('form-incomplete');
  $submit.html('Register & sign in');
  $submit.prop({disabled: false});
};

var makeSubmitButtonInactive = function() {
  $submit.toggleClass('form-incomplete');
  $submit.html('Form incomplete');
  $submit.prop({disabled: true});
};

var validateForm = function() {
  if (validateName()        &&
      validateEmail()       &&
      validatePhoneNumber() &&
      validatePassword()) {
    // if all above are true
    makeSubmitButtonActive();
  }
  else {
    makeSubmitButtonInactive();
  }
};

$(document).ready(function() {

  $warning.empty();
  $('#register-submit').prop({disabled: true});

  $name.blur(function() {
    validateName();
  });
  $email.blur(function() {
    validateEmail();
  });
  $phone.blur(function() {
    validatePhoneNumber();
  });
  $pwdB.keyup(function() {
    validatePassword();
    validateForm();
  });

});