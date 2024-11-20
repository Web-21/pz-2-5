// Вибір елементів інтерфейсу
const display = document.querySelector(".screen");
const allButtons = document.querySelectorAll(".btn");
const saveResultButton = document.querySelector(".btn-save");
const pasteResultButton = document.querySelector(".btn-paste");
const themeButton = document.querySelector(".btn-theme");
const calculator = document.querySelector(".calculator");

// Змінні для логіки
let savedValue = null;
const themes = ["theme-white", "theme-blue", "theme-green"]; // Масив кольорів
let currentThemeIndex = 0;

// Обробка натискання кнопок
allButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const buttonText = event.target.innerText;

    // Ігнорування кнопок, що не повинні змінювати дисплей
    if (btn.classList.contains("btn-theme") || btn.classList.contains("btn-save") || btn.classList.contains("btn-paste")) {
      return;
    }

    switch (buttonText) {
      case "AC":
        display.innerText = "0"; // Очищення екрану
        break;

      case "=":
        try {
          // Обчислення виразу
          let expression = display.innerText.replace(/×/g, "*").replace(/÷/g, "/");
          let calculation = eval(expression);
          display.innerText = calculation.toString();
        } catch {
          display.innerText = "Error"; // Помилка у виразі
        }
        break;

      case "%":
        display.innerText = eval(display.innerText + "/100"); // Відсотки
        break;

      case "+/-":
        display.innerText = display.innerText.startsWith("-")
          ? display.innerText.slice(1)
          : "-" + display.innerText; // Зміна знаку числа
        break;

      default:
        // Введення чисел і символів
        display.innerText =
          display.innerText === "0" ? buttonText : display.innerText + buttonText;
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
  if (savedValue !== null) {
    display.innerText = savedValue;
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
