/* 
    OBJECTIVES: FIVE TOTAL FUNCTIONS
    ADD, SUBTRACT, MULTIPLY, DIVIDE, OPERATE (EQUALS)
    CREATE REACTIVE DISPLAY
    ADD NUMBER KEYS
    CSS FORMATTING
*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
///// FUNCTIONS /////
// List of functions: add, subtract, multiply, divide, operate
function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function operate(x, y, operator){
    // instead of using if/else statements, used switch to set conditions on each operator with default response if non-operator is used
    switch(operator){
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            // read as "return (if y is not equal to 0) divide(x,y) : (otherwise), return UserError..."
            return y !== 0 ? divide(x,y) : "UserError: Cannot divide by zero.";
        default:
            return "UserError: Invalid operator.";
    }  
}

function display(value){
    // Reset display if needed
    if (resetDisplay){ // same as resetDisplay == true
        displayElement.textContent = ""; // clear the display
        resetDisplay = false; // revert resetDisplay to false so screen populates
    }

    // Append the selected value to the display
    displayElement.textContent += value;
}
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
///// LOGIC /////
// Get references to the display and buttons
const displayElement = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator"); 
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

// Establish null variables for storing values
let x = null;
let y = null;
let operator = null;
let clearDisplay = false;

// Attach event listeners to number buttons and call display function to display number values within div
numberButtons.forEach(button => {
    button.addEventListener("click", () => display(button.dataset.value)); // display the respective html data-value
})

// Attach event listeners to operator buttons, store displayed value to x or y
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (x === null){
            x = parseInt(displayElement.textContent); // if x is null, store displayed value as x
        } else if (y === null && operator){
            y = parseInt(displayElement.textContent); // if y is null and operator exists, store displayed value as y
            x = operate(x, y, operator);
        } else {console.log("Hmmmm. Something isn't quite working.");}; // console debugging
        operator = button.dataset.operator; // store clicked operator as variable
        resetDisplay = true; // allows clearing of old values
    });
});

// Attach event listeners to equals button, store displayed value to y and display result of operation
equalsButton.addEventListener("click", () => {
    if (x !== null && operator !== null){
        y = parseInt(displayElement.textContent); // if x and operator exist, store displayed value as y
        const result = operate(x, y, operator); // operate and store the result
        displayElement.textContent = result; // display result for user
        x = result; // store result as x for chaining operations
        y = null; // reset
        operator = null; // reset
    }
})
