// HTML ELEMENTS
const btn = document.querySelector("#btn");
const result = document.querySelector(".result");
let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let form = document.querySelector("form");

day.max = 31;
day.min = 1;
month.max = 12;
month.min = 1;
year.max = new Date().getFullYear();

const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const calcularEdad = (day, month, year) => {
  //   const day = parseInt(document.getElementById("day").value);
  //   const month = parseInt(document.getElementById("month").value);
  //   const year = parseInt(document.getElementById("year").value);
  let today = new Date();
  let d1 = today.getDay(),
    m1 = today.getMonth() + 1,
    y1 = today.getFullYear(),
    y2,
    m2,
    d2;

  y2 = y1 - year;

  if (m1 >= month) m2 = m1 - month;
  else {
    y2--;
    m2 = 12 + m1 - month;
  }

  if (d1 >= day) d2 = d1 - day;
  else {
    m2--;
    d2 = getDaysInMonth(year, month) + d1 - day;
  }

  if (m1 < 0) {
    m2 = 11;
    y2--;
  }

  console.log(d2, m2, y2);

  return [d2, m2, y2];
};

const setErrorFor = (input, message) => {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-group error";
  small.innerText = message;
};

const checkInputs = () => {
  let days = dayInput.value.trim();
  let month = monthInput.value.trim();
  let year = yearInput.value.trim();

  if (days === "") {
    setErrorFor(dayInput, "This field is required");
    form.classList.add("empty");
  }

  if (month === "") {
    setErrorFor(monthInput, "This field is required");
    form.classList.add("empty");
  }

  if (year === "") {
    setErrorFor(yearInput, "This field is required");
    form.classList.add("empty");
  }

  days = parseInt(days);
  month = parseInt(month);
  year = parseInt(year);

  if (days > 32 || days < 0) {
    setErrorFor(dayInput, "Must be valid day");
    form.classList.add("empty");
  }

  if (month > 12 || month < 0) {
    setErrorFor(monthInput, "Must be valid month");
    form.classList.add("empty");
  }

  if (year > new Date().getFullYear() || year < 0) {
    setErrorFor(yearInput, "Must be in past");
    form.classList.add("empty");
  }

  daysInMonth = getDaysInMonth(year, month);
  if (days > daysInMonth) {
    setErrorFor(dayInput, "Must be valid date");
    form.classList.add("empty");
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.remove("empty");
  checkInputs();
  if (!form.classList.contains("empty")) {
    form.querySelectorAll(".form-group").forEach((element) => {
      element.classList.remove("error");
    });
    let dia = parseInt(document.getElementById("day").value);
    let month = parseInt(document.getElementById("month").value);
    let year = parseInt(document.getElementById("year").value);
    let edad = calcularEdad(dia, month, year);
    result.innerHTML = `
      <div class="year">
        <p>${edad[2]} <strong>years</strong></p>
      </div>
      <div class="month">
        <p>${edad[1]} <strong>months</strong></p>
      </div>
      <div class="day">
        <p>${edad[0]} <strong>days</strong></p>
      </div>
    `;
  }
});
