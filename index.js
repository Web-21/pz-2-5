const another = document.getElementById('another');
const display = document.querySelector('.calculator-screen');
const one = document.querySelectorAll('.white');
const two = document.querySelectorAll('.gray');
const three = document.querySelectorAll('.orange');
const copy = document.getElementById('copy');
const paste = document.getElementById('paste');



another.addEventListener('click', anotherColorShemaFun);

copy.addEventListener('click',copyFun);
paste.addEventListener('click',pasteFun);   

let counter = 1;
let currentCopy = '';
function copyFun (){
    currentCopy = currentInput;
}
function pasteFun(){
    handleNumber(currentCopy);
}
let currentInput = '';
let previousInput = '';
let operation = null;
function anotherColorShemaFun() {
    counter += 1;
    console.log(counter);
    if (counter % 2 == 0) {
        anotherColorShemaFun2();
    }
    else {
        anotherColorShemaFun1();
    }
}

function anotherColorShemaFun1() {
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
    another.style.backgroundColor = 'greenyellow';
    another.style.color = 'orange';
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
function anotherColorShemaFun2() {
    one.forEach(one => {
        one.style.backgroundColor = 'blue';
    });
    two.forEach(two => {
        two.style.backgroundColor = 'greenyellow';
        two.style.color = 'black';
    });
    three.forEach(three => {
        three.style.backgroundColor = 'brown';
        three.style.color = 'black';
    });
    another.style.backgroundColor = 'black';
    another.style.color = 'white'
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

document.querySelectorAll('.calculator-button, .big-calculator-button').forEach(button => {
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

