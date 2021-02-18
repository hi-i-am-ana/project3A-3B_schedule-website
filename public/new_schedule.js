const form = document.getElementById('form');

// Select input fields
const userId = document.getElementById('user_id');
const day = document.getElementById('day');
const startAt = document.getElementById('start_at');
const endAt = document.getElementById('end_at');

// Select validation alerts
const userIdEmptyAlert = document.getElementById('user-id-empty-alert');
const dayEmptyAlert = document.getElementById('day-empty-alert');
const startAtEmptyAlert = document.getElementById('start-at-empty-alert');
const endAtEmptyAlert = document.getElementById('end-at-empty-alert');
const timeInvalidAlert = document.getElementById('time-invalid-alert');

// Create variable to save validation status
let validForm;

form.onsubmit = (event) => {
  // Get values of input fields
  const userIdValue = userId.value;
  const dayValue = day.value;
  const startAtValue = startAt.value;
  const endAtValue = endAt.value;

  clearValidation();

  // Validate userId (must not be empty)
  if (!inputNotEmpty(userIdValue)) {
    setInvalid(userIdEmptyAlert, userId);
  };

  // Validate day (must not be empty)
  if (!inputNotEmpty(dayValue)) {
    setInvalid(dayEmptyAlert, day);
  };

  // Validate start time (must not be empty)
  if (!inputNotEmpty(startAtValue)) {
    setInvalid(startAtEmptyAlert, startAt);
  };

  // Validate end time (must not be empty)
  if (!inputNotEmpty(endAtValue)) {
    setInvalid(endAtEmptyAlert, endAt);
  };

  // Validate time (end time must be later than start time)
  if (!timeValid(startAtValue, endAtValue) && inputNotEmpty(startAtValue) && inputNotEmpty(endAtValue)) {
    setInvalid(timeInvalidAlert, endAt);
  };

  if (!validForm) {
    event.preventDefault();
  };
};

const inputNotEmpty = (inputValue) => inputValue !== '';

const  timeValid = (startAtValue, endAtValue) => {
  const timeArray = ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'];
  return timeArray.indexOf(startAtValue) < timeArray.indexOf(endAtValue)
};

const setInvalid = (inputAlert, input) => {
  inputAlert.style.visibility = 'visible';
  input.style.border = 'solid 1px red';
  validForm = false;
};

const clearValidation = () => {
  validForm = true;

  userIdEmptyAlert.style.visibility = 'hidden';
  dayEmptyAlert.style.visibility = 'hidden';
  startAtEmptyAlert.style.visibility = 'hidden';
  endAtEmptyAlert.style.visibility = 'hidden';
  timeInvalidAlert.style.visibility = 'hidden';

  userId.style.border = '';
  day.style.border = '';
  startAt.style.border = '';
  endAt.style.border = '';
};