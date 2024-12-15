// Змінні для збереження стану калькулятора
let currentInput = '';
let previousInput = '';
let currentOperator = '';

// Екран калькулятора
const display = document.getElementById('display');

// Оновлення екрану
const refreshDisplay = () => {
    if (currentOperator && previousInput) {
        display.innerText = `${previousInput} ${currentOperator} ${currentInput}`;
    } else {
        display.innerText = currentInput || '0';
    }
};

// Функція для очищення
const resetCalculator = () => {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    refreshDisplay();
};

// Функція для обчислення
const executeCalculation = () => {
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) return;

    switch (currentOperator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            currentInput = num2 !== 0 ? (num1 / num2).toString() : 'Error';
            break;
        default:
            return;
    }

    currentOperator = '';
    previousInput = '';
    refreshDisplay();
};

// Додати події для кнопок
document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '.' && currentInput.includes('.')) return;
        currentInput += button.innerText;
        refreshDisplay();
    });
});

document.querySelectorAll('.operation').forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '') return;
        if (previousInput !== '') executeCalculation();
        currentOperator = button.dataset.action;
        previousInput = currentInput;
        currentInput = '';
        refreshDisplay();
    });
});

document.querySelector('.result').addEventListener('click', executeCalculation);

document.querySelector('.reset').addEventListener('click', resetCalculator);

document.querySelector('.toggle-sign').addEventListener('click', () => {
    if (currentInput) {
        currentInput = (-parseFloat(currentInput)).toString();
        refreshDisplay();
    }
});

document.querySelector('.percent-btn').addEventListener('click', () => {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        refreshDisplay();
    }
});

// Ініціалізація
resetCalculator();
