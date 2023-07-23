const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

let currentOperator = '';
let currentInput = '';
let storedInput = '';

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.value;
        display.value = currentInput;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator !== '') calculate();
        currentOperator = button.value;
        storedInput = currentInput;
        currentInput = '';
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
    currentOperator = '';
});

clearButton.addEventListener('click', () => {
    currentInput = '';
    storedInput = '';
    currentOperator = '';
    display.value = '';
});

function calculate() {
    if (currentOperator === '+') currentInput = parseFloat(storedInput) + parseFloat(currentInput);
    else if (currentOperator === '-') currentInput = parseFloat(storedInput) - parseFloat(currentInput);
    else if (currentOperator === '*') currentInput = parseFloat(storedInput) * parseFloat(currentInput);
    else if (currentOperator === '/') currentInput = parseFloat(storedInput) / parseFloat(currentInput);

    display.value = currentInput;
    storedInput = currentInput;
    currentInput = '';
}
