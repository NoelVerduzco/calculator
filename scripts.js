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

const operators = document.querySelectorAll(".operator");

const screen = document.querySelector(".screen");

const history = document.querySelector("#history");

const clear = document.querySelector("#clear");

const equals = document.querySelector("#equals");

// CALL getX IF sign is null
// ADD listeners for X number clicks
// APPEND number clicks to array
// JOIN array to make a string of numbers
// SET xNum value
// REMOVE listeners for X number clicks
// CALL calculate

let xNum = null;
let xList = [];
// let isX = false;

function getX() {
    numbers.forEach(number => {
        number.addEventListener("click", function() {
            xList.push(number.innerText);
            calculate();
            // isX = true;
        });
    });
    numbers.forEach(number => {
            number.removeEventListener("click", function() {
                    xList.push(number.innerText);
            xNum = Number(xList.join(""));
            console.log(xNum);
            isX = true;
        });
    });
    while (isX === true) {
            isX = false;
            calculate();
        }
    }
    
    // CALL getOperator IF X is NOT null AND IF sign is null
    // ADD listeners for operator clicks
    // SET sign value
    // REMOVE listeners for operator clicks
    // CALL calculate
    
    let sign = null;
    // let isSign = false;
    
    function getOperator() {
        operators.forEach(operator => {
            operator.addEventListener("click", function() {
                sign = operator.id;
                console.log(sign);
                // isSign = true;
                xNum = Number(xList.join(""));
                console.log(xNum);
            });
        });
        // operators.forEach(operator => {
            //     operator.removeEventListener("click", function() {
                //         sign = operator.id;
                //         console.log(sign);
                //         isSign = true;
                //     });
                // });
                // while (isSign === true) {
                //     isSign = false;
                //     calculate();
                // }
    }

            // CALL getY IF X is NOT null AND IF sign is NOT null
            // ADD listeners for Y number clicks
            // APPEND number clicks to array
            // JOIN array to make a string of numbers
            // SET yNum value
            // REMOVE listeners for Y number clicks
            // CALL calculate
            
            let yNum = null;
            let yList = [];
            let isY = false;
            
            function getY() {
                numbers.forEach(number => {
        number.addEventListener("click", function() {
            yList.push(number.innerText);
            yNum = Number(yList.join(""));
            console.log(yNum);
            isY = true;
        });
    });
    // numbers.forEach(number => {
        //     number.removeEventListener("click", function() {
    //         yList.push(number.innerText);
    //         yNum = Number(yList.join(""));
    //         console.log(yNum);
    //         isY = true;
    //     });
    // });
    while (isY === true) {
        isY = false;
        calculate();
    }
}

// CALL getEquals IF X is NOT null AND IF sign is NOT null AND if Y is NOT null
// ADD listener for equals click
// CALL operate and pass xNum, yNum, and sign
// LOG operate
// SET xNum to yNum
// SET yNum to null
// SET sign to null
// SET xList to empty array
// SET yList to empty array

let total = null;

function getEquals() {
    equals.addEventListener("click", function() {
        total = operate(sign, xNum, yNum);
        console.log(total);
        xNum = yNum;
        yNum = null;
        sign = null;
        xList = [];
        yList = [];
    });
    // equals.removeEventListener("click", function() {
        //     total = operate(sign, xNum, yNum);
        //     console.log(total);
        //     xNum = yNum;
        //     yNum = null;
        //     sign = null;
        //     xList = [];
        //     yList = [];
        // });
    }
    
    function calculate() {
        if ((sign === null) && (xNum === null)) {
            getX();
        }
        if ((sign === null) && (xNum !== null)) {
            getOperator();
        }
        if ((sign !== null) && (xNum !== null)) {
            getY();
        }
        if ((sign !== null) && (xNum !== null) && (yNum !== null)) {
            getEquals();
        }
    }
    
    calculate();