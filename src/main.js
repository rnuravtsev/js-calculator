import "./style/main.scss";

const display = document.querySelector(`.display`);
const numberButtons = document.querySelectorAll(`.btn--number`);
const arithmeticButtons = document.querySelectorAll(`.btn--arithmetic:not(:last-child)`);
const clearButton = document.querySelector(`.btn--clear`);
const negativeButton = document.querySelector(`.btn--negative`);
const percentButton = document.querySelector(`.btn--percent`);
const equalButton = document.querySelector(`.btn--equal`);

const checkDisplayText = () => {
  display.innerText.replace(/^0+/, ``);
};

const resetValue = () => {
  display.innerText = `0`;
};

const valueInPercent = () => {
  display.innerText = `${parseFloat(display.innerText) / 100}`;
};

const addValueToDisplay = (evt) => {
  let { target } = evt;
  display.innerText = display.innerText.replace(/^0+/, ``) + `${target.innerText}`;
  checkDisplayText();
};
const equalValue = () => {
  // eslint-disable-next-line no-eval
  display.innerText = eval(display.innerText);
};

numberButtons.forEach((el) => {
  el.addEventListener(`click`, addValueToDisplay);
});

negativeButton.addEventListener(`click`, () => {
  if (parseFloat(display.innerText) < 0) {
    display.innerText = `${
      Math.sign(parseFloat(display.innerText)) * parseFloat(display.innerText)
    }`;
  } else {
    display.innerText = `${
      Math.sign(parseFloat(display.innerText)) * -parseFloat(display.innerText)
    }`;
  }
});

arithmeticButtons.forEach((el) => {
  el.addEventListener(`click`, addValueToDisplay);
});

clearButton.addEventListener(`click`, resetValue);
percentButton.addEventListener(`click`, valueInPercent);
equalButton.addEventListener(`click`, equalValue);
