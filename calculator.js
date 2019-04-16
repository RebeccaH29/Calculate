
const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");
const reset = document.querySelector(".reset");
const result = document.querySelector(".result");

// Value of first number
let first = "";
// Second input value after the operation
let second = "";
// Saved value of second, when equals was pressed to have 25 + 5 = 30 = 35 = 40 = 45 functionality
let prevSecond = "";
// When first number is filled in, and operation is chosen this fill be true
let isFirstDone = false;
// When first input this flag helps to add 0. when . was clicked as first thing
let isFirstInput = true;
// When first number was given to second variable, this becomes done since we don't wait for operation
let isSecondDone = false;

// variable to memorize operation function, to call it afterwards
let action;

// Map/Object of the operations that the calculator can perform.
const OPERATIONS = {
  "+": (first, second) => parseFloat(first) + parseFloat(second),
  "-": (first, second) => (first) - (second),
  "*": (first, second) => (first) * (second),
  "/": (first, second) => (first) / (second),
  "Pow": (first, second) => (first) ** (second),
  "Mod": (first, second) => (first) % (second)
};

// Function to get results calculated and displayed.
const getResults = () => {
  // We make a result first value
  first = action(first, second);
  result.innerText = first;
  // Resetting second
  second = "";
  // Reseting all second value related flags to initial state
  isFirstInput = true;
  isSecondDone = false;
};

operations.forEach(operation =>
  operation.addEventListener("click", e => {
    // This is to reset case when 20 + 5 = 25 and each click on = will do +5 operation
    prevSecond = undefined;
    // We get an operation using obj['field'] notation to access field
    const operation = OPERATIONS[e.target.innerText];
    
    if (isFirstDone && isSecondDone) {
      getResults();
      action = operation;
      // This return is to avoid code at the bottom from execution
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

// Adding listener to all numbers buttons
numbers.forEach(number =>
  number.addEventListener("click", e => {
    // This is to reset case when 20 + 5 = 25 and each click on = will do +5 operation
    prevSecond = undefined;
    // we get the digit
    let aDigit = e.target.innerText;
    aDigit = handleDot(aDigit);
    // If it was validated correctly we can proceed with input of it
    if (!isFirstDone) {
      first = first + aDigit;
      result.innerText = first;
      // If first value was already done we proceed with same logic for second value
    } else {
      second = second + aDigit;
      result.innerText = second;
      // After first valid value was passed to second, we can make it done, cause we
      // don't wait for operation in second value case
      isSecondDone = true;
    }
  })
);

// Adding listener to equal button
equal.addEventListener("click", () => {
  // If both are good values to do an operation both of them will have flag of true
  if (isFirstDone && isSecondDone) {
    prevSecond = second;
    getResults();
  } else if (isFirstDone && prevSecond) {
    second = prevSecond;
    getResults();
  }
});

// Reset everything totally
reset.addEventListener("click", () => {
  first = "";
  second = "";
  isFirstDone = false;
  isSecondDone = false;
  result.innerText = "0";
  isFirstInput = true;
  action = undefined;
});
