const screen = document.getElementById('screen');
let currentInput = '0';
let previousInput = null;
let operator = null;
let lastChar = '';  
let resetScreenOnNextDigit = false;

function updateScreen() {
    screen.textContent = currentInput;
}

function clearScreen() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    resetScreenOnNextDigit = false;
    updateScreen();
}

function pressButton(value) {
    if (isOperator(value)) {
        handleOperator(value);
    } else if (value === '.') {
        inputDecimal();
    } else {
        inputDigit(value);
    }
    lastChar = value;
    updateScreen();
}

function inputDigit(digit) {
    if (resetScreenOnNextDigit) {
        currentInput = digit;
        resetScreenOnNextDigit = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
}

function inputDecimal() {
    if (resetScreenOnNextDigit) {
        currentInput = '0.';
        resetScreenOnNextDigit = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(nextOperator) {
    if (operator && !resetScreenOnNextDigit) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    resetScreenOnNextDigit = true;
}

function calculate() {
    if (!operator || previousInput === null) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = null;
    resetScreenOnNextDigit = true;
    updateScreen();
}

function changeSign() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-')
            ? currentInput.slice(1)
            : '-' + currentInput;
    }
    updateScreen();
}

function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateScreen();
}

function saveResult() {
    navigator.clipboard.writeText(currentInput).then(() => {
        alert('Результат скопійовано в буфер обміну');
    }).catch(err => {
        alert('Не вдалося скопіювати в буфер обміну');
    });
}

// Функція для вставки з буфера обміну
function pasteDisplay() {
    navigator.clipboard.readText().then(text => {
        if (!isNaN(text)) {
            if (currentInput === '0') {
                currentInput = text;
            } else {
                currentInput += text;
            }
            lastChar = text[text.length - 1];
            updateScreen();
        }
    });
}

function switchTheme() {
    document.body.classList.toggle('light-theme');
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}
