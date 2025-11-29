const form = document.querySelector("form");
const inputName = document.getElementById("fName");
const inputEmail = document.getElementById("fEmail");
const inputAddress = document.getElementById("fAddress");
const inputLastName = document.getElementById("fLastN");
const inputPassword = document.getElementById("fPassword");
const inputPhone = document.getElementById("fPhone");

const errorName = document.getElementById("errorName");
const errorLastName = document.getElementById("errorLastN");

import { cartList, total } from "./cartLogic.js";


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      const cartData = {
        name: inputName.value.trim(),
        lasName: inputLastName.value.trim(),
        email: inputEmail.value.trim(),
        phone: inputPhone.value.trim(),
        address: inputAddress.value.trim(),
        items: cartList,
        Total:total
      };
      Swal.fire({
        title: "Success!",
        text: "Your form has been submitted successfully.",
        icon: "success",
      });
      console.log(cartData);
      resetForm();
    }
  });
}

const validate = () => {
  const nameValid = validateNameLasName(inputName, errorName);
  const lasNameValid = validateNameLasName(inputLastName, errorLastName);
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const addressValid = validateAddress();
  const phoneValid = validatePhone();

  if (
    nameValid &&
    lasNameValid &&
    emailValid &&
    passwordValid &&
    addressValid &&
    phoneValid
  ) {
    return true;
  } else {
    return false;
  }
};

const validateNameLasName = (input, errorClass) => {
  const inputValue = input.value.trim();
  if (inputValue == "" || inputValue.length < 3) {
    input.classList.add("is-invalid");
    errorClass.textContent =
      "This field is required and must have, at least, 3 characters";
    return false;
  } else if (/\d/.test(inputValue)) {
    input.classList.add("is-invalid");
    errorClass.textContent = "The field cannot contain numbers";
    return false;
  } else {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    return true;
  }
};

const validateEmail = () => {
  const errorEmail = document.getElementById("errorEmail");
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const inputValue = inputEmail.value.trim();
  if (
    inputValue == "" ||
    inputValue.length <= 3 ||
    !regexEmail.test(inputValue)
  ) {
    inputEmail.classList.add("is-invalid");
    return false;
  } else {
    inputEmail.classList.remove("is-invalid");
    inputEmail.classList.add("is-valid");
    return true;
  }
};

const validatePassword = () => {
  const errorPassword = document.getElementById("errorPassword");
  const inputValue = inputPassword.value.trim();

  const regexLettersNumbers = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  const weakAutoPasswords = [
    "1234",
    "12345",
    "123456",
    "password",
    "pass123",
    "test",
    "test123",
    "qwerty",
    "abcd",
    "abc123",
    "admin",
    "user123",
  ];

  if (!inputValue) {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent = "The password cannot be empty.";
    return false;
  }

  if (inputValue.length < 4) {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "The password must be at least 4 characters long.";
    return false;
  }

  if (weakAutoPasswords.includes(inputValue.toLowerCase())) {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "The password is too weak or automatically generated. Please choose another.";
    return false;
  }

  if (!regexLettersNumbers.test(inputValue)) {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "The password must contain both letters and numbers.";
    return false;
  }

  if (/^(.)\1+$/.test(inputValue)) {
    // ej: "1111", "aaaa"
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent = "The password cannot be a repeated pattern.";
    return false;
  }

  inputPassword.classList.remove("is-invalid");
  inputPassword.classList.add("is-valid");
  return true;
};

const validateAddress = () => {
  const errorAddress = document.getElementById("errorAddress");
  const regexAddress = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s,.\-/#]+$/;
  const inputValue = inputAddress.value.trim();
  if (inputValue.length < 3 || inputValue == "") {
    inputAddress.classList.add("is-invalid");
    errorAddress.textContent =
      "This field is required and must have, at least,3 characters";
    return false;
  } else if (!regexAddress.test(inputValue)) {
    inputAddress.classList.add("is-invalid");
    errorAddress.textContent =
      "Only letters, numbers, spaces, and , . - / # are allowed.";
    return false;
  } else {
    inputAddress.classList.remove("is-invalid");
    inputAddress.classList.add("is-valid");
    return true;
  }
};

const validatePhone = () => {
  const errorPhone = document.getElementById("errorPhone");

  let inputValue = inputPhone.value.trim().replace(/[()\s-]/g, "");

  const regexValidChars = /^\+?\d+$/;

  const regexLength = /^\+?\d{7,15}$/;

  const fakePhones = new Set([
    "123456789",
    "111111111",
    "000000000",
    "+34123456789",
    "+34000000000",
  ]);

  if (!inputValue) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent = "Phone number cannot be empty.";
    return false;
  }

  if (fakePhones.has(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent =
      "The phone number appears to be automatically generated.";
    return false;
  }

  if (!regexValidChars.test(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent =
      "Phone number can only contain digits (and an optional leading +).";
    return false;
  }

  if (!regexLength.test(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent = "Phone number length is not valid.";
    return false;
  }

  if (/12345/.test(inputValue) || /98765/.test(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent = "Sequential numbers are not allowed.";
    return false;
  }

  inputPhone.classList.remove("is-invalid");
  inputPhone.classList.add("is-valid");
  return true;
};

const resetForm = () => {
  const inputs = document.querySelectorAll("input");
  form.reset();

  inputs.forEach((input) => {
    input.classList.remove("is-valid");
  });
};
