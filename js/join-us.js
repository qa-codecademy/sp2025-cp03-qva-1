const joinForm = document.querySelector("#membershipForm");
const thankYouBox = document.querySelector("#thankYouMessage");
const phoneInput = joinForm.querySelector("#phone");

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

joinForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = joinForm.querySelector("#firstName");
  const lastName = joinForm.querySelector("#lastName");
  const address = joinForm.querySelector("#address");
  const email = joinForm.querySelector("#email");
  const phone = joinForm.querySelector("#phone");
  const city = joinForm.querySelector("#city");
  const social = joinForm.querySelector("#social");

  const nameRegex = /^[A-Za-zÀ-ž\s'-]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^https?:\/\/.+$/;

  joinForm
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  let isValid = true;
  let firstInvalidField = null;

  if (!nameRegex.test(firstName.value.trim())) {
    isValid = false;
    document.querySelector("#firstNameError").textContent =
      "Only letters allowed.";
    if (!firstInvalidField) firstInvalidField = firstName;
  }

  if (!nameRegex.test(lastName.value.trim())) {
    isValid = false;
    document.querySelector("#lastNameError").textContent =
      "Only letters allowed.";
    if (!firstInvalidField) firstInvalidField = lastName;
  }

  if (address.value.trim().length < 5) {
    isValid = false;
    document.querySelector("#addressError").textContent =
      "Address is too short.";
    if (!firstInvalidField) firstInvalidField = address;
  }

  if (!emailRegex.test(email.value.trim())) {
    isValid = false;
    document.querySelector("#emailError").textContent = "Invalid email format.";
    if (!firstInvalidField) firstInvalidField = email;
  }

  const digitsOnly = phone.value.replace(/\D/g, "");
  if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    isValid = false;
    document.querySelector("#phoneError").textContent =
      "Phone must be 7–15 digits.";
    if (!firstInvalidField) firstInvalidField = phone;
  }

  if (social.value && !urlRegex.test(social.value.trim())) {
    isValid = false;
    document.querySelector("#socialError").textContent = "Invalid URL.";
    if (!firstInvalidField) firstInvalidField = social;
  }

  if (!isValid) {
    firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalidField.focus();
    return;
  }

  const data = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    address: address.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    city: city.value.trim(),
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
