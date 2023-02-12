// create add, subtract, multiply, and divide functions

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
    if (operation === add) return add(x, y);
    if (operation === subtract) return subtract(x, y);
    if (operation === multiply) return multiply(x, y);
    if (operation === divide) return divide(x, y);
}

// function penis_size(mines,yours) {
//     return mines + yours;
// }

const buttons = document.querySelectorAll("button");

const screen = document.querySelector(".screen");

buttons.forEach(button => {
    button.addEventListener("click", function(){
        console.log(button.innerText);
        screen.innerText = button.innerText;
    });
});