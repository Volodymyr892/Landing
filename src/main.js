function initMainJSLogic() {
    const openModalBtn = document.querySelector(".buttonReg");
    const closeModalBtn = document.querySelector(".close");
    const modal = document.querySelector(".modal");
  
    if (openModalBtn && closeModalBtn && modal) {
      openModalBtn.addEventListener("click", function () {
        modal.classList.add("show");
      });
  
      closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
      });
  
      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.classList.remove("show");
        }
      });
    }
  }

  function startTimer() {
const targetDate = new Date('2025-03-01T00:00:00');
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const modalDaysElement = document.getElementById("modal-days");
  const modalHoursElement = document.getElementById("modal-hours");
  const modalMinutesElement = document.getElementById("modal-minutes");
  const modalSecondsElement = document.getElementById("modal-seconds");

  setInterval(function () {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysElement.textContent = "0";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

   
    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, '0');  
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  }, 1000);


  setInterval(function () {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        modalDaysElement.textContent = "0";
        modalHoursElement.textContent = "00";
        modalMinutesElement.textContent = "00";
        modalSecondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    modalDaysElement.textContent = days;
    modalHoursElement.textContent = String(hours).padStart(2, '0');
    modalMinutesElement.textContent = String(minutes).padStart(2, '0');
    modalSecondsElement.textContent = String(seconds).padStart(2, '0');
}, 1000);
  }


function initFormValidation() {
    const form = document.querySelector(".form");
    const formModal = document.querySelector(".formModal");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            handleFormSubmission(form);
        });
    }

    if (formModal) {
        formModal.addEventListener("submit", function (event) {
            event.preventDefault();
            handleFormSubmission(formModal);
        });
    }
}

function handleFormSubmission(form) {
    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const phoneInput = form.querySelector("#phone");
    const agreementCheckbox = form.querySelector("#agreement");

    let isValid = true;

    // Очистка попередніх помилок
    [nameInput, emailInput, phoneInput, agreementCheckbox].forEach(input => {
        input.classList.remove("error");
    });

    if (!nameInput.value.trim()) {
        nameInput.classList.add("error");
        isValid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add("error");
        isValid = false;
    }

    if (!phoneInput.value.trim() || !/^\+380\s\d{2}\s\d{2}\s\d{2}\s\d{3}$/.test(phoneInput.value.trim())) {
        phoneInput.classList.add("error");
        isValid = false;
    }

    if (!agreementCheckbox.checked) {
        agreementCheckbox.classList.add("error");
        isValid = false;
    }

    if (!isValid) {
        console.log("Форма містить помилки.");
        return;
    }

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        agreement: agreementCheckbox.checked
    };

    fetch("https://example.com/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Форма успішно відправлена!", data);
        alert("Реєстрація успішна!");
        form.reset();
    })
    .catch(error => {
        console.error("Помилка надсилання форми:", error);
        alert("Помилка реєстрації, спробуйте ще раз.");
    });
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}


  document.addEventListener("DOMContentLoaded", function () {
    initMainJSLogic();
  });
