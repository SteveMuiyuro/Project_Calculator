class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.clear();
  }

  clear() {
    this.currentOPerand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOPerand = this.currentOPerand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOPerand.includes(".")) return;
    this.currentOPerand = this.currentOPerand.toString() + number.toString();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(intergerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentInput.innerText = this.getDisplayNumber(this.currentOPerand);
    if (this.operation != null) {
      this.previousInput.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousInput.innerText = "";
    }
  }

  chooseOPeration(operation) {
    if (this.currentOPerand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOPerand;
    this.currentOPerand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOPerand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOPerand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
}

const allNumbersButtons = document.querySelectorAll("[data-number]");
const allOPerationsButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousInput = document.querySelector("[data-display-prev]");
const currentInput = document.querySelector("[data-display-current]");

const calculator = new Calculator(previousInput, currentInput);

allNumbersButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

allOPerationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOPeration(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
