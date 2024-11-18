let displayValue = '0';
let currentOperation = null;
let firstOperand = null;

const display = document.getElementById("display");
const calculator = document.getElementById("calculator");

function updateDisplay() {
  display.textContent = displayValue;
}

function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  currentOperation = null;
  updateDisplay();
}

function appendNumber(number) {
  if (displayValue === '0') {
    displayValue = number.toString();
  } else {
    displayValue += number.toString();
  }
  updateDisplay();
}

function appendDot() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function toggleSign() {
  displayValue = (parseFloat(displayValue) * -1).toString();
  updateDisplay();
}

function calculatePercentage() {
  displayValue = (parseFloat(displayValue) / 100).toString();
  updateDisplay();
}

function operate(operator) {
  if (currentOperation !== null) {
    calculate();
  }
  firstOperand = parseFloat(displayValue);
  currentOperation = operator;
  displayValue = '0';
}

function calculate() {
  if (currentOperation === null || firstOperand === null) return;
  let result;
  const secondOperand = parseFloat(displayValue);
  switch (currentOperation) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }
  displayValue = result.toString();
  currentOperation = null;
  firstOperand = null;
  updateDisplay();
}

function saveResult() {
  localStorage.setItem("savedResult", displayValue);
}

function pasteResult() {
  const savedResult = localStorage.getItem("savedResult");
  if (savedResult !== null) {
    displayValue = savedResult;
    updateDisplay();
  }
}

function toggleTheme() {
    const body = document.body;
  
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else if (body.classList.contains("light-theme")) {
      body.classList.remove("light-theme");
      body.classList.add("blue-theme");
    } else if (body.classList.contains("blue-theme")) {
      body.classList.remove("blue-theme");
      body.classList.add("dark-theme");
    } else {
      // Якщо немає жодної теми, встановити темну тему за замовчуванням
      body.classList.add("dark-theme");
    }
}
  
