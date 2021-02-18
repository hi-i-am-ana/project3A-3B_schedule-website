const form = document.getElementById('form');

// Select input fields
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');

// Select validation alerts
const firstnameEmptyAlert = document.getElementById('firstname-empty-alert');
const firstnameInvalidAlert = document.getElementById('firstname-invalid-alert');
const lastnameEmptyAlert = document.getElementById('lastname-empty-alert');
const lastnameInvalidAlert = document.getElementById('lastname-invalid-alert');
const emailEmptyAlert = document.getElementById('email-empty-alert');
const emailInvalidAlert = document.getElementById('email-invalid-alert');
const passwordEmptyAlert = document.getElementById('password-empty-alert');

const emailExistsAlert = document.getElementById('email-exists-alert');

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const firstnameValue = firstname.value;
  const lastnameValue = lastname.value;
  const emailValue = email.value;
  const passwordValue = password.value;

  clearValidation();

  // Validate firstname (must be entered and have valid format)
  if (!inputNotEmpty(firstnameValue)) {
    setInvalid(firstnameEmptyAlert, firstname);
  } else if (!nameValid(firstnameValue)) {
    setInvalid(firstnameInvalidAlert, firstname);
  };

  // Validate lastname (must be entered and have valid format)
  if (!inputNotEmpty(lastnameValue)) {
    setInvalid(lastnameEmptyAlert, lastname);
  } else if (!nameValid(lastnameValue)) {
    setInvalid(lastnameInvalidAlert, lastname);
  };

  // Validate email (must be entered and have valid format)
  if (!inputNotEmpty(emailValue)) {
    setInvalid(emailEmptyAlert, email);
  } else if (!emailValid(emailValue)) {
    setInvalid(emailInvalidAlert, email);
  };

  // Validate start time (must be entered)
  if (!inputNotEmpty(passwordValue)) {
    setInvalid(passwordEmptyAlert, password);
  };

  if (!validForm) {
    event.preventDefault();
  };
};

firstname.onfocus = (event) => {
  emailExistsAlert.classList.remove('display-block');
};
lastname.onfocus = (event) => {
  emailExistsAlert.classList.remove('display-block');
};
email.onfocus = (event) => {
  emailExistsAlert.classList.remove('display-block');
};
password.onfocus = (event) => {
  emailExistsAlert.classList.remove('display-block');
};

const inputNotEmpty = (inputValue) => inputValue !== '';

const nameValid = (inputValue) => {
  const nameRegex = /^[a-zA-Z][^0-9_.,!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]*$/;
  return nameRegex.test(inputValue);
};

const emailValid = (inputValue) => {
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(inputValue);
};

const setInvalid = (inputAlert, input) => {
  inputAlert.style.visibility = 'visible';
  input.style.border = 'solid 1px red';
  validForm = false;
};

const clearValidation = () => {
  validForm = true;

  firstnameEmptyAlert.style.visibility = 'hidden';
  firstnameInvalidAlert.style.visibility = 'hidden';
  lastnameEmptyAlert.style.visibility = 'hidden';
  lastnameInvalidAlert.style.visibility = 'hidden';
  emailEmptyAlert.style.visibility = 'hidden';
  emailInvalidAlert.style.visibility = 'hidden';
  passwordEmptyAlert.style.visibility = 'hidden';

  firstname.style.border = '';
  lastname.style.border = '';
  email.style.border = '';
  password.style.border = '';
};