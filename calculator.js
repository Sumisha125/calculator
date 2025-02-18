console.log("calculator");

// Select the display and all buttons
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");

// Variable to store the current expression
let expression = "";

// Function to handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.innerText;

    // Append number/operator to the expression
    if (
      button.classList.contains("number") ||
      button.classList.contains("operator")
    ) {
      expression += value;
      display.innerText = expression;
    }

    // Prevent multiple dots in a single number
    else if (button.classList.contains("dot")) {
      let lastNumber = expression.split(/[\+\-\*\/]/).pop(); // Get the last number
      if (!lastNumber.includes(".")) {
        expression += value;
        display.innerText = expression;
      }
    }

    // Calculate result but don't show "="
    else if (button.classList.contains("equals")) {
      try {
        let result = eval(expression);

        // Round result to 5 decimal places if it's a long decimal
        if (result.toString().includes(".")) {
          result = parseFloat(result.toFixed(5));
        }

        display.innerText = result;
        expression = result.toString(); // Store rounded result for further calculations
      } catch {
        display.innerText = "Error"; // Handle invalid expressions
        expression = "";
      }
    }

    // Add bracket to the expression
    else if (button.classList.contains("bracket")) {
      expression += value;
      display.innerText = expression;
    }

    // Square the last number in the expression
    else if (button.classList.contains("square")) {
      // Add the ^2 symbol to the expression instead of calculating immediately
      expression += "**2";
      display.innerText = expression.replace("**2", "²"); // Show as '²' in UI
    }

    // Clear everything when CLR is clicked
    else if (button.classList.contains("clear")) {
      expression = "";
      display.innerText = "0";
    }

    // Delete the last character when DEL is clicked
    else if (button.classList.contains("delete")) {
      expression = expression.slice(0, -1); // Remove last character
      display.innerText = expression || "0"; // Show 0 if empty
    }
  });
});
