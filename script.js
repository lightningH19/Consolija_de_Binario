
function padBinary(binaryString, length) {
    return binaryString.padStart(length, '0');
}

// Convierte un binario a decimal
function binToDec(binaryString) {
    return parseInt(binaryString, 2);
}

// Convierte un decimal a binario
function decToBin(decimalNumber) {
    if (decimalNumber < 0) {
        // Manejo de números negativos para su representación binaria (complemento a dos simple para 8 bits)
        // Esto es una simplificación y no maneja todos los casos de desbordamiento.
        let absBin = (Math.abs(decimalNumber)).toString(2);
        // Rellenar para 8 bits y luego invertir bits y sumar 1 para complemento a dos
        absBin = padBinary(absBin, 8);
        let inverted = '';
        for (let bit of absBin) {
            inverted += (bit === '0' ? '1' : '0');
        }
        return (parseInt(inverted, 2) + 1).toString(2);
    }
    return decimalNumber.toString(2);
}

// Valida si la entrada es un binario válido
function isValidBinary(str) {
    return /^[01]+$/.test(str);
}

// Muestra el resultado en la consola
function appendOutput(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML += `\n> ${message}`;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Auto-scroll
}

// Realiza la operación seleccionada
function performOperation(operation) {
    const input1 = document.getElementById('input1').value.trim();
    const input2 = document.getElementById('input2').value.trim();
    let result = '';
    let num1Dec, num2Dec;

    if (!isValidBinary(input1) || (operation !== 'NOT' && input2 && !isValidBinary(input2))) {
        appendOutput('Error: Las entradas deben ser números binarios (solo 0s y 1s).');
        return;
    }

    try {
        if (operation === 'NOT') {
            if (!input1) {
                appendOutput('Error: Se necesita un número para la operación NOT.');
                return;
            }
            let paddedInput = padBinary(input1, Math.max(input1.length, 8)); // Asegura al menos 8 bits para NOT
            let notResult = '';
            for (let bit of paddedInput) {
                notResult += (bit === '0' ? '1' : '0');
            }
            result = notResult;
            appendOutput(`NOT ${input1} (${binToDec(input1)}) = ${result} (${binToDec(result)})`);

        } else {
            if (!input1 || !input2) {
                appendOutput('Error: Se necesitan dos números para esta operación.');
                return;
            }

            // Aseguramos que ambos números tengan la misma longitud para operaciones lógicas
            const maxLength = Math.max(input1.length, input2.length, 8); // Al menos 8 bits
            const paddedInput1 = padBinary(input1, maxLength);
            const paddedInput2 = padBinary(input2, maxLength);

            num1Dec = binToDec(paddedInput1);
            num2Dec = binToDec(paddedInput2);

            let operationResultDec;
            let operationSymbol = '';

            switch (operation) {
                case 'ADD':
                    operationResultDec = num1Dec + num2Dec;
                    operationSymbol = '+';
                    result = decToBin(operationResultDec);
                    break;
                case 'SUBTRACT':
                    operationResultDec = num1Dec - num2Dec;
                    operationSymbol = '-';
                    result = decToBin(operationResultDec);
                    break;
                case 'AND':
                    operationResultDec = num1Dec & num2Dec;
                    operationSymbol = '&';
                    result = decToBin(operationResultDec);
                    break;
                case 'OR':
                    operationResultDec = num1Dec | num2Dec;
                    operationSymbol = '|';
                    result = decToBin(operationResultDec);
                    break;
                case 'XOR':
                    operationResultDec = num1Dec ^ num2Dec;
                    operationSymbol = '^';
                    result = decToBin(operationResultDec);
                    break;
                default:
                    appendOutput('Operación no reconocida.');
                    return;
            }
            appendOutput(`${paddedInput1} (${num1Dec}) ${operationSymbol} ${paddedInput2} (${num2Dec}) = ${padBinary(result, maxLength)} (${operationResultDec})`);
        }
    } catch (e) {
        appendOutput(`Error al procesar: ${e.message}`);
    }
}

// Limpia el área de salida
function clearOutput() {
    document.getElementById('output').innerHTML = 'Bienvenido a la Consola Binaria.';
}