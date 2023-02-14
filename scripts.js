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
    if (operation === "add") return add(x, y);
    if (operation === "subtract") return subtract(x, y);
    if (operation === "multiply") return multiply(x, y);
    if (operation === "divide") return divide(x, y);
}

const numbers = document.querySelectorAll(".number");

let xNum = null;
let xList = [];

function getX() {

    numbers.forEach(number => {
        number.addEventListener("click", function() {
            xList.push(number.innerText);
            // history.innerText = xList.join("");
        });
    });
}

let yNum = null;
let yList = [];

function getY() {
    
    numbers.forEach(number => {
        number.addEventListener("click", function() {
            yList.push(number.innerText);
            // history.innerText = yList.join("");
        });
    });
}

let sign = null;

function getOperator() {
    operators.forEach(operator => {
        operator.addEventListener("click", function() {
            xNum = Number(xList.join(""));
            yNum = Number(yList.join(""));
            sign = operator.id;
            calculate();
        });
    });
}

const operators = document.querySelectorAll(".operator");

const screen = document.querySelector(".screen");

const history = document.querySelector("#history");

const clear = document.querySelector("#clear");

let total = null;

function calculate() {
    if (sign === null) {
        getX();
        getOperator();
    }
    if ((sign !== null) && (xNum !== null)) {
        getY();
    }
    equals.addEventListener("click", function() {
        yNum = Number(yList.join(""));
        console.log(yNum);
        if ((sign !== null) && (xNum !== null) && (yNum !== null)) {
            total = operate(sign, xNum, yNum);
            console.log(total);
        }
    });
}

const equals = document.querySelector("#equals");

calculate();