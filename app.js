const display = document.querySelector(".calc-screen");
const buttons = document.querySelectorAll(".btn");
const themeSwitch = document.querySelector(".theme-toggle");
const saveBtn = document.querySelector(".save-btn");
const pasteBtn = document.querySelector(".paste-btn");
const calculator = document.querySelector(".calc");

let storedResult = null;
const maxCharacters = 10;

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const buttonText = e.target.innerText;

    switch (buttonText) {
      case "AC":
        display.innerText = "0";
        break;

      case "=":
        try {
          let expression = display.innerText.replace(/×/g, "*");
          let result = eval(expression);
          if (result.toString().length > maxCharacters) {
            result = result.toPrecision(maxCharacters - 1);
          }
          display.innerText = result;
        } catch (error) {
          display.innerText = "Error";
        }
        break;

      case "%":
        display.innerText = eval(display.innerText + "/100");
        break;

      case "+/-":
        display.innerText = display.innerText.startsWith("-") ?
                            display.innerText.slice(1) :
                            "-" + display.innerText;
        break;

      case "×":
      case "*":
      case "+":
      case "-":
      case "/":
        if (storedResult !== null && (display.innerText === "0" || display.innerText === "")) {
          display.innerText = storedResult + (buttonText === "×" ? "*" : buttonText);
        } else if ("+-*/".includes(display.innerText.slice(-1))) {
          display.innerText = display.innerText.slice(0, -1) + (buttonText === "×" ? "*" : buttonText);
        } else {
          display.innerText += (buttonText === "×" ? "*" : buttonText);
        }
        break;

      default:
        if (display.innerText.length < maxCharacters) {
          display.innerText = display.innerText === "0" ?
                              buttonText :
                              display.innerText + buttonText;
        }
    }
  });
});

saveBtn.addEventListener("click", () => {
  storedResult = display.innerText;
  alert(`Result ${storedResult} has been saved!`);
});

pasteBtn.addEventListener("click", () => {
  if (storedResult !== null) {
    display.innerText = display.innerText === "0" ? storedResult : display.innerText + storedResult;
  } else {
    alert("No saved result!");
  }
});

themeSwitch.addEventListener("click", () => {
  calculator.classList.toggle("light-theme");
});
