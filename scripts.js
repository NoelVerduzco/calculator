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
    charList = [];
    sign = null;
    isEqual = false;
    isFirstDecimal = false;
    isSecondDecimal = false;
    screenText = [];
    screen.innerText = "";
    historyText = [];
    history.innerText = "";
}

function findOperator(theChar) {
    if ((theChar === "+") || (theChar === "-") || (theChar === "*") || (theChar === "/")) {
        return theChar;
    }
}

function findNum(whichNum) { // Prevent empty strings returning false for isNaN checks
    if (whichNum === "theFirst") {
        let theFirstNum = charList.join("").slice(0, charList.findIndex(findOperator));
        if ((theFirstNum.includes(".")) && (pattern.test(theFirstNum.toString()))) {
            return 1;
        }
        return parseInt(theFirstNum);
    } else if (whichNum === "theSecond") {
        let theSecondNum = charList.join("").slice(charList.findIndex(findOperator) + 1, charList.length);
        if ((theSecondNum.includes(".")) && (pattern.test(theSecondNum.toString()))) {
            return 1;
        }
        return parseInt(theSecondNum);
    }
}

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

const screen = document.querySelector(".screen");

const history = document.querySelector("#history");

const clear = document.querySelector("#clear");

const equals = document.querySelector("#equals");

const decimal = document.querySelector("#decimal");

// Get the first number
// Get the operator
// Get the second number *
// Get the equals
// Calculate
// Make the first number equal the total number
// Clear the second number
// Repeat from asterisk

// Create listeners for 0 through 9
// When the number button is pressed, append the number to a list
// When an operator is clicked, append the operator to the list
// When the number button is pressed, append the number to a list
// When the equals button is clicked, convert the list to a string
// Split the string at the operator, into an array with the first and second number
// Create new variables, first and second numbers, and set values to array entries, respectively
// Convert the first and second number variables to number type
// Pass numbers and operator into operate function

// DECIMAL USAGE
// Decimal can be used before and after sign

// ROUND ON-SCREEN
// Round to three decimals on screen and history display only

// PREVENT TEXT OVERFLOW IN SCREEN AND HISTORY DISPLAYS

let historyText = [];

let screenText = [];

let charList = [];

let sign = null;

let isEqual = false;

let isFirstDecimal = false;

let isSecondDecimal = false;

let pattern = /[0-9]/;

decimal.addEventListener("click", () => {
    if (isFirstDecimal === false) {
        isFirstDecimal = true;
        charList.push(decimal.innerText);
        console.log(charList);
        historyText.push(decimal.innerText);
        history.innerText = historyText.join("");
        screenText.push(decimal.innerText);
        screen.innerText = screenText.join("");
    } else if ((isSecondDecimal === false) && (sign !== null)) {
        isSecondDecimal = true;
        charList.push(decimal.innerText);
        console.log(charList);
        historyText.push(decimal.innerText);
        history.innerText = historyText.join("");
        screenText.push(decimal.innerText);
        screen.innerText = screenText.join("");
    }
});

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if ((isEqual === true) && (isNaN(findNum("theFirst")) === false) && (sign === null)) { // Clear calculator after equals/number sequence
            isEqual = false;
            clearCalculator();
        }
        if ((charList.length === 0) && (number.innerText !== "0")) { // Prevent 0 from being the first input
            charList.push(number.innerText);
            console.log(charList);
            historyText.push(number.innerText);
            history.innerText = historyText.join("");
            screenText.push(number.innerText);
            screen.innerText = screenText.join("");
        } else if ((charList.length >= 1)) { // THIS WILL NEED TO BE UPDATED WHEN DECIMALS ARE ALLOWED AS FIRST INPUTS
            charList.push(number.innerText);
            console.log(charList);
            historyText.push(number.innerText);
            history.innerText = historyText.join("");
            screenText.push(number.innerText);
            screen.innerText = screenText.join("");
        }
    });
});

// pattern.test(charList.join(""))
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if ((isEqual === false)) {
            if ((pattern.test(charList.join(""))) && (sign === null)) { // Prevent an operator from being used as the first input and after a decimal
                sign = operator.innerText;
                console.log(typeof sign);
                charList.push(operator.innerText);
                console.log(charList);
                historyText.push(operator.innerText);
                history.innerText = historyText.join("");
                screenText.push(operator.innerText);
                screen.innerText = screenText.join("");
            } else if ((isNaN(findNum("theFirst")) === false) && (isNaN(findNum("theSecond")) === false) && (sign !== null)) { // Allow number/operator/repeat sequence
                let charString = charList.join("");
                console.log(charString);
                let numList = charString.split(sign);
                console.log(numList);
                let [firstNum, secondNum] = numList;
                console.log(firstNum);
                console.log(secondNum);
                let total = operate(sign, Number(firstNum), Number(secondNum));
                sign = operator.innerText;
                charList = [];
                charList = total.toString().split("");
                console.log(charList);
                charList.push(sign);
                console.log(charList);
                historyText.push(operator.innerText);
                history.innerText = historyText.join("");
                screenText = [total.toString()];
                screenText.push(operator.innerText);
                screen.innerText = screenText.join("");
            }
        } else if ((isEqual === true) && (isNaN(findNum("theFirst")) === false) && (sign === null)) { // Allow calculations after equals button press
            sign = operator.innerText;
            console.log(typeof sign);
            charList.push(operator.innerText);
            console.log(charList);
            historyText.push(operator.innerText);
            history.innerText = historyText.join("");
            screenText.push(operator.innerText);
            screen.innerText = screenText.join("");
        }
    });
});

equals.addEventListener("click", () => {
    if ((isNaN(findNum("theFirst")) === false) && (isNaN(findNum("theSecond")) === false) && (sign !== null)) { // Prevent equals button click without number/operator/number sequence
        let charString = charList.join("");
        console.log(charString);
        let numList = charString.split(sign);
        console.log(numList);
        let [firstNum, secondNum] = numList;
        console.log(firstNum);
        console.log(secondNum);
        let total = operate(sign, Number(firstNum), Number(secondNum));
        screen.innerText = total;
        sign = null;
        charList = [];
        charList = total.toString().split("");
        console.log(charList);
        historyText.push(equals.innerText);
        historyText.push(total);
        history.innerText = historyText.join("");
        screenText = [total.toString()];
        isEqual = true;
    }
});

clear.addEventListener("click", () => { // Implement clear calculator functionality
    clearCalculator();
});