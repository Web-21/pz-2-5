let currentOperation = null;
let savedValue = null;
let currentValue = null;
let isNewInput = true;

function pressButton(value) {
    const screen = document.getElementById('screen');
    if (['+', '-', '*', '/'].includes(value)) {
        const operatorButtons = document.querySelectorAll('.button.orange');
        operatorButtons.forEach(button => button.classList.remove('highlight'));
        
        currentOperation = value;
        currentValue = parseFloat(screen.innerText);
        document.querySelector(`.button.orange[onclick="pressButton('${value}')"]`).classList.add('highlight');
        isNewInput = true;
    } else if (value === '=') {
        calculate();
    } else {
        if (isNewInput) {
            screen.innerText = value;
            isNewInput = false;
        } else {
            screen.innerText += value;
        }
    }
}

function pasteDisplay() {
    if (savedValue !== null && currentOperation !== null) {
        let currentValue = parseFloat(document.getElementById('screen').innerText);
        switch (currentOperation) {
            case '+':
                currentValue += savedValue;
                break;
            case '-':
                currentValue -= savedValue;
                break;
            case '*':
                currentValue *= savedValue;
                break;
            case '/':
                if (savedValue !== 0) {
                    currentValue /= savedValue;
                } else {
                    alert("Деление на ноль невозможно");
                    return;
                }
                break;
        }
        document.getElementById('screen').innerText = currentValue;
        currentOperation = null;

        // Удаляем подсветку после выполнения операции
        const operatorButtons = document.querySelectorAll('.button.orange');
        operatorButtons.forEach(button => button.classList.remove('highlight'));
    } else {
        alert("Нет сохраненного значения или операции");
    }
}

function calculate() {
    if (currentValue !== null && currentOperation !== null) {
        const screen = document.getElementById('screen');
        let secondValue = parseFloat(screen.innerText);
        let result;
        switch (currentOperation) {
            case '+':
                result = currentValue + secondValue;
                break;
            case '-':
                result = currentValue - secondValue;
                break;
            case '*':
                result = currentValue * secondValue;
                break;
            case '/':
                if (secondValue !== 0) {
                    result = currentValue / secondValue;
                } else {
                    alert("Деление на ноль невозможно");
                    return;
                }
                break;
        }
        screen.innerText = result;
        currentOperation = null;
        currentValue = null;
        isNewInput = true;

        // Удаляем подсветку после выполнения операции
        const operatorButtons = document.querySelectorAll('.button.orange');
        operatorButtons.forEach(button => button.classList.remove('highlight'));
    }
}

function addToDisplay(value) {
    const screen = document.getElementById('screen');
    if (screen.innerText === '0' && !['+', '-', '*', '/'].includes(value) && value !== '=') {
        screen.innerText = value;
    } else if (value !== '=') {
        screen.innerText += value;
    }
}

function clearScreen() {
    const screen = document.getElementById('screen');
    screen.innerText = '0';
    currentOperation = null;
    currentValue = null;
    isNewInput = true;

    const operatorButtons = document.querySelectorAll('.button.orange');
    operatorButtons.forEach(button => button.classList.remove('highlight'));
}

function changeSign() {
    const screen = document.getElementById('screen');
    let currentValue = parseFloat(screen.innerText);
    currentValue = -currentValue;
    screen.innerText = currentValue;
}

function calculatePercentage() {
    const screen = document.getElementById('screen');
    let currentValue = parseFloat(screen.innerText);
    currentValue = currentValue / 100;
    screen.innerText = currentValue;
}

function saveResult() {
    const screen = document.getElementById('screen');
    savedValue = parseFloat(screen.innerText);
    alert("Значение сохранено: " + savedValue);
}

function switchTheme() {
    document.body.classList.toggle('light-theme');
}
