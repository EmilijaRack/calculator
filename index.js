const screenInput = document.querySelector(".screen");
let inputString = "";
let operationClicked = false;

document.querySelectorAll(".number").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    handleNumbers(event.target.getAttribute("data-value"));
  });
});

const handleNumbers = (val) => {
  if (!screenInput) {
    return;
  }
  if (operationClicked) {
    screenInput.value = val;
    inputString += val;
    operationClicked = false;
    return;
  }
  screenInput.value += val;
  inputString += val;
};

document.querySelectorAll(".math-operation").forEach((elem) => {
  elem.addEventListener("click", (event) => {
    handleOperations(event.target.getAttribute("data-value"));
  });
});

const handleOperations = (val) => {
  if (!isNaN(Number(inputString.slice(-1))) && screenInput.value != "") {
    inputString += val;
    operationClicked = true;
  } else {
    inputString = inputString.substring(0, inputString.length - 1);
    inputString += val;
    operationClicked = true;
  }
};

document.querySelector(".delete-all").addEventListener("click", (event) => {
  handleDeleteAll();
});

document.querySelector(".delete-one").addEventListener("click", (event) => {
  handleDeleteOne();
});

document.querySelector(".equal").addEventListener("click", () => {
  screenInput.value = getAnswer(inputString);
});

const handleDeleteAll = () => {
  inputString = "";
  screenInput.value = "";
};

const handleDeleteOne = () => {
  screenInput.value = screenInput.value.substring(
    0,
    screenInput.value.length - 1
  );
};

const getAnswer = (val) => {
  const numberArray = val.match(/\d+/g);
  const symbolArray = val.match(/[^\d\s]+/g);
  return handleCalculations(symbolArray, numberArray);
};

const handleCalculations = (symbols, numbers) => {
  while (symbols.includes("×") || symbols.includes("÷")) {
    const symbolIndex = symbols.findIndex(
      (element) => element === "×" || element === "÷"
    );
    if (symbols[symbolIndex] === "×") {
      numbers[symbolIndex] =
        Number(numbers[symbolIndex]) * Number(numbers[symbolIndex + 1]);
    } else {
      numbers[symbolIndex] =
        Number(numbers[symbolIndex]) / Number(numbers[symbolIndex + 1]);
    }
    numbers.splice(symbolIndex + 1, 1);
    symbols.splice(symbolIndex, 1);
  }
  while (numbers.length > 1) {
    if (symbols[0] === "+") {
      numbers[0] = Number(numbers[0]) + Number(numbers[1]);
    } else {
      numbers[0] = Number(numbers[0]) - Number(numbers[1]);
    }
    numbers.splice(1, 1);
    symbols.splice(1, 1);
  }
  return numbers;
};
