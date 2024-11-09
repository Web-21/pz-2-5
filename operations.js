let buffer = 0;
let count = 1;
const display = document.getElementById("display");

function addNumber(num) {
  display.value += num;
}
function deleteAll() {
  document.getElementById("display").value = "";
}
function addOperator(operator) {
  display.value += ` ${operator} `;
}
function findResult() {
  try {
    display.value = eval(display.value);
  } catch (e) {
    display.value = "Error";
  }
}
function changeSign() {
  display.value = display.value * -1;
}
function copy() {
  buffer = display.value;
}
function paste() {
  display.value += buffer;
}
function changeColor() {
  const gray = document.querySelectorAll(".gray-block");
  const oval = document.querySelectorAll(".oval-block");

  const block = document.querySelectorAll(".block");
  const yellow = document.querySelectorAll(".yellow-block");
  if (count++ % 2 == 1){
     gray.forEach((gray) => {
    gray.style.backgroundColor = "rgb(245, 169, 16)";
  });
  oval.forEach((oval) => {
    oval.style.backgroundColor = "rgb(245, 169, 16)";
  });
  block.forEach((block) => {
    block.style.backgroundColor = "rgb(62, 62, 61)";
  });
  yellow.forEach((yellow) => {
    yellow.style.backgroundColor = "rgb(182, 180, 179)";
  });
  } else{
    gray.forEach((gray) => {
      gray.style.backgroundColor = "rgb(62, 62, 61)";
    });
    oval.forEach((oval) => {
      oval.style.backgroundColor = "rgb(62, 62, 61)";
    });
    block.forEach((block) => {
      block.style.backgroundColor = "rgb(182, 180, 179)";
    });
    yellow.forEach((yellow) => {
      yellow.style.backgroundColor = "rgb(245, 169, 16)";
    });
  }
 
}
