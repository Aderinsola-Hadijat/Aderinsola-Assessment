const display = document.getElementById("display");
const history = document.getElementById("history");
let currentInput = "";
let historyLog = [];

function updateDisplay(value) {
  display.textContent = value || "0";
}

function evaluateExpression() {
  try {
    const result = eval(currentInput);
    historyLog.unshift(`${currentInput} = ${result}`);
    currentInput = result.toString();
    updateDisplay(currentInput);
    updateHistory();
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}

function updateHistory() {
  history.innerHTML = historyLog.slice(0, 5).map(item => `<div>${item}</div>`).join('');
}

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      currentInput = "";
      updateDisplay("");
    } else if (value === "=") {
      evaluateExpression();
    } else if (value === "←") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

document.addEventListener("keydown", e => {
  if (/[0-9+\-*/.=]/.test(e.key)) {
    if (e.key === "=" || e.key === "Enter") {
      evaluateExpression();
    } else {
      currentInput += e.key;
      updateDisplay(currentInput);
    }
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (e.key === "Escape") {
    currentInput = "";
    updateDisplay("");
  }
});