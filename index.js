const swap = document.getElementById('swap');
const display = document.querySelector('.calculator-Display');
const one = document.querySelectorAll('.white');
const two = document.querySelectorAll('.gray');
const three = document.querySelectorAll('.orange');
const copy = document.getElementById('copy');
const paste = document.getElementById('paste');
let currentInput = '';
let previousInput = '';
let operation = null;
let counter = 1;
let currentCopy = '';

swap.addEventListener('click', changeColorShemaFun);

copy.addEventListener('click',copyFun);
paste.addEventListener('click',pasteFun);   


function copyFun (){
    currentCopy = currentInput;
}
function pasteFun(){
    handleNumber(currentCopy);
}


function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomColorScheme() {
    return {
        oneBg: getRandomColor(),
        twoBg: getRandomColor(),
        threeBg: getRandomColor(),
        threeColor: getRandomColor(),
        changeBg: getRandomColor(),
        changeColor: getRandomColor()
    };
}

function applyColorScheme(scheme) {
    one.forEach(one => {
        one.style.backgroundColor = scheme.oneBg;
    });
    two.forEach(two => {
        two.style.backgroundColor = scheme.twoBg;
    });
    three.forEach(three => {
        three.style.backgroundColor = scheme.threeBg;
        three.style.color = scheme.threeColor;
    });
    change.style.backgroundColor = scheme.changeBg;
    change.style.color = scheme.changeColor;
}

function changeColorShemaFun() {
    const randomScheme = getRandomColorScheme();
    applyColorScheme(randomScheme);
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

document.querySelectorAll('.block, .big-block').forEach(button => {
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

