const screen = document.querySelector(".calc-screen");
const calcButtons = document.querySelectorAll(".btn");
const themeToggler = document.querySelector(".theme-toggle");
const saveResultBtn = document.querySelector(".save-btn");
const insertResultBtn = document.querySelector(".paste-btn");
const calcContainer = document.querySelector(".calc");

let savedValue = null;
const charLimit = 10;

calcButtons.forEach((btn) => {
  btn.addEventListener("click", function (event) {
    const btnContent = event.target.innerText;

    switch (btnContent) {
      case "AC":
        screen.innerText = "0";
        break;

      case "=":
        try {
          let equation = screen.innerText.replace(/×/g, "*");
          let output = eval(equation);
          if (output.toString().length > charLimit) {
            output = output.toPrecision(charLimit - 1);
          }
          screen.innerText = output;
        } catch {
          screen.innerText = "Error";
        }
        break;

      case "%":
        screen.innerText = eval(screen.innerText + "/100");
        break;

      case "+/-":
        screen.innerText = screen.innerText.startsWith("-")
          ? screen.innerText.slice(1)
          : "-" + screen.innerText;
        break;

      case "×":
      case "*":
      case "+":
      case "-":
      case "/":
        if (
          savedValue !== null &&
          (screen.innerText === "0" || screen.innerText === "")
        ) {
          screen.innerText =
            savedValue + (btnContent === "×" ? "*" : btnContent);
        } else if ("+-*/".includes(screen.innerText.slice(-1))) {
          screen.innerText =
            screen.innerText.slice(0, -1) +
            (btnContent === "×" ? "*" : btnContent);
        } else {
          screen.innerText += btnContent === "×" ? "*" : btnContent;
        }
        break;

      default:
        if (screen.innerText.length < charLimit) {
          screen.innerText =
            screen.innerText === "0" ? btnContent : screen.innerText + btnContent;
        }
    }
  });
});

saveResultBtn.addEventListener("click", () => {
  savedValue = screen.innerText;
  alert(`Result ${savedValue} has been saved!`);
});

insertResultBtn.addEventListener("click", () => {
  if (savedValue !== null) {
    screen.innerText =
      screen.innerText === "0" ? savedValue : screen.innerText + savedValue;
  } else {
    alert("No saved result!");
  }
});

themeToggler.addEventListener("click", () => {
  calcContainer.classList.toggle("light-theme");
});
