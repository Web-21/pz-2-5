const change = document.getElementById('change');
const display = document.querySelector('.calculator__display');
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

change.addEventListener('click', changeColorShemaFun);

copy.addEventListener('click',copyFun);
paste.addEventListener('click',pasteFun);


function copyFun (){
    currentCopy = currentInput;
}
function pasteFun(){
    handleNumber(currentCopy);
}

function changeColorShemaFun() {
    counter += 1;
    console.log(counter);
    if (counter % 2 == 0) {
        changeColorShemaFun2();
    }
    else {
        changeColorShemaFun1();
    }
}

function changeColorShemaFun1() {
    one.forEach(one => {
        one.style.backgroundColor = 'rgb(188, 185, 185)';
    });
    two.forEach(two => {
        two.style.backgroundColor = 'gray';
    });
    three.forEach(three => {
        three.style.backgroundColor = 'orange';
        three.style.color = 'black';
    });
    change.style.backgroundColor = 'green';
    change.style.color = 'orange';
}
function changeColorShemaFun2() {
    one.forEach(one => {
        one.style.backgroundColor = 'red';
    });
    two.forEach(two => {
        two.style.backgroundColor = 'green';
    });
    three.forEach(three => {
        three.style.backgroundColor = 'white';
        three.style.color = 'black';
    });
    change.style.backgroundColor = 'black';
    change.style.color = 'white'
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

document.querySelectorAll('.cell, .double-cell').forEach(button => {
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

