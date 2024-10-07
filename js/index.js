numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

var finalResult = 0;
var operator = "";
var activeOperator = false;

$("#ac").click(() => {
  $(".iav-result").text("0");
});

$("#sign").click(() => {
  if (firstChar() === "-") {
    result = $(".iav-result").text();
    sbstr = result.substring(1, result.length);
    $(".iav-result").text(sbstr);
  } else if (!emptyResult()) {
    prepend("-");
  }
});

$("#percentage").click(() => {
  if (!emptyResult()) {
    percentage = parseFloat($(".iav-result").text()) / 100;
    $(".iav-result").text(percentage);
  }
});

$(".iav-operator").click((e) => {
  id = e.target.id;

  if (id === "equal") {
    calculate();
    $(".iav-result").text(finalResult);
    operator = "";
    activeOperator = false;
  } else {
    operator = id;
    activeOperator = true;
  }
});

$(".iav-number").click((e) => {
  if (firstChar() === "0" && !pointIncluded()) {
    $(".iav-result").text("");
  }

  id = e.target.id;
  num = numbers[id];

  if (firstChar() === "0") {
    if (secoundChar() === ".") {
      append(num);
    }
  }

  if (activeOperator) {
    finalResult = parseFloat($(".iav-result").text());
    $(".iav-result").text("");
    activeOperator = false;
  }

  if (firstChar() === "0") {
    if (hasChar(".")) {
      append(num);
    }
  } else {
    append(num);
  }
});

$("#point").click(() => {
  if (emptyResult()) {
    append("0.");
  } else if (!emptyResult() && !pointIncluded()) {
    append(".");
  }
});

const calculate = () => {
  actResult = parseFloat($(".iav-result").text());
  switch (operator) {
    case "addition":
      finalResult += actResult;
      break;
    case "subtraction":
      finalResult -= actResult;
      break;
    case "multiplication":
      finalResult *= actResult;
      break;
    case "division":
      finalResult /= actResult;
      break;
    default:
      break;
  }
};

const emptyResult = () => {
  return $(".iav-result").text() === "";
};

const hasChar = (char) => {
  result = $(".iav-result").text();
  return result.index0f(char) !== -1;
};

const firstChar = () => {
  return $(".iav-result").text().charAt(0);
};

const secoundChar = () => {
  return $(".iav-result").text().charAt(1);
};

const pointIncluded = () => {
  result = $(".iav-result").text();
  return result.includes(".");
};

const append = (txt) => {
  result = $(".iav-result").text();
  $(".iav-result").text(result + txt);
};

const prepend = (sign) => {
  result = $(".iav-result").text();
  $(".iav-result").text(sign + result);
};

$(document).ready(function() {
  const darkTheme = {
      backgroundColor: '#000',
      btnBackgroundColor: '#343434',
      color: '#FFFFFF',
      modeColor: '#38434F',
      mode: '☀︎'
  };

  const lightTheme = {
      backgroundColor: '#fff',
      btnBackgroundColor: '#575757',
      color: '#000000',
      modeColor: '#a5a5a5',
      
      mode: '☾'
  };

  let isDarkMode = true;

  $('.iav-mode-btn').click(function() {
      isDarkMode = !isDarkMode;

      if (isDarkMode) {
          applyTheme(darkTheme);
      } else {
          applyTheme(lightTheme);
      }
  });

  function applyTheme(theme) {
      $('.iav-container').css('background-color', theme.backgroundColor);
      $('.iav-panel p').css('color', theme.color);
      $('.iav-btn.iav-number, .iav-btn.iav-decimal').css('background-color', theme.btnBackgroundColor);
      $('.iav-btn.iav-number, .iav-btn.iav-decimal').css('color', theme.color);
      $('.iav-btn.iav-operator').css('color', theme.color);

      $('.iav-mode-btn').css('background-color', theme.modeColor);
      $('.iav-mode-btn').css('color', theme.color);

      $('.iav-mode-btn').text(theme.mode);
  }
});


var savedResult = null; 

$('.iav-save-result').click(() => {
    const currentResult = $('.iav-result').text();
    
    if (savedResult === null) {
        savedResult = currentResult;
        $('.iav-save-result').text("⬆️");  
    } 
    else {
        $('.iav-result').text(savedResult);  
        savedResult = null;  
        $('.iav-save-result').text("⬇️");  
    }
});

$('.iav-calc-factorial').click(() => {
  const currentResult = BigInt($('.iav-result').text());  
  let factorial = BigInt(1);

  for (let i = BigInt(1); i <= currentResult; i++) {
    factorial *= i;
  }

  $('.iav-result').text(factorial.toString());  
});
