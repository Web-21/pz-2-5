const out = document.querySelector(".calc-screen");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.querySelector(".theme-toggle");
const saveButton = document.querySelector(".save-btn");
const pasteButton = document.querySelector(".paste-btn");
const calculator = document.querySelector(".calc");

let savedResult = null;
const maxDisplayLength = 10;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const buttonValue = e.target.innerText;

    switch (buttonValue) {
      case "AC":
        out.innerText = "0";
        break;

      case "=":
        try {
          let result = eval(out.innerText);
          if (result.toString().length > maxDisplayLength) {
            result = result.toPrecision(maxDisplayLength - 1); 
          }
          out.innerText = result;
        } catch (error) {
          out.innerText = "Error";
        }
        break;

      case "%":
        out.innerText = eval(out.innerText + "/100");
        break;

      case "+/-":
        out.innerText = out.innerText.startsWith("-") ? 
                        out.innerText.slice(1) : 
                        "-" + out.innerText;
        break;

      case "F":
        // Обчислення числа Фібоначчі
        const n = parseInt(out.innerText); // Беремо значення, яке є в екрані
        if (isNaN(n) || n < 0) {
          out.innerText = "Error"; // Якщо не число або менше 0, виводимо помилку
        } else {
          out.innerText = fibonacci(n); // Виводимо число Фібоначчі
        }
        break;

      default:
        if (out.innerText.length < maxDisplayLength) {
          out.innerText = out.innerText === "0" ? 
                          buttonValue : 
                          out.innerText + buttonValue;
        }
    }
  });
});

// Функція для обчислення числа Фібоначчі
function fibonacci(n) {
  if (n === 0) return 0;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}
