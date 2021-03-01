import "./style/main.scss";

const display = document.querySelector(`.display`);
const clearButton = document.querySelector(`.btn--clear`);
const negativeButton = document.querySelector(`.btn--negative`);
const percentButton = document.querySelector(`.btn--percent`);
const numberButtons = document.querySelectorAll(`.btn--number`);
const arithmeticButtons = document.querySelectorAll(`.btn--arithmetic`);

let calculatorState = {
  displayValue: `0`,
  firstOperand: null,
  waitingSecondOperator: false,
  operator: null,
};

const updateDisplay = () => {
  display.innerText = calculatorState.displayValue;
};

const resetValue = () => {
  calculatorState.displayValue = `0`;
  calculatorState.firstOperand = null;
  calculatorState.waitingSecondOperator = false;
  calculatorState.operator = null;
  updateDisplay();
};

const convertValueToPercent = () => {
  calculatorState.displayValue = parseFloat(calculatorState.displayValue) / 100;
  updateDisplay();
};

const invertValue = () => {
  calculatorState.displayValue =
    calculatorState.displayValue < 0
      ? `${Math.sign(calculatorState.displayValue) * calculatorState.displayValue}`
      : `${Math.sign(calculatorState.displayValue) *
          -calculatorState.displayValue}`;
  updateDisplay();
};

const inputDigit = (digit) => {
  const { displayValue, waitingSecondOperator } = calculatorState;
  if (waitingSecondOperator) {
    calculatorState.displayValue = digit;
    calculatorState.waitingSecondOperator = false;
  } else {
    calculatorState.displayValue =
      displayValue === `0` ? digit : displayValue + digit;
  }
  updateDisplay();
};

const onOperatorButtonClick = (nextOperator) => {
  const { displayValue, firstOperand, operator } = calculatorState;
  const inputValue = parseFloat(displayValue);

  if (firstOperand === null && inputValue) {
    calculatorState.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculatorState.displayValue = `${parseFloat(result.toFixed(3))}`;
    calculatorState.firstOperand = result;
  }

  calculatorState.waitingSecondOperator = true;
  calculatorState.operator = nextOperator;
  updateDisplay();
};

const calculate = (firstOperand, secondOperand, operator) => {
  switch (operator) {
    case `+`:
      return firstOperand + secondOperand;
    case `-`:
      return firstOperand - secondOperand;
    case `*`:
      return firstOperand * secondOperand;
    case `/`:
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
};

negativeButton.addEventListener(`click`, invertValue);
percentButton.addEventListener(`click`, convertValueToPercent);
clearButton.addEventListener(`click`, resetValue);

numberButtons.forEach((el) => {
  el.addEventListener(`click`, (evt) => {
    const { target } = evt;
    inputDigit(target.innerText);
  });
});

arithmeticButtons.forEach((el) => {
  el.addEventListener(`click`, (evt) => {
    const { target } = evt;
    onOperatorButtonClick(target.innerText);
  });
});
