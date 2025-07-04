const form = document.querySelector(".form");
const phoneInput = document.querySelector(".phone");
const thankYouBox = document.querySelector("#contactThankYou");
const contactFormWrapper = document.querySelector(".contact-form");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

const nameRegex = /^[\p{L}\s'-]{2,}$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const { isValid, firstInvalidField } = window.validateForm({ silent: false });

  if (!isValid) {
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  form.reset();
  contactFormWrapper.style.display = "none";

  thankYouBox.classList.remove("hidden");

  const boxTop = thankYouBox.getBoundingClientRect().top + window.pageYOffset;
  const boxHeight = thankYouBox.offsetHeight;
  const windowHeight = window.innerHeight;

  window.scrollTo({
    top: boxTop - windowHeight / 2 + boxHeight / 2,
    behavior: "smooth",
  });
});

window.addEventListener("beforeunload", () => {
  thankYouBox.classList.add("hidden");
});

function showError(inputElement, message) {
  const error = document.createElement("div");
  error.classList.add("error-message");
  error.textContent = message;
  inputElement.insertAdjacentElement("afterend", error);
}

window.validateForm = function (options = { silent: false }) {
  const firstNameInput = form.querySelector(".first-name");
  const lastNameInput = form.querySelector(".last-name");
  const emailInput = form.querySelector(".email");
  const phoneInput = form.querySelector(".phone");

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  let isValid = true;
  let firstInvalidField = null;

  function updateOrShowError(input, key, fallback) {
    const existingError = input.nextElementSibling;
    const translatedMessage = window.languageMap[key] || fallback;

    if (!nameRegex.test(firstName) && input === firstNameInput) {
      isValid = false;
      if (existingError?.classList.contains("error-message")) {
        existingError.textContent = translatedMessage;
      } else if (!options.silent) {
        showError(input, translatedMessage);
      }
      if (!firstInvalidField) firstInvalidField = input;
    }

    if (!nameRegex.test(lastName) && input === lastNameInput) {
      isValid = false;
      if (existingError?.classList.contains("error-message")) {
        existingError.textContent = translatedMessage;
      } else if (!options.silent) {
        showError(input, translatedMessage);
      }
      if (!firstInvalidField) firstInvalidField = input;
    }

    if (!emailRegex.test(email) && input === emailInput) {
      isValid = false;
      if (existingError?.classList.contains("error-message")) {
        existingError.textContent = translatedMessage;
      } else if (!options.silent) {
        showError(input, translatedMessage);
      }
      if (!firstInvalidField) firstInvalidField = input;
    }

    const digitsOnly = phone.replace(/\D/g, "");
    if (
      (digitsOnly.length < 7 || digitsOnly.length > 15) &&
      input === phoneInput
    ) {
      isValid = false;
      if (existingError?.classList.contains("error-message")) {
        existingError.textContent = translatedMessage;
      } else if (!options.silent) {
        showError(input, translatedMessage);
      }
      if (!firstInvalidField) firstInvalidField = input;
    }
  }

  if (!options.silent) {
    form.querySelectorAll(".error-message").forEach((el) => el.remove());
  }

  updateOrShowError(
    firstNameInput,
    "error_only_letters",
    "Only letters allowed."
  );
  updateOrShowError(
    lastNameInput,
    "error_only_letters",
    "Only letters allowed."
  );
  updateOrShowError(emailInput, "error_invalid_email", "Invalid email format.");
  updateOrShowError(
    phoneInput,
    "error_invalid_phone",
    "Phone must be 7–15 digits."
  );

  return { isValid, firstInvalidField };
};
