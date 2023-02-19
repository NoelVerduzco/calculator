function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) return "gghard";
    return x / y;
}

function operate(operation, x, y) {
    if (operation === "+") return add(x, y);
    if (operation === "-") return subtract(x, y);
    if (operation === "*") return multiply(x, y);
    if (operation === "/") return divide(x, y);
}

function clearCalculator() {
    sign = null;
    isEqual = false;
    isFirstDecimal = false;
    isSecondDecimal = false;
    charList = [];
    screenText = [];
    historyText = [];
    screen.innerText = "";
    history.innerText = "";
}

function findOperator(theChar) {
    if ((theChar === "+") || (theChar === "-") || (theChar === "*") || (theChar === "/")) {
        return theChar;
    }
}

function findNum(whichNum) { // Validate whether the user has a first and second operand
    if (whichNum === "theFirst") {
        if ((charList[0] === "-") && (sign !== null)) {
            let theFirstNum = charList.join("").slice(1, charList.lastIndexOf(sign));
            if (pattern.test(theFirstNum.toString())) {
                return 1;
            }
        } else if ((charList[0] === "-") && (sign === null)) {
            let theFirstNum = charList.join("").slice(1, charList.length);
            if (pattern.test(theFirstNum.toString())) {
                return 1;
            }
        } else if (sign !== null) {
            let theFirstNum = charList.join("").slice(0, charList.findIndex(findOperator));
            if (pattern.test(theFirstNum.toString())) {
                return 1;
            }
        } else {
            let theFirstNum = charList.join("").slice(0, charList.length);
            if (pattern.test(theFirstNum.toString())) {
                return 1;
            }
        }
    } else if (whichNum === "theSecond") {
        let theSecondNum = charList.join("").slice(charList.lastIndexOf(sign) + 1, charList.length);
        if (pattern.test(theSecondNum.toString())) {
            return 1;
        }
    }
}

function updateDisplays(button, total) {
    if (button.id === "equals") {
        historyText.push(button.innerText);
        historyText.push(total);
        history.innerText = historyText.join("");
        screenText = [];
        screenText.push(total);
        screen.innerText = screenText.join("");
    } else {
        historyText.push(button.innerText);
        history.innerText = historyText.join("");
        screenText.push(button.innerText);
        screen.innerText = screenText.join("");
    }
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector(".screen");
const history = document.querySelector("#history");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

// ROUND ON-SCREEN
// Round to three decimals on screen and history display only

// PREVENT TEXT OVERFLOW IN SCREEN AND HISTORY DISPLAYS

let sign = null;
let isEqual = false;
let isFirstDecimal = false;
let isSecondDecimal = false;
let historyText = [];
let screenText = [];
let charList = [];
let pattern = /[0-9]/;

decimal.addEventListener("click", () => {
    if (isFirstDecimal === false) {
        isFirstDecimal = true;
        charList.push(decimal.innerText);
        updateDisplays(decimal);
    } else if ((isSecondDecimal === false) && (sign !== null)) {
        isSecondDecimal = true;
        charList.push(decimal.innerText);
        updateDisplays(decimal);
    }
});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if ((!isNaN(findNum("theFirst"))) && (isEqual === true) && (sign === null)) { // Clear calculator after equals/number sequence
            isEqual = false;
            clearCalculator();
        }
        if ((charList.length === 0) && (number.innerText !== "0")) { // Prevent 0 from being the first input
            charList.push(number.innerText);
            updateDisplays(number);
        } else if ((charList.length >= 1)) {
            charList.push(number.innerText);
            updateDisplays(number);
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if ((isEqual === false)) {
            if ((pattern.test(charList.join(""))) && (sign === null)) { // Prevent an operator from being used as the first input and after a decimal
                sign = operator.innerText;
                charList.push(operator.innerText);
                updateDisplays(operator);
            } else if ((!isNaN(findNum("theFirst"))) && (!isNaN(findNum("theSecond"))) && (sign !== null)) { // Allow number/operator/repeat sequence
                let total = 0;
                if (charList[0] === "-") {
                    let charString = charList.join("");
                    let removeNegative = charString.slice(1);
                    let numList = removeNegative.split(sign);
                    let [firstNum, secondNum] = numList;
                    total = operate(sign, Number(`-${firstNum}`), Number(secondNum));
                } else {
                    let charString = charList.join("");
                    let numList = charString.split(sign);
                    let [firstNum, secondNum] = numList;
                    total = operate(sign, Number(firstNum), Number(secondNum));
                }
                sign = operator.innerText;
                charList = [];
                charList = total.toString().split("");
                charList.push(sign);
                screenText = [total.toString()];
                updateDisplays(operator);
            }
        } else if ((!isNaN(findNum("theFirst"))) && (isEqual === true) && (sign === null)) { // Allow calculations after equals button press
            sign = operator.innerText;
            charList.push(operator.innerText);
            updateDisplays(operator);
        }
    });
});

equals.addEventListener("click", () => {
    if ((!isNaN(findNum("theFirst"))) && (!isNaN(findNum("theSecond"))) && (sign !== null)) { // Prevent equals button click without number/operator/number sequence
        let charString = charList.join("");
        let numList = charString.split(sign);
        let [firstNum, secondNum] = numList;
        let total = operate(sign, Number(firstNum), Number(secondNum));
        sign = null;
        isEqual = true;
        charList = [];
        charList = total.toString().split("");
        updateDisplays(equals, total);
    }
});

clear.addEventListener("click", () => {
    clearCalculator();
});