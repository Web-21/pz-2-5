let display = document.getElementById("display");
let currentInput = "";
let operator = "";
let previousInput = "";

function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(number) {
  currentInput += number;
  updateDisplay(currentInput);
}

function appendDot() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay(currentInput);
  }
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
}

function toggleSign() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay(currentInput);
  }
}

function percent() {
  if (currentInput) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay(currentInput);
  }
}

function appendOperator(op) {
  if (currentInput) {
    operator = op;
    previousInput = currentInput;
    currentInput = "";
  }
}

function calculate() {
  let result = 0;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "−":
      result = prev - curr;
      break;
    case "×":
      result = prev * curr;
      break;
    case "÷":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay(currentInput);
}
