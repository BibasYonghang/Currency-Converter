const API = "https://open.er-api.com/v6/latest";
const currencySelect = document.querySelectorAll(".currency select");
const fromCurr = document.querySelector("#select1");
const toCurr = document.querySelector("#select2");
const btn = document.querySelector(".check-btn");
const resultDiv = document.querySelector(".result");

import { countryList } from './newFolder/country.js'

// Populate dropdowns
for (let select of currencySelect) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "NPR") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const amountInput = document.querySelector(".input-amount");
  let amtVal = parseFloat(amountInput.value);

  if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  try {
    const res = await fetch(`${API}/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amtVal * rate).toFixed(2);

    resultDiv.innerText = `${amtVal} ${from} = ${converted} ${to}`;
  } catch (err) {
    resultDiv.innerText = "Conversion failed. Please try again.";
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const infoSection = document.querySelector('.info-section');
  infoSection.classList.add('animate');
});







