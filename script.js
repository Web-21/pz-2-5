// Змінні для збереження стану калькулятора
let currentNumber = '';
let previousNumber = '';
let operator = '';

// Екран калькулятора
const screen = document.getElementById('screen');

// Оновлення екрану
const updateScreen = () => {
    if (operator && previousNumber) {
        screen.innerText = `${previousNumber} ${operator} ${currentNumber}`;
    } else {
        screen.innerText = currentNumber || '0';
    }
};

// Функція для очищення
const clearAll = () => {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateScreen();
};

// Функція для обчислення
const calculate = () => {
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (operator) {
        case '+':
            currentNumber = (num1 + num2).toString();
            break;
        case '-':
            currentNumber = (num1 - num2).toString();
            break;
        case '*':
            currentNumber = (num1 * num2).toString();
            break;
        case '/':
            currentNumber = num2 !== 0 ? (num1 / num2).toString() : 'Error';
            break;
        default:
            return;
    }

    operator = '';
    previousNumber = '';
    updateScreen();
};

// Додати події для кнопок
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '.' && currentNumber.includes('.')) return;
        currentNumber += button.innerText;
        updateScreen();
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentNumber === '') return;
        if (previousNumber !== '') calculate();
        operator = button.dataset.operator;
        previousNumber = currentNumber;
        currentNumber = '';
        updateScreen();
    });
});

document.querySelector('.equals').addEventListener('click', calculate);

document.querySelector('.clear').addEventListener('click', clearAll);

document.querySelector('.sign').addEventListener('click', () => {
    if (currentNumber) {
        currentNumber = (-parseFloat(currentNumber)).toString();
        updateScreen();
    }
});

document.querySelector('.percent').addEventListener('click', () => {
    if (currentNumber) {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        updateScreen();
    }
});

// Ініціалізація
clearAll();
