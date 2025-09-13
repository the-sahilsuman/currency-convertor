const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


const API_KEY = "a267527206bc20b5d9adae27";


for (let select of dropdowns) {
  for (let code in countryList) {
    let option = document.createElement("option");
    option.value = code;
    option.innerText = code;

    if (select.name === "from" && code === "USD") option.selected = true;
    if (select.name === "to" && code === "INR") option.selected = true;

    select.appendChild(option);
  }

  
  select.addEventListener("change", (e) => updateFlag(e.target));
}


function updateFlag(selectElement) {
  let code = selectElement.value;
  let countryCode = countryList[code];
  let img = selectElement.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}


async function updateExchangeRate() {
  let amtVal = parseFloat(document.querySelector(".amount input").value);
  if (isNaN(amtVal) || amtVal < 1) amtVal = 1;

  const from = fromCurr.value;
  const to = toCurr.value;

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();
    const rate = data.conversion_rates[to];

    if (!rate) {
      msg.innerText = "Exchange rate not available!";
      return;
    }

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
  } catch (err) {
    console.error(err);
    msg.innerText = "Exchange rate not available!";
  }
}


btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});


window.addEventListener("load", () => {
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
});
