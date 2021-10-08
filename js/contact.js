const mainSection = document.querySelector(".main-section");
const form = document.querySelector("#form");
const nameInput = document.querySelector("#your-name");
const nameError = document.querySelector(".nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector(".emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector(".subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector(".messageError");
const formSuccess = document.querySelector(".formSuccess");
const submit = document.querySelector(".submit");

submit.style.filter = "grayscale(100%)";
document.querySelector(".main-section").style.opacity = "1";
document.querySelector("h1").style.opacity = "1";

function checkAllInputs() {
  if (checkLength(nameInput.value, 5) && checkEmail(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {
    submit.disabled = false;
    submit.style.filter = "grayscale(0%)";
  } else {
    submit.disabled = true;
    submit.style.filter = "grayscale(100%)";
  }
}

nameInput.addEventListener("keyup", checkAllInputs);
email.addEventListener("keyup", checkAllInputs);
subject.addEventListener("keyup", checkAllInputs);
message.addEventListener("keyup", checkAllInputs);

nameInput.addEventListener("blur", (event) => {
  if (checkLength(nameInput.value, 5)) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

nameInput.addEventListener("focus", (event) => {
  if (nameInput) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }
});

email.addEventListener("blur", (event) => {
  if (checkEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});

email.addEventListener("focus", (event) => {
  if (email) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
});

subject.addEventListener("blur", (event) => {
  if (checkLength(subject.value, 15)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
});

subject.addEventListener("focus", (event) => {
  if (subject) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }
});

message.addEventListener("blur", (event) => {
  if (checkLength(message.value, 25)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
});

message.addEventListener("focus", (event) => {
  if (message) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
});

function setOpacity(opac) {
  const itemsOpac = document.querySelectorAll(".main-section, h1");

  itemsOpac.forEach(function (item) {
    item.style.opacity = opac;
  });
}

/* function submitForm(event) {
  event.preventDefault();

  formSuccess.style.display = "block";
  setOpacity("0.5");

  setTimeout(() => {
    formSuccess.style.display = "none";
    setOpacity("1");
  }, 3000);

  form.reset();
}

form.addEventListener("submit", submitForm); */

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const checkPattern = regEx.test(email);
  return checkPattern;
}

const contactFormUrl = "https://gamehub-maria.digital/projectexam1/wp-json/contact-form-7/v1/contact-forms/174/feedback";
/*Submit contact form data*/
const contactFormHandler = (event) => {
  event.preventDefault();

  const formElement = event.target,
    { action, method } = formElement,
    body = new FormData(formElement);

  fetch(action, {
    method,
    body
  })

    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log("Success");
      formSuccess.style.display = "block";
      setOpacity("0.5");

      setTimeout(() => {
        formSuccess.style.display = "none";
        setOpacity("1");
      }, 3000);

    })
    .catch((error) => {
      console.log("ERROR:", error);
      setErrorMessage(mainSection);
    })
};

form.addEventListener("submit", contactFormHandler);