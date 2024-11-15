const display = document.querySelector(".output-screen");
const allKeys = document.querySelectorAll(".key");
const themeSwitch = document.querySelector(".btn-toggle-theme");
const saveBtn = document.querySelector(".btn-save");
const pasteBtn = document.querySelector(".btn-paste");

let memory = null;
const maxChars = 12;

allKeys.forEach((key) => {
  key.addEventListener("click", function (e) {
    const value = e.target.innerText;

    switch (value) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        try {
          const expr = display.innerText.replace(/×/g, "*").replace(/,/g, ".");
          let result = eval(expr);
          if (result.toString().length > maxChars) {
            result = result.toPrecision(maxChars - 2);
          }
          display.innerText = result;
        } catch {
          display.innerText = "Помилка";
        }
        break;
      case "%":
        display.innerText = eval(display.innerText + "/100");
        break;
      case "+/-":
        display.innerText = display.innerText.startsWith("-")
          ? display.innerText.slice(1)
          : "-" + display.innerText;
        break;
      case "+":
      case "-":
      case "×":
      case "/":
        if ("+-*/".includes(display.innerText.slice(-1))) {
          display.innerText =
            display.innerText.slice(0, -1) + (value === "×" ? "*" : value);
        } else {
          display.innerText += value === "×" ? "*" : value;
        }
        break;
      default:
        if (display.innerText.length < maxChars) {
          display.innerText =
            display.innerText === "0" ? value : display.innerText + value;
        }
    }
  });
});

themeSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
});

saveBtn.addEventListener("click", () => {
  memory = display.innerText;
  alert(`Значення ${memory} збережено.`);
});

pasteBtn.addEventListener("click", () => {
  if (memory !== null) {
    display.innerText = memory;
  } else {
    alert("Немає збереженого значення!");
  }
});
