const OPERATIONS = ["*", "/", "+", "-"];
const isOperation = (val) => OPERATIONS.some((operation) => operation === val);

export class Calculator {
  __inputString = "";

  setNumber(val) {
    this.__inputString += val;
  }

  setOperation(val) {
    if (
      isOperation(this.__inputString.slice(-1)) &&
      this.__inputString !== ""
    ) {
      this.__inputString = this.__inputString.slice(0, -1);
    }
    this.__inputString += val;
  }

  deleteAll = () => {
    this.__inputString = "";
  };

  deleteOne = () => {
    this.__inputString = this.__inputString.slice(0, -1);
  };

  calc = () => {
    const numberArray = this.__inputString.match(/\d+/g);
    const symbolArray = this.__inputString.match(/[^\d\s]+/g);
    return this.handleCalculations(symbolArray, numberArray);
  };

  handleCalculations(symbols, numbers) {
    while (symbols.includes("*") || symbols.includes("/")) {
      const symbolIndex = symbols.findIndex(
        (element) => element === "*" || element === "/"
      );
      if (symbols[symbolIndex] === "*") {
        numbers[symbolIndex] = numbers[symbolIndex] * numbers[symbolIndex + 1];
      } else {
        numbers[symbolIndex] = numbers[symbolIndex] / numbers[symbolIndex + 1];
      }
      numbers.splice(symbolIndex + 1, 1);
      symbols.splice(symbolIndex, 1);
    }
    while (numbers.length > 1) {
      if (symbols[0] === "+") {
        numbers[0] = +numbers[0] + +numbers[1];
      } else {
        numbers[0] = numbers[0] - numbers[1];
      }
      numbers.splice(1, 1);
      symbols.splice(1, 1);
    }
    this.__inputString = numbers;
    return numbers;
  }
}
