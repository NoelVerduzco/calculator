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
    if (y === 0) return Infinity;
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
    if (button.id === "=") {
        historyText.push(button.id);
        historyText.push(total);
        history.innerText = historyText.join("");
        screenText = [];
        screenText.push(total);
        screen.innerText = screenText.join("");
    } else {
        historyText.push(button.id);
        history.innerText = historyText.join("");
        screenText.push(button.id);
        screen.innerText = screenText.join("");
    }
}

const buttons = document.querySelectorAll("button");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const screen = document.querySelector(".screen");
const history = document.querySelector("#history");
const clear = document.querySelector("#C");
const equals = document.getElementById("=");
const decimal = document.getElementById(".");

// switch between operators before pressing next number

// add a backspace button

let sign = null;
let isEqual = false;
let isFirstDecimal = false;
let isSecondDecimal = false;
let historyText = [];
let screenText = [];
let charList = [];
let pattern = /[0-9]/;

decimal.addEventListener("click", () => {
    if (charList.join("") === "Infinity") {
        clearCalculator();
    }
    if (isFirstDecimal === false) {
        isFirstDecimal = true;
        charList.push(decimal.id);
        updateDisplays(decimal);
    } else if ((isSecondDecimal === false) && (sign !== null)) {
        isSecondDecimal = true;
        charList.push(decimal.id);
        updateDisplays(decimal);
    }
});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (charList.join("") === "Infinity") {
            clearCalculator();
        }
        if ((!isNaN(findNum("theFirst"))) && (isEqual === true) && (sign === null)) { // Clear calculator after equals/number sequence
            isEqual = false;
            clearCalculator();
        }
        if ((charList.length === 0) && (number.id !== "0")) { // Prevent 0 from being the first input
            charList.push(number.id);
            updateDisplays(number);
        } else if ((charList.length >= 1) && (isEqual)) {
            charList.push(number.id);
            historyText = charList;
            history.innerText = historyText.join("");
            screenText.push(number.id);
            screen.innerText = screenText.join("");
        } else if ((charList.length >= 1) && (isEqual === false)) {
            charList.push(number.id);
            updateDisplays(number);
        }
    });
});

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (charList.join("") === "Infinity") {
            clearCalculator();
        }
        if ((isEqual === false)) {
            if ((pattern.test(charList.join(""))) && (sign === null)) { // Prevent an operator from being used as the first input and after a decimal
                sign = operator.id;
                charList.push(operator.id);
                updateDisplays(operator);
            } else if ((!isNaN(findNum("theFirst"))) && (!isNaN(findNum("theSecond"))) && (sign !== null)) { // Allow number/operator/repeat sequence
                let total = 0;
                let charString = charList.join("");
                if (charList[0] === "-") {
                    let removeNegative = charString.slice(1);
                    let numList = removeNegative.split(sign);
                    let [firstNum, secondNum] = numList;
                    total = Number(operate(sign, Number(`-${firstNum}`), Number(secondNum)).toPrecision(3));
                } else {
                    let numList = charString.split(sign);
                    let [firstNum, secondNum] = numList;
                    total = Number(operate(sign, Number(firstNum), Number(secondNum)).toPrecision(3));
                }
                sign = operator.id;
                charList = [];
                charList = total.toString().split("");
                charList.push(sign);
                screenText = [total.toString()];
                updateDisplays(operator);
                isSecondDecimal = false;
            }
        } else if ((!isNaN(findNum("theFirst"))) && (isEqual === true) && (sign === null)) { // Allow calculations after equals button press
            sign = operator.id;
            charList.push(operator.id);
            historyText = charList;
            history.innerText = historyText.join("");
            screenText.push(operator.id);
            screen.innerText = screenText.join("");
        }
    });
});

equals.addEventListener("click", () => {
    if (charList.join("") === "Infinity") {
        clearCalculator();
    }
    if ((!isNaN(findNum("theFirst"))) && (!isNaN(findNum("theSecond"))) && (sign !== null)) { // Prevent equals button click without number/operator/number sequence
        let total = 0;
        let charString = charList.join("");
        if (charList[0] === "-") {
            let removeNegative = charString.slice(1);
            let numList = removeNegative.split(sign);
            let [firstNum, secondNum] = numList;
            total = Number(operate(sign, Number(`-${firstNum}`), Number(secondNum)).toPrecision(3));
        } else {
            let numList = charString.split(sign);
            let [firstNum, secondNum] = numList;
            total = Number(operate(sign, Number(firstNum), Number(secondNum)).toPrecision(3));
        }
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

document.addEventListener("keydown", (e) => {
    buttons.forEach(button => {
        if (e.key === button.id) {
            button.classList.add("active");
            button.click();
        }
    });
});

buttons.forEach(button => {
    button.addEventListener("transitionend", removeActive)
});

function removeActive(e) {
    if (e.propertyName !== "box-shadow") return;
    this.classList.remove("active");
}