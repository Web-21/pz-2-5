const out = document.querySelector(".display"); 
const buttons = document.querySelectorAll(".button"); 
const themeToggle = document.querySelector(".theme-toggle"); 
const saveButton = document.querySelector(".save"); 
const pasteButton = document.querySelector(".paste"); 
const calculator = document.querySelector(".container"); 

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
          let expression = out.innerText.replace(/×/g, "*").replace(/,/g, "."); 
          let result = eval(expression); 
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

      case "×": 
      case "*":
      case "+":
      case "-":
      case "/":
        if ("+-*/".includes(out.innerText.slice(-1))) {
          out.innerText = out.innerText.slice(0, -1) + (buttonValue === "×" ? "*" : buttonValue);
        } else {
          out.innerText += (buttonValue === "×" ? "*" : buttonValue); 
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


saveButton.addEventListener("click", () => {
  savedResult = out.innerText; 
  alert(`Результат ${savedResult} збережено!`);
});

pasteButton.addEventListener("click", () => {
  if (savedResult !== null) {
    out.innerText = savedResult;
  } else {
    alert("Немає збереженого результату!"); 
  }
});
