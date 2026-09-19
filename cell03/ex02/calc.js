function showResult(message) {
  alert(message);
  console.log(message);
}

function isPositiveInteger(str) {
  return /^\d+$/.test(str.trim());
}

document.getElementById("calc-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const leftStr = document.getElementById("left-operand").value;
  const rightStr = document.getElementById("right-operand").value;
  const operator = document.getElementById("operator").value;

  if (!isPositiveInteger(leftStr) || !isPositiveInteger(rightStr)) {
    showResult("Error :(");
    return;
  }

  const leftNum = Number(leftStr);
  const rightNum = Number(rightStr);

  if ((operator === "/" || operator === "%") && rightNum === 0) {
    showResult("It's over 9000!");
    return;
  }

  let result;
  switch (operator) {
    case "+":
      result = leftNum + rightNum;
      break;
    case "-":
      result = leftNum - rightNum;
      break;
    case "*":
      result = leftNum * rightNum;
      break;
    case "/":
      result = leftNum / rightNum;
      break;
    case "%":
      result = leftNum % rightNum;
      break;
  }

  showResult(result);
});

setInterval(function () {
  alert("Please, use me...");
}, 30000);