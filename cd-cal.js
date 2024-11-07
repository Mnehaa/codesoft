document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("output");
    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let secondOperand = "";
    let result = "";

    function updateDisplay() {
        display.textContent = currentInput || "0";
    }

    function clear() {
        currentInput = "";
        operator = "";
        firstOperand = "";
        secondOperand = "";
        result = "";
        updateDisplay();
    }

    function handleButtonClick(event) {
        const buttonValue = event.target.textContent;

        if (!isNaN(buttonValue) || buttonValue === ".") {
            currentInput += buttonValue;
        } else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
            if (currentInput !== "") {
                if (firstOperand === "") {
                    firstOperand = currentInput;
                    operator = buttonValue;
                    currentInput = "";
                } else {
                    secondOperand = currentInput;
                    calculate();
                    firstOperand = result;
                    operator = buttonValue;
                    currentInput = "";
                    secondOperand = "";
                }
            }
        } else if (buttonValue === "=") {
            if (currentInput !== "") {
                secondOperand = currentInput;
                calculate();
                currentInput = result;
                firstOperand = result;
                secondOperand = "";
                operator = "";
            }
        } else if (buttonValue === "C") {
            clear();
        } else if (buttonValue === "←") {
            currentInput = currentInput.slice(0, -1);
        }

        updateDisplay();
    }

    function calculate() {
        const num1 = parseFloat(firstOperand);
        const num2 = parseFloat(secondOperand);

        switch (operator) {
            case "+":
                result = (num1 + num2).toString();
                break;
            case "-":
                result = (num1 - num2).toString();
                break;
            case "*":
                result = (num1 * num2).toString();
                break;
            case "/":
                if (num2 === 0) {
                    result = "Error";
                } else {
                    result = (num1 / num2).toString();
                }
                break;
            default:
                result = "";
        }
    }

    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonClick);
    });
});