const screen = document.getElementById('screen');
let currentInput = '0';
let lastChar = '';  

function clearScreen() {
    currentInput = '0';
    lastChar = '';
    updateScreen();
}

function pressButton(value) {
    if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (isOperator(lastChar)) {
            currentInput = currentInput.substring(0, currentInput.length - 1) + value;
        } else {
            currentInput += value;
        }
        lastChar = value;
    } else if (value === '.') {
        if (!hasDecimalInLastNumber()) {
            currentInput += value;
            lastChar = value;
        }
    } else {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        lastChar = value;
    }
    updateScreen();
}

function updateScreen() {
    screen.textContent = currentInput;
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
    } catch {
        currentInput = 'Error';
    }
    lastChar = '';  
    updateScreen();
}

function changeSign() {
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    lastChar = currentInput[currentInput.length - 1];
    updateScreen();
}

function copyDisplay() {
    navigator.clipboard.writeText(currentInput).then(() => alert('Copied'));
}

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

function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}

function hasDecimalInLastNumber() {
    const parts = currentInput.split(/[\+\-\*\/]/);
    return parts[parts.length - 1].includes('.');
}
