/* 
    OBJECTIVES: FIVE TOTAL FUNCTIONS
    ADD, SUBTRACT, MULTIPLY, DIVIDE, OPERATE (EQUALS)
    CREATE REACTIVE DISPLAY
    ADD NUMBER KEYS
    CSS FORMATTING
*/

// FUNCTIONS
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
            // read as "return (if y is not equal to 0) divide(x,y) : (otherwise), return usererror..."
            return y !== 0 ? divide(x,y) : "UserError: Cannot divide by zero.";
        default:
            return "UserError: Invalid operator.";
    }  
}

function display(){
    return 0
}
// FUNCTIONS

