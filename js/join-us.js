const joinForm = document.querySelector("#membershipForm");
const thankYouBox = document.querySelector("#thankYouMessage");
const phoneInput = joinForm.querySelector("#phone");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

const nameRegex = /^[\p{L}\s'-]{2,}$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^https?:\/\/.+$/;

joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const { isValid, firstInvalidField } = window.validateJoinForm({
    silent: false,
  });

  if (!isValid) {
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  const data = {
    firstName: joinForm.querySelector("#firstName").value.trim(),
    lastName: joinForm.querySelector("#lastName").value.trim(),
    address: joinForm.querySelector("#address").value.trim(),
    email: joinForm.querySelector("#email").value.trim(),
    phone: joinForm.querySelector("#phone").value.trim(),
    city: joinForm.querySelector("#city").value.trim(),
    motivation: joinForm.querySelector("#motivation").value.trim(),
  };

  console.log("Form submitted:", data);

  joinForm.reset();
  document.querySelector(".join-header").style.display = "none";
  document.querySelector(".membership-form").style.display = "none";
  thankYouBox.classList.remove("hidden");

  thankYouBox.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("beforeunload", () => {
  thankYouBox.classList.add("hidden");
});

window.validateJoinForm = function (options = { silent: false }) {
  const firstName = joinForm.querySelector("#firstName");
  const lastName = joinForm.querySelector("#lastName");
  const address = joinForm.querySelector("#address");
  const email = joinForm.querySelector("#email");
  const phone = joinForm.querySelector("#phone");
  const social = joinForm.querySelector("#social");

  let isValid = true;
  let firstInvalidField = null;

  function showOrUpdateError(inputId, langKey, fallbackMsg, conditionFn) {
    const input = document.querySelector(`#${inputId}`);
    const error = document.querySelector(`#${inputId}Error`);
    const translatedMsg = window.languageMap[langKey] || fallbackMsg;
    const val = input.value.trim();

    if (!conditionFn(val)) {
      isValid = false;
      if (error) {
        if (options.silent && error.textContent) {
          error.textContent = translatedMsg;
        } else if (!options.silent) {
          error.textContent = translatedMsg;
        }
      }
      if (!firstInvalidField) firstInvalidField = input;
    } else if (error && !options.silent) {
      error.textContent = "";
    }
  }

  showOrUpdateError(
    "firstName",
    "error_only_letters",
    "Only letters allowed.",
    (val) => nameRegex.test(val)
  );
  showOrUpdateError(
    "lastName",
    "error_only_letters",
    "Only letters allowed.",
    (val) => nameRegex.test(val)
  );
  showOrUpdateError(
    "address",
    "error_address_short",
    "Address is too short.",
    (val) => val.length >= 5
  );
  showOrUpdateError(
    "email",
    "error_invalid_email",
    "Invalid email format.",
    (val) => emailRegex.test(val)
  );
  showOrUpdateError(
    "phone",
    "error_invalid_phone",
    "Phone must be 7–15 digits.",
    (val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    }
  );
  showOrUpdateError(
    "social",
    "error_invalid_url",
    "Invalid URL.",
    (val) => val === "" || urlRegex.test(val)
  );

  return { isValid, firstInvalidField };
};
