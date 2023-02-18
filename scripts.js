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

function findNum(whichNum) {
    if (whichNum === "theFirst") {
        return charList.join("").slice(0, charList.findIndex(findOperator));
    } else if (whichNum === "theSecond") {
        return charList.join("").slice(charList.findIndex(findOperator) + 1, charList.length);
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

let isEqual = false;

let isFirstDecimal = false;

let isSecondDecimal = false;

decimal.addEventListener("click", () => {
    if (isFirstDecimal === false) {
        isFirstDecimal = true;
        charList.push(decimal.innerText);
        console.log(charList);
    } else if ((isSecondDecimal === false) && (sign !== null)) {
        isSecondDecimal = true;
        charList.push(decimal.innerText);
        console.log(charList);
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

let sign = null;

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (isEqual === false) {
            if (charList.length !== 0) { // Prevent an operator from being the first input
                if (sign === null) { // Allow only one operator per calculation
                    sign = operator.innerText;
                    console.log(typeof sign);
                    charList.push(operator.innerText);
                    console.log(charList);
                    historyText.push(operator.innerText);
                    history.innerText = historyText.join("");
                    screenText.push(operator.innerText);
                    screen.innerText = screenText.join("");
                }
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
                charList[0] = total;
                console.log(charList);
                charList[1] = sign;
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
        charList[0] = total;
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