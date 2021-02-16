const userInfoLink = document.getElementById('user-info-link');
const userScheduleLink = document.getElementById('user-schedule-link');

const userIdValidation = (event) => {
  const userId = document.getElementById('user_id');
  const userIdEmptyAlert = document.getElementById('user-id-empty-alert');
  
  const userIdValue = userId.value;

  if (userIdValue === "") {
    userIdEmptyAlert.style.visibility = 'visible';
    event.preventDefault();
  } else {
    userInfoLink.href = `/users/${userIdValue}`
    userScheduleLink.href = `/users/${userIdValue}/schedules`
    console.log(event.target.href)
  }
};

userInfoLink.onclick = userIdValidation;
userScheduleLink.onclick = userIdValidation;