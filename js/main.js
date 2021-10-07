let theme = localStorage.getItem("theme");
if (theme) {
  let activeClass = document.getElementsByClassName("button-label active");
  if (activeClass.length > 0) {
    activeClass[0].setAttribute("class", "button-label");
  }
  document.getElementById(theme).setAttribute("class", "button-label active");
  document.body.setAttribute("data-theme", theme);
}
let result = document.getElementById("result");
let calcButtons = document.getElementsByClassName("calc__button");
for (let calc of calcButtons) {
  calc.onclick = () => addValue(calc.innerHTML);
}
let labels = document.getElementsByClassName("button-label");
for (let label of labels) {
  label.onclick = function () {
    let activeClass = document.getElementsByClassName("button-label active");
    if (activeClass.length > 0) {
      activeClass[0].setAttribute("class", "button-label");
    }
    label.setAttribute("class", "button-label active");
    document.body.setAttribute("data-theme", label.getAttribute("id"));
    localStorage.setItem("theme", document.body.getAttribute("data-theme"));
  };
}
function addValue(newVal) {
  let oldVal = result.innerHTML;
  if (newVal !== "DEL" && newVal !== "=" && newVal !== "RESET") {
    if (
      oldVal === "0" &&
      newVal !== "x" &&
      newVal !== "/" &&
      newVal !== "+" &&
      newVal !== "-" &&
      newVal !== "."
    ) {
      result.innerHTML = newVal;
    } else {
      if (newVal === "x") {
        result.innerHTML += "*";
      } else {
        result.innerHTML += newVal;
      }
    }
  }
  if (newVal === "DEL") {
    result.innerHTML = oldVal.substr(0, oldVal.length - 1);
    result.innerHTML == "" ? (result.innerHTML = "0") : "";
  } else if (newVal === "RESET") {
    result.innerHTML = "0";
  } else if (newVal === "=") {
    let operator = result.innerHTML;
    if (operator.includes("+")) {
      execOpertation(operator, "sum");
    } else if (operator.includes("-")) {
      execOpertation(operator, "subs");
    } else if (operator.includes("*")) {
      execOpertation(operator, "multiply");
    } else if (operator.includes("/")) {
      execOpertation(operator, "divide");
    }
  }
}

function execOpertation(operator, divider) {
  if (divider === "sum") {
    let resultArray = operator.split("+");
    result.innerHTML = Math.round(
      parseFloat(resultArray[0]) + parseFloat(resultArray[1])
    );
  } else if (divider === "subs") {
    let resultArray = operator.split("-");
    result.innerHTML = parseFloat(resultArray[0]) - parseFloat(resultArray[1]);
  } else if (divider === "multiply") {
    let resultArray = operator.split("*");
    result.innerHTML = parseFloat(resultArray[0]) * parseFloat(resultArray[1]);
  } else if (divider === "divide") {
    let resultArray = operator.split("/");
    result.innerHTML = parseFloat(resultArray[0]) / parseFloat(resultArray[1]);
  }
}
