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

const numbers = document.querySelectorAll(".number");

const operators = document.querySelectorAll(".operator");

const screen = document.querySelector(".screen");

const history = document.querySelector("#history");

const clear = document.querySelector("#clear");

const equals = document.querySelector("#equals");

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

// first input must be 1 through 9
// allow equals press only if there is a number / operator / number in character list

let charList = [];

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if ((charList.length === 0) && (number.innerText !== "0")) { // Prevent 0 from being the first input
            charList.push(number.innerText);
            console.log(charList);
        }
    });
});

let sign = null;

operators.forEach(operator => {
    operator.addEventListener("click", () => {
        if (sign == null) {
            sign = operator.innerText;
            console.log(typeof sign);
            charList.push(operator.innerText);
            console.log(charList);
        }
    });
});

equals.addEventListener("click", () => {
    if (condition) {
        let charString = charList.join("");
        console.log(charString);
        let numList = charString.split(sign);
        console.log(numList);
        let [firstNum, secondNum] = numList;
        console.log(firstNum);
        console.log(secondNum);
        let total = operate(sign, Number(firstNum), Number(secondNum));
        sign = null;
        charList = [];
        charList[0] = total;
        console.log(charList);
    }
});

let testArr = ["123",678];
console.log(testArr[0][0]);