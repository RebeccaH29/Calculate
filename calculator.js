const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");
const reset = document.querySelector(".reset");
const result = document.querySelector(".result");

let first = "";
let second = "";
let prevSecond = "";
let isFirstDone = false;
let isFirstInput = true;
let isSecondDone = false;

let action;

const OPERATIONS = {
  "+": (first, second) => parseFloat(first) + parseFloat(second),
  "-": (first, second) => (first) - (second),
  "*": (first, second) => (first) * (second),
  "/": (first, second) => (first) / (second),
  "Pow": (first, second) => (first) ** (second),
  "Mod": (first, second) => (first) % (second)
};

const getResults = () => {
  first = action(first, second);
  result.innerText = first;
  second = "";
  isFirstInput = true;
  isSecondDone = false;
};

operations.forEach(operation =>
  operation.addEventListener("click", e => {
    prevSecond = undefined;
    const operation = OPERATIONS[e.target.innerText];
    
    if (isFirstDone && isSecondDone) {
      getResults();
      action = operation;
      return;
    }
   
    if (isFirstDone || !isFirstInput) {
      action = operation;
      isFirstDone = true;
    }
  })
);

const handleDot = value => {
  if (isFirstInput) {
    isFirstInput = false;
    return value !== "." ? value : "0.";
  }
  if (isFirstDone && isFirstInput) {
    isFirstInput = false;
    return value !== "." ? value : "0.";
  }
  isFirstInput = false;
  return value;
};

numbers.forEach(number =>
  number.addEventListener("click", e => {
    prevSecond = undefined;
    let aDigit = e.target.innerText;
    aDigit = handleDot(aDigit);
    if (!isFirstDone) {
      first = first + aDigit;
      result.innerText = first;
    } else {
      second = second + aDigit;
      result.innerText = second;
      isSecondDone = true;
    }
  })
);

equal.addEventListener("click", () => {
  if (isFirstDone && isSecondDone) {
    prevSecond = second;
    getResults();
  } else if (isFirstDone && prevSecond) {
    second = prevSecond;
    getResults();
  }
});

reset.addEventListener("click", () => {
  first = "";
  second = "";
  isFirstDone = false;
  isSecondDone = false;
  result.innerText = "0";
  isFirstInput = true;
  action = undefined;
});
