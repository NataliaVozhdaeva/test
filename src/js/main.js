const email = document.querySelector('#email');
email.value = '';

const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
passwordConfirm.value = '';

const popup = document.createElement('span');

const correctValidation = (input, label) => {
  input.classList.remove('error');
  label.classList.add('correct');
  if (document.querySelector('.popup')) {
    let popup = document.querySelector('.popup');
    popup.parentNode.removeChild(popup);
  }
};

const nonCorrectValidation = (input, label, popupText) => {
  input.classList.add('error');
  label.classList.remove('correct');
  popup.textContent = popupText; //'Please, check adress';
  popup.classList.add('popup');
  label.append(popup);
};

email.onchange = function () {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
  const emailAdress = email.value;
  const emailLabel = document.querySelector('.email');

  if (re.test(emailAdress)) {
    correctValidation(email, emailLabel);
  } else {
    nonCorrectValidation(email, emailLabel, 'Please, check adress');
  }
};

password.onchange = function () {
  const re = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
  const userPassword = password.value;
  const passwordLabel = document.querySelector('.password');

  if (re.test(userPassword)) {
    correctValidation(password, passwordLabel);
  } else {
    nonCorrectValidation(password, passwordLabel, 'Please, use more than 7 digits and letters in both case');
  }
};

passwordConfirm.onchange = function () {
  const passwordConfirmLabel = document.querySelector('.passwordConfirm');

  if (passwordConfirm.value === password.value) {
    correctValidation(passwordConfirm, passwordConfirmLabel);
  } else {
    nonCorrectValidation(passwordConfirm, passwordConfirmLabel, 'Text shoud repeate the password');
    passwordConfirmLabel.append(popup);
  }
};

//^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$
