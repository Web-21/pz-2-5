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

      default:
        if (out.innerText.length < maxDisplayLength) {
          out.innerText = out.innerText === "0" ? 
                          buttonValue : 
                          out.innerText + buttonValue;
        }
    }
  });
});


themeToggle.addEventListener("click", () => {
  calculator.classList.toggle("light-theme");
});


saveButton.addEventListener("click", () => {
  savedResult = out.innerText; 
  alert(`Результат ${savedResult} сохранен!`);
});


pasteButton.addEventListener("click", () => {
  if (savedResult !== null) {
    out.innerText = savedResult; 
  } else {
    alert("Нет сохраненного результата!");
  }
});
