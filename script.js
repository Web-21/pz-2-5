let display = document.getElementById('display');
let memory = "";
let isLightTheme = false;

document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("dark-theme");
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        themeButton.innerText = "Light Theme";
        themeButton.addEventListener("click", toggleTheme);
    }
});

function input(value) {
    const lastChar = display.innerText.slice(-1);

    if (display.innerText === "0") {
        if (value === ".") {
            display.innerText = "0.";
        } else if (!isNaN(value)) {
            display.innerText = value;
        } else if (isNaN(value)) {
            display.innerText += value;
        }
    } else if (display.innerText === "Error" || display.innerText === "Infinity") {
        display.innerText = value;
    } else if (isNaN(value) && isNaN(lastChar)) {
        display.innerText = display.innerText.slice(0, -1) + value;
    } else if (value === "." && display.innerText.split(/[\+\-\*\/]/).pop().includes(".")) {
        return;
    } else {
        display.innerText += value;
    }
}

function clearDisplay() {
    display.innerText = '0';
}

function calculate() {
    const lastChar = display.innerText.slice(-1);

    if (isNaN(lastChar) && lastChar !== "%") {
        return;
    }

    try {
        let expression = display.innerText;
        expression = expression.replace(/(\d+)%/g, "($1/100)");
        display.innerText = eval(expression);
    } catch {
        display.innerText = "Error";
    }

    if (display.innerText === "Infinity" || display.innerText === "-Infinity") {
        display.innerText = "Infinity";
    }
}

function toggleSign() {
    if (display.innerText.startsWith('-')) {
        display.innerText = display.innerText.slice(1);
    } else if (display.innerText !== "0" && display.innerText !== "Error" && display.innerText !== "Infinity") {
        display.innerText = '-' + display.innerText;
    }
}

function saveResult() {
    memory = display.innerText;
}

function pasteResult() {
    if (memory) {
        if (display.innerText === "0") {
            display.innerText = memory;
        } else {
            display.innerText += memory;
        }
    } else {
        alert("No saved result.");
    }
}

function toggleTheme() {
    isLightTheme = !isLightTheme;
    document.body.classList.toggle('light-theme', isLightTheme);
    document.body.classList.toggle('dark-theme', !isLightTheme);

    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
        themeButton.innerText = isLightTheme ? "Dark Theme" : "Light Theme";
    }
}
