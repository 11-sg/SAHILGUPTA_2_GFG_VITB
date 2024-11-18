const problems = {
    1: {
      description: "Write a function that takes two numbers and returns their sum.",
      functionName: "sum",
      testCases: [
        { input: [3, 5], expected: 8 },
        { input: [-2, 10], expected: 8 },
        { input: [0, 0], expected: 0 }
      ]
    },
    2: {
      description: "Write a function that checks if a string is a palindrome.",
      functionName: "isPalindrome",
      testCases: [
        { input: ["radar"], expected: true },
        { input: ["hello"], expected: false },
        { input: ["level"], expected: true }
      ]
    }
  };

  const problemSelector = document.getElementById("problemSelector");
  const problemDescription = document.getElementById("problemDescription");
  const codeInput = document.getElementById("codeInput");
  const submitCode = document.getElementById("submitCode");
  const results = document.getElementById("results");

  function loadProblemDescription() {
    const selectedProblem = problemSelector.value;
    problemDescription.textContent = problems[selectedProblem].description;
    codeInput.value = `function ${problems[selectedProblem].functionName}() {\n  // Your code here\n}`;
  }


  function evaluateCode() {
    const selectedProblem = problemSelector.value;
    const { testCases, functionName } = problems[selectedProblem];
    const userCode = codeInput.value;

    let feedback = "";
    let score = 0;

    try {
      // Dynamically evaluate user code
      const userFunction = new Function(`${userCode}; return ${functionName};`)();

      // Validate against test cases
      testCases.forEach((testCase, index) => {
        const result = userFunction(...testCase.input);
        const passed = result === testCase.expected;

        feedback += `Test Case ${index + 1}: ${
          passed ? "✅ Passed" : `❌ Failed (Expected: ${testCase.expected}, Got: ${result})`
        }\n`;

        if (passed) score++;
      });

      feedback += `\nYour Score: ${score}/${testCases.length}`;
    } catch (err) {
      feedback = `Error: ${err.message}`;
    }

    // Display Results
    results.textContent = feedback;
    results.classList.remove("d-none", "alert-success", "alert-danger");
    results.classList.add(score === testCases.length ? "alert-success" : "alert-danger");
  }

  // Event Listeners
  problemSelector.addEventListener("change", loadProblemDescription);
  submitCode.addEventListener("click", evaluateCode);

  // Initialize
  loadProblemDescription();