import { countryList } from "./country.js";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".check-btn");
const fromCurr = document.getElementById("select1");
const toCurr = document.getElementById("select2");
const amountInput = document.querySelector(".input-amount");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.textContent = currCode;

    if (select.id === "select1" && currCode === "NPR") {
      option.selected = true;
    } else if (select.id === "select2" && currCode === "USD") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Update flag
function updateFlag(element) {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;

  const img = element.parentElement.querySelector("img");
  if (img) {
    img.src = flagUrl;
  }
}

// Button click
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amtVal = parseFloat(amountInput.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurr.value];

    if (rate) {
      const total = (amtVal * rate).toFixed(2);
      msg.textContent = `${amtVal} ${fromCurr.value} = ${total} ${toCurr.value}`;
    } else {
      msg.textContent = "Conversion rate not found.";
    }
  } catch (err) {
    msg.textContent = "Failed to fetch exchange rate.";
  }
});
