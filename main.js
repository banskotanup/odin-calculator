// Basic Math Functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return "Error"; // Handle division by zero
    return a / b;
}

// Operate Function
function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

let firstOperand = null;
let secondOperand = null;
let operator = null;
let currentInput = "";
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleButtonClick(button.textContent);
    });
});

function handleButtonClick(content) {
    if (!isNaN(content) || content === ".") {  // Numbers and Decimal Point
        appendNumber(content);
    } else if (["+", "-", "*", "/"].includes(content)) {  // Operators
        setOperator(content);
    } else if (content === "=") {  // Equals
        evaluate();
    } else if (content === "AC") {  // Clear
        clear();
    } else if (content === "←") {  // Backspace
        backspace();
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        resetDisplay();
    }
    if (number === "." && currentInput.includes(".")) return; // Prevent multiple decimals
    currentInput += number;
    updateDisplay(currentInput);
}

function setOperator(op) {
    if (operator !== null) evaluate();
    firstOperand = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function evaluate() {
    if (operator === null || shouldResetDisplay) return;
    if (operator === "/" && currentInput === "0") {
        updateDisplay("Error");
        clear();
        return;
    }
    secondOperand = parseFloat(currentInput);
    const result = operate(operator, firstOperand, secondOperand);
    updateDisplay(result);
    firstOperand = result;
    operator = null;
    shouldResetDisplay = true;
}

function clear() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    currentInput = "";
    shouldResetDisplay = false;
    updateDisplay("0");
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}

function resetDisplay() {
    currentInput = "";
    shouldResetDisplay = false;
}

function updateDisplay(value) {
    display.textContent = value;
}

// Add Keyboard Support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || key === ".") appendNumber(key);
    if (["+", "-", "*", "/"].includes(key)) setOperator(key);
    if (key === "Enter" || key === "=") evaluate();
    if (key === "Backspace") backspace();
    if (key === "Escape" || key.toLowerCase() === "c") clear();
});