document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let bracketCount = 0;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-num') || button.getAttribute('data-operator');

            if (value) {
                if (!isNaN(value) || value === '.') {
                    currentInput += value;
                    display.innerText = currentInput;
                } else if (value === '+' || value === '-' || value === '*' || value === '/') {
                    if (currentInput === '' && previousInput !== '') {
                        operator = value;
                    } else if (currentInput !== '') {
                        previousInput += currentInput + value;
                        currentInput = '';
                        display.innerText = previousInput;
                    }
                } else if (value === '(') {
                    currentInput += '(';
                    bracketCount++;
                    display.innerText = currentInput;
                } else if (value === ')') {
                    if (bracketCount > 0) {
                        currentInput += ')';
                        bracketCount--;
                        display.innerText = currentInput;
                    }
                } else if (value === '%') {
                    if (currentInput !== '') {
                        currentInput = (parseFloat(currentInput) / 100).toString();
                        display.innerText = currentInput;
                    }
                }
            }
        });
    });

    document.getElementById('equals').addEventListener('click', function() {
        if (currentInput !== '' || previousInput !== '') {
            try {
                const expression = previousInput + currentInput;
                currentInput = eval(expression);
                display.innerText = currentInput;
                previousInput = '';
                operator = '';
            } catch (e) {
                display.innerText = 'Error';
            }
        }
    });

    document.getElementById('backspace').addEventListener('click', function() {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || '0';
    });

    document.getElementById('clear').addEventListener('click', function() {
        currentInput = '';
        previousInput = '';
        operator = '';
        display.innerText = '0';
    });

    document.getElementById('clear-entry').addEventListener('click', function() {
        currentInput = '';
        display.innerText = '0';
    });

    // Handle keyboard input
    document.addEventListener('keydown', function(event) {
        const key = event.key;

        if (!isNaN(key) || key === '.') {
            currentInput += key;
            display.innerText = currentInput;
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            if (currentInput === '' && previousInput !== '') {
                operator = key;
            } else if (currentInput !== '') {
                previousInput += currentInput + key;
                currentInput = '';
                display.innerText = previousInput;
            }
        } else if (key === '(') {
            currentInput += '(';
            bracketCount++;
            display.innerText = currentInput;
        } else if (key === ')') {
            if (bracketCount > 0) {
                currentInput += ')';
                bracketCount--;
                display.innerText = currentInput;
            }
        } else if (key === '%') {
            if (currentInput !== '') {
                currentInput = (parseFloat(currentInput) / 100).toString();
                display.innerText = currentInput;
            }
        } else if (key === 'Enter') {
            document.getElementById('equals').click();
        } else if (key === 'Backspace') {
            document.getElementById('backspace').click();
        } else if (key === 'Escape') {
            document.getElementById('clear').click();
        }
    });
});
