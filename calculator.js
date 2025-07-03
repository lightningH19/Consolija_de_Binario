function calculate() {
  const bin1 = document.getElementById("bin1").value;
  const bin2 = document.getElementById("bin2").value;
  const operation = document.getElementById("operation").value;
  const result = document.getElementById("result");

  // Validar entrada binaria
  if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
    result.textContent = "Ingresa solo números binarios válidos (0 y 1).";
    return;
  }

  const num1 = parseInt(bin1, 2);
  const num2 = parseInt(bin2, 2);
  let res;

  switch (operation) {
    case "add":
      res = num1 + num2;
      break;
    case "subtract":
      res = num1 - num2;
      break;
    case "multiply":
      res = num1 * num2;
      break;
    case "divide":
      if (num2 === 0) {
        result.textContent = "Error: división por cero.";
        return;
      }
      res = Math.floor(num1 / num2);
      break;
  }

  result.textContent = "Resultado: " + res.toString(2);
}