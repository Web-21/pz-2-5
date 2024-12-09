let currentTheme = 'dark';
let savedResult = '';

function addToDisplay(value) {
  const display = document.getElementById('result');
  if (display.innerText === '0') {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  document.getElementById('result').innerText = '0';
}

function changeSign() {
  const display = document.getElementById('result');
  let value = parseFloat(display.innerText);
  display.innerText = value ? -value : value;
}

function calculate() {
  const display = document.getElementById('result');
  try {
    display.innerText = eval(display.innerText);
  } catch {
    display.innerText = 'Error';
  }
}

function saveResult() {
  const display = document.getElementById('result');
  savedResult = display.innerText;
  alert('Result saved!');
}

function pasteResult() {
  if (savedResult !== '') {
    addToDisplay(savedResult);
  } else {
    alert('No result saved!');
  }
}

function toggleTheme() {
  const calculator = document.querySelector('.calculator');
  if (currentTheme === 'dark') {
    calculator.style.backgroundColor = '#f4f4f4';
    calculator.style.color = '#333';
    document.body.style.backgroundColor = '#fff';
    currentTheme = 'light';
  } else {
    calculator.style.backgroundColor = 'black';
    calculator.style.color = 'white';
    document.body.style.backgroundColor = 'black';
    currentTheme = 'dark';
  }
}
