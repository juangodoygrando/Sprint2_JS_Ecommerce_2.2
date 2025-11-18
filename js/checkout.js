// Exercise 6

// Get the input fields
const form = document.querySelector("form");
const inputName = document.getElementById("fName");
const inputEmail = document.getElementById("fEmail");
const inputAddress = document.getElementById("fAddress");
const inputLastName = document.getElementById("fLastN");
const inputPassword = document.getElementById("fPassword");
const inputPhone = document.getElementById("fPhone");

const errorName = document.getElementById("errorName");
const errorLastName = document.getElementById("errorLastN");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      const cartData = {
        name: fName.value.trim(),
        email: fEmail.value.trim(),
        phone: fPhone.value.trim(),
        address: fAddress.value.trim(),
        items: cartList,
        total: total,
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
  const adressValid = validateAdress();
  const phoneValid = validatePhone();

  if (
    nameValid &&
    lasNameValid &&
    emailValid &&
    passwordValid &&
    adressValid &&
    phoneValid
  ) {
    return true;
  } else {
    return false;
  }
};

const validateNameLasName = (input, errorClass) => {
  const inputValue = input.value.trim();
  if (inputValue == "" || inputValue.length <= 3) {
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
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  const inputValue = inputPassword.value.trim();
  if (inputValue.length < 4 || inputValue == "") {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "The password must be at least 4 characters long.";
    return false;
  } else if (!regexPassword.test(inputValue)) {
    inputPassword.classList.add("is-invalid");
    errorPassword.textContent =
      "The password must contain letters and numbers.";
    return false;
  } else {
    inputPassword.classList.remove("is-invalid");
    inputPassword.classList.add("is-valid");
    return true;
  }
};
const validateAdress = () => {
  const errorAddress = document.getElementById("errorAddress");
  const regexAdress = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s,.\-/#]+$/;
  const inputValue = inputAddress.value.trim();
  if (inputValue.length < 3 || inputValue == "") {
    inputAddress.classList.add("is-invalid");
    errorAddress.textContent =
      "This field is required and must have, at least,3 characters";
    return false;
  } else if (!regexAdress.test(inputValue)) {
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
  const regexPhone = /^\d{8,9}$/;
  const inputValue = inputPhone.value.trim();
  if (!/^\d*$/.test(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent =
      "Phone number can only contain digits and optional +34 at the start.";
    return false;
  } else if (!regexPhone.test(inputValue)) {
    inputPhone.classList.add("is-invalid");
    errorPhone.textContent = "Invalid phone number format.";
    return false;
  } else {
    inputPhone.classList.remove("is-invalid");
    inputPhone.classList.add("is-valid");
    return true;
  }
};

const resetForm = () => {
  const inputs = document.querySelectorAll("input");
  form.reset();

  inputs.forEach((input) => {
    input.classList.remove("is-valid");
  });
};
