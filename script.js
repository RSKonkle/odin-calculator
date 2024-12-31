/* 
    TODO LIST:
    1. Add decimal point functionality (DONE)
    2. Round display to prevent container overflow
    3. EXTRA: add respective keyboard controls for calc
    4. stylize CSS to create aesthetic UI and design
*/
document.addEventListener("DOMContentLoaded", () => {
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

    function formatResult(value) {
        const maxLength = 16; // Maximum characters allowed on the display
    
        // Convert the number to a string
        let valueStr = value.toString();
    
        // If the result is too long, round or truncate it
        if (valueStr.length > maxLength) {
            // If it's a decimal number, limit the number of decimal places
            if (valueStr.includes(".")) {
                const decimalPlaces = maxLength - valueStr.split(".")[0].length - 1; // Calculate max decimal places
                return parseFloat(value).toFixed(Math.max(0, decimalPlaces)); // Round to fit
            }
            // Otherwise, truncate the integer part
            return parseFloat(valueStr.slice(0, maxLength));
        }
    
        // Return the value as-is if it fits
        return value;
    }
    
    /*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    ///// LOGIC /////
    // Get references to the display and buttons
    const displayElement = document.querySelector(".display");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator"); 
    const equalsButton = document.querySelector(".equals");
    const clearButton = document.querySelector(".clear");
    const decimalButton = document.querySelector(".decimal");

    // Establish null variables for storing values
    let x = null;
    let y = null;
    let operator = null;
    let resetDisplay = false;

    // Attach event listeners to number buttons and call display function to display number values within div
    numberButtons.forEach(button => {
        button.addEventListener("click", () => display(button.dataset.value)); // display the respective html data-value
    })

    // Attach event listeners to operator buttons, store displayed value to x or y
    operatorButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (x === null) { // If x is null, store the current display value as x
                x = parseFloat(displayElement.textContent); // if x is null, store displayed value as x
            } 
            else if (y === null && operator) { // If y is null but operator exists, complete the current operation and chain
                y = parseFloat(displayElement.textContent); // if y is null and operator exists, store displayed value as y
            }
            // If no operator is set after pressing equals, just set the new operator
            operator = button.dataset.operator; // store clicked operator as variable
            resetDisplay = true; // allows clearing of old values
        });
    });

    // Attach event listener to equals button, store displayed value to y and display result of operation
    equalsButton.addEventListener("click", () => {
        if (x !== null && operator !== null){
            y = parseInt(displayElement.textContent); // if x and operator exist, store displayed value as y
            const result = operate(x, y, operator); // operate and store the result
            displayElement.textContent = formatResult(result); // display result for user
            x = result; // store result as x for chaining operations
            y = null; // reset y
            operator = null; // reset operator
            resetDisplay = true; // prepare display for next operation
        };
    });

    // Attach event listener to clear button, allowing user to clear display
    clearButton.addEventListener("click", () => {
        displayElement.textContent = "";
        x = y = operator = null;
    });

    // Attach event listener to decimal button
    decimalButton.addEventListener("click", () => {
        if (!displayElement.textContent.includes(".")) {
            displayElement.textContent += "."; // Append decimal
        }
        resetDisplay = false; // Ensure the display is not reset
    });

    
})