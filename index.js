const themeToggle = document.getElementById('theme-toggle');
const displayScreen = document.querySelector('.display');
const clearButtons = document.querySelectorAll('.clear');
const numberButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
let currentNumber = '';
let previousNumber = '';
let currentOperation = null;
let toggleCounter = 1;

themeToggle.addEventListener('click', switchTheme);

function switchTheme() {
    toggleCounter += 1;
    console.log(toggleCounter);
    if (toggleCounter % 2 === 0) {
        applyDarkTheme();
    } else {
        applyLightTheme();
    }
}

function applyLightTheme() {
    clearButtons.forEach(button => {
        button.style.backgroundColor = 'rgb(188, 185, 185)';
    });
    numberButtons.forEach(button => {
        button.style.backgroundColor = 'gray';
    });
    operatorButtons.forEach(button => {
        button.style.backgroundColor = 'orange';
        button.style.color = 'black';
    });
    themeToggle.style.backgroundColor = 'green';
    themeToggle.style.color = 'orange';
}

function applyDarkTheme() {
    clearButtons.forEach(button => {
        button.style.backgroundColor = 'yellow';
    });
    numberButtons.forEach(button => {
        button.style.backgroundColor = 'blue';
    });
    operatorButtons.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
    themeToggle.style.backgroundColor = 'black';
    themeToggle.style.color = 'white';
}

function updateScreen(value) {
    displayScreen.innerText = value || '0';
}

function handleDigitInput(digit) {
    if (currentNumber.length <= 10) {
        currentNumber += digit;
        updateScreen(currentNumber);
    }
}

function handleOperationInput(operator) {
    if (currentNumber === '') return;
    if (previousNumber !== '') calculateResult();
    currentOperation = operator;
    previousNumber = currentNumber;
    currentNumber = '';
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(current)) return;

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = current !== 0 ? prev / current : 'Error';
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    currentOperation = null;
    previousNumber = '';
    updateScreen(currentNumber);
}

function clearCalculator() {
    currentNumber = '';
    previousNumber = '';
    currentOperation = null;
    updateScreen('0');
}

function toggleSign() {
    currentNumber = currentNumber ? (parseFloat(currentNumber) * -1).toString() : '0';
    updateScreen(currentNumber);
}

function addDecimalPoint() {
    if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateScreen(currentNumber);
    }
}

document.querySelectorAll('.button, .double').forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (/\d/.test(value)) {
            handleDigitInput(value);
        } else if (value === 'AC') {
            clearCalculator();
        } else if (value === '+/-') {
            toggleSign();
        } else if (value === '.') {
            addDecimalPoint();
        } else if (value === '=') {
            calculateResult();
        } else {
            handleOperationInput(value);
        }
    });
});
