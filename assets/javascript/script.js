

// DOM elements
// Get a reference
const quizEl = document.getElementById("quiz")
const InitHeader = document.getElementById("InitHeader")
const startBtn = document.getElementById("start-btn");
const questions = [
    {
      question: "An array can be contructed by ___.",
      choices: ["Array Literal Notation", "Array Constructor with a single parameter", "Array Contructor with multiple paramerters", "All of the above"],
      answer: "All of the above",
    },
    {
      question: "Which keyboard event object method is not obsolete?",
      choices: ["KeyboardEvent.initKeyEvent()", "KeyboardEvent.initKeyboardEvent", "KeyboardEvent()", "KeyboardEvent.char"],
      answer: "KeyboardEvent()",
    },
    {
      question: "The for statement loop repeats unil the specified condition ___.",
      choices: ["Is True", "Is False", "Is equal to one", "None of the above"],
      answer: "Is False",
    },
    {
      question: "If the parameter provided for a clearInterval() does not identify a previously established action ___",
      choices: ["Then, it stops previous setInterval()", "Then, it does nothing", "Then, it continues the repeating action", "Then, it is undefined and breaks our code"],
      answer: "Then, it does nothing",
    },
  ];

if (Array.isArray(questions)) {
  // Make sure the variable has the expected structure
  if (questions.length > 0) {
    console.log("The array has elements");
  } else {
    console.log("The array is empty");
  }
} else {
  console.log("The variable is not an array");
}

// Get the current question object
const questionTitleEl = document.getElementById("question-title")
const questionsEl = document.getElementById("questions")
const choicesEl = document.getElementById("choices")

// Get a reference to the timer element
const timerEl = document.getElementById("timer");
const duration = 33
// Set the initial time remaining to 33 seconds
let timeRemaining = duration;
// Function to update the timer display
function updateTimerDisplay() {
  timerEl.textContent = timeRemaining;
}

let intervalId;

// Function to end the game
function endGame() {
  console.log("Game over!");
  // Clear the timer interval
  clearInterval(intervalId);
  // Display the score or do something else to end the game
  // For example:
  const scoreEl = document.getElementById("highscores");
  scoreEl.textContent = "You scored X out of Y";
}

// Function to start the timer countdown
function startTimer() {
  // Call the updateTimerDisplay function to set the initial time display
  updateTimerDisplay();
  // Decrement the time remaining every second using setInterval
  intervalId = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    // Check if the time has run out
    if (timeRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

// Add a click event listener to the start button
startBtn.addEventListener("click", () => {
  // Start the timer countdown
  startTimer();
  // Hide the start button and InitHeader and show the quiz container
  InitHeader.classList.add("hidden");
  startBtn.classList.add("hidden");
  // Show the first question
  showQuestion(0)
  questionsEl.classList.remove("hidden"); 
});


// Function to show a question and its choices
function showQuestion(index) {
  // Set the question title and choices using innerHTML
  questionTitleEl.innerHTML = questions[index].question;
  choicesEl.innerHTML = `
    <li><button class="choice">${questions[index].choices[0]}</button></li>
    <li><button class="choice">${questions[index].choices[1]}</button></li>
    <li><button class="choice">${questions[index].choices[2]}</button></li>
    <li><button class="choice">${questions[index].choices[3]}</button></li>
  `;
  // Set up an event listener for user input
  choicesEl.addEventListener("click", handleChoiceClick);
  // Function to handle user input on a choice button
  function handleChoiceClick(event) {
    const choice = event.target.textContent;
    choicesEl.removeEventListener("click", handleChoiceClick);
    if (choice === questions[currentQuestionIndex].answer) {
      console.log("Correct!");
    } else {
      console.log("Incorrect!");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      endGame();
    }
    } if (index < questions.length - 1) {
    // Show the next question after a brief delay
    setTimeout(() => {
      showQuestion(index + 1);
    }, 1000);
    } else {
    // End the game after a brief delay
    setTimeout(() => {
      endGame();
    }, 1000);
  }
}
















