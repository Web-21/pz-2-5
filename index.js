const colorToggle = document.getElementById('color-toggle');
const display = document.querySelector('.calc-display');
const whiteButtons = document.querySelectorAll('.white');
const grayButtons = document.querySelectorAll('.gray');
const orangeButtons = document.querySelectorAll('.orange');
let currentInput = '';
let previousInput = '';
let operation = null;
let counter = 1;

colorToggle.addEventListener('click', toggleColorScheme);

function toggleColorScheme() {
    counter += 1;
    console.log(counter);
    if (counter % 2 == 0) {
        applyColorScheme2();
    } else {
        applyColorScheme1();
    }
}

function applyColorScheme1() {
    whiteButtons.forEach(button => {
        button.style.backgroundColor = 'rgb(188, 185, 185)';
    });
    grayButtons.forEach(button => {
        button.style.backgroundColor = 'gray';
    });
    orangeButtons.forEach(button => {
        button.style.backgroundColor = 'orange';
        button.style.color = 'black';
    });
    colorToggle.style.backgroundColor = 'green';
    colorToggle.style.color = 'orange';
}

function applyColorScheme2() {
    whiteButtons.forEach(button => {
        button.style.backgroundColor = 'red';
    });
    grayButtons.forEach(button => {
        button.style.backgroundColor = 'green';
    });
    orangeButtons.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
    colorToggle.style.backgroundColor = 'black';
    colorToggle.style.color = 'white';
}

function updateDisplay(value) {
    display.innerText = value || '0';
}

function handleNumber(number) {
    if (currentInput.length <= 10) {
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
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

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay(currentInput);
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay('0');
}

function handlePlusMinus() {
    currentInput = currentInput ? (parseFloat(currentInput) * -1).toString() : '0';
    updateDisplay(currentInput);
}

function handlePoint() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
}

document.querySelectorAll('.btn, .double-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerText;

        if (/\d/.test(value)) {
            handleNumber(value);
        } else if (value === 'AC') {
            handleClear();
        } else if (value === '+/-') {
            handlePlusMinus();
        } else if (value === '.') {
            handlePoint();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
    });
});
