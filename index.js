import { Calculator } from "./calculator.js";

const screenInput = document.querySelector(".screen");
const calculator = new Calculator();

document.querySelectorAll(".number").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    if (!screenInput) {
      return;
    }
    const num = event.target.dataset.value;
    calculator.setNumber(num);
    screenInput.value += num;
  });
});

document.querySelectorAll(".math-operation").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    calculator.setOperation(event.target.dataset.value);
    screenInput.value = "";
  });
});

document.querySelector(".delete-all").addEventListener("click", (event) => {
  calculator.deleteAll();
  screenInput.value = "";
});

document.querySelector(".delete-one").addEventListener("click", (event) => {
  if (screenInput.value !== "") {
    calculator.deleteOne();
    screenInput.value = screenInput.value.slice(0, -1);
  }
});

document.querySelector(".equal").addEventListener("click", () => {
  screenInput.value = calculator.calc();
});
