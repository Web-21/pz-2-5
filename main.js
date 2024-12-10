// Вибір елементів інтерфейсу
const display = document.querySelector(".screen");
const allButtons = document.querySelectorAll(".btn");
const saveResultButton = document.querySelector(".btn-save");
const pasteResultButton = document.querySelector(".btn-paste");
const themeButton = document.querySelector(".btn-theme");
const calculator = document.querySelector(".calculator");

// Змінні для логіки
let savedValue = null;
const themes = ["theme-white", "theme-blue", "theme-green"];
let currentThemeIndex = 0;
let currentExpression = ""; // Вираз для обчислення
let isResultDisplayed = false;

// Функція для оновлення дисплея
function updateDisplay(value) {
  display.innerText = value;
}

// Операції
function handleAddition() {
  currentExpression += "+";
  updateDisplay(currentExpression);
}

function handleSubtraction() {
  currentExpression += "-";
  updateDisplay(currentExpression);
}

function handleMultiplication() {
  currentExpression += "*";
  updateDisplay(currentExpression);
}

function handleDivision() {
  currentExpression += "/";
  updateDisplay(currentExpression);
}

// Обчислення виразу
function calculateResult() {
  try {
    const result = Function(`'use strict'; return (${currentExpression})`)();
    if (isNaN(result)) throw new Error("Invalid Calculation");
    updateDisplay(result);
    currentExpression = result.toString();
    isResultDisplayed = true;
  } catch (err) {
    updateDisplay("Error");
    currentExpression = "";
    isResultDisplayed = true;
  }
}

// Очищення дисплея
function clearDisplay() {
  currentExpression = "";
  updateDisplay("0");
  isResultDisplayed = false;
}

// Зміна знака
function toggleSign() {
  if (currentExpression.startsWith("-")) {
    currentExpression = currentExpression.slice(1);
  } else {
    currentExpression = "-" + currentExpression;
  }
  updateDisplay(currentExpression);
}

// Обробка введення числа
function handleNumberInput(number) {
  if (isResultDisplayed) {
    currentExpression = number;
    isResultDisplayed = false;
  } else {
    currentExpression += number;
  }
  updateDisplay(currentExpression);
}

// Обробка крапки
function handleDecimal() {
  if (!currentExpression.includes(".")) {
    currentExpression += ".";
  }
  updateDisplay(currentExpression);
}

// Обробка натискання кнопок
allButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const buttonText = event.target.innerText.trim(); // Видаляємо зайві пробіли

    switch (buttonText) {
      case "AC":
        clearDisplay();
        break;
      case "=":
        calculateResult();
        break;
      case "+/-":
        toggleSign();
        break;
      case "+":
        handleAddition();
        break;
      case "-": // Стандартний дефіс
      case "−": // Довге тире
        handleSubtraction();
        break;
      case "×":
      case "*":
        handleMultiplication();
        break;
      case "÷":
      case "/":
        handleDivision();
        break;
      case ".":
        handleDecimal();
        break;
      default:
        if (!isNaN(buttonText)) {
          handleNumberInput(buttonText);
        }
    }
  });
});


// Збереження результату
saveResultButton.addEventListener("click", () => {
  savedValue = display.innerText;
  alert(`Результат ${savedValue} збережено!`);
});

// Вставка збереженого результату
pasteResultButton.addEventListener("click", () => {
  if (savedValue !== null && savedValue !== "") {
    currentExpression = savedValue;
    updateDisplay(currentExpression);
  } else {
    alert("Немає збереженого значення!");
  }
});

// Перемикання кольорів
themeButton.addEventListener("click", () => {
  calculator.classList.remove(themes[currentThemeIndex]);
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  calculator.classList.add(themes[currentThemeIndex]);
});
