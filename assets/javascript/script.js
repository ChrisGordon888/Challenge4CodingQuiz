// DOM elements
const quizEl = document.getElementById("quiz");
const InitHeader = document.getElementById("InitHeader");
const startBtn = document.getElementById("start-btn");
const timerEl = document.getElementById("timer");
const questionTitleEl = document.getElementById("question-title");
const choicesEl = document.getElementById("choices");
choicesEl.addEventListener("click", handleChoiceClick);

const questionsEl = document.getElementById("questions");

let currentQuestionIndex = 0;
let score = 0;

const duration = 33; 
let timeRemaining = duration;

let intervalId;

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

function updateTimerDisplay() {
  timerEl.textContent = timeRemaining;
}

function handleChoiceClick(event) {
  if(event.target.nodeName === 'BUTTON') {
    let choice = event.target.textContent;
    if (choice === questions[currentQuestionIndex].answer) {
      console.log("Correct!");
      score++;
    } else {
      console.log("Incorrect!");
      timeRemaining -= 5;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      endGame();
    }
  }
}

function endGame() {
  clearInterval(intervalId);
  const scoreEl = document.getElementById("highscores");
  scoreEl.classList.remove('hidden');
  scoreEl.querySelector('h2').textContent = `You scored ${score} out of ${questions.length}`;

  const submitButton = document.getElementById("submit-score");
  const initialsInput = document.getElementById("initials");

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: initialsInput.value, score });
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayHighscores();
  });
}

function startTimer() {
  updateTimerDisplay();
  intervalId = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
      endGame();
    }
  }, 1000);
}

startBtn.addEventListener("click", () => {
  startTimer();
  InitHeader.classList.add("hidden");
  showQuestion(currentQuestionIndex);
  quizEl.classList.remove("hidden");
  questionsEl.classList.remove("hidden");
});

function showQuestion(index) {
  questionTitleEl.innerHTML = questions[index].question;
  choicesEl.innerHTML = '';
  for(let i = 0; i < questions[index].choices.length; i++) {
    choicesEl.innerHTML += `<li><button class="choice">${questions[index].choices[i]}</button></li>`;
  }
}

function displayHighscores() {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  const highscoreListEl = document.getElementById('highscore-list');
  highscoreListEl.innerHTML = '';
  if(highscores.length > 0) {
    highscores.forEach((highscore, index) => {
      highscoreListEl.innerHTML += `<li>${index+1}. ${highscore.initials} - ${highscore.score}</li>`;
    });
    document.getElementById('clear-highscores').classList.remove('hidden'); // Show the clear highscores button
  } else {
    highscoreListEl.innerHTML = "<li>No highscores yet.</li>";
    document.getElementById('clear-highscores').classList.add('hidden'); // Hide the clear highscores button
  }
  document.getElementById('view-highscores').classList.add('hidden');
  document.getElementById('highscores').classList.remove('hidden');
  document.getElementById('go-back').classList.remove('hidden');
}

// Event Listener for clearing highscores
document.getElementById('clear-highscores').addEventListener('click', () => {
  localStorage.removeItem('highscores');
  displayHighscores();
});

document.getElementById('view-highscores').addEventListener('click', (event) => {
  event.preventDefault();
  let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
  if (highscores.length > 0) {  // show the highscore list only if there are high scores
    quizEl.classList.add('hidden'); // Hide the quiz container
    InitHeader.classList.add("hidden");
    startBtn.classList.add("hidden");
    document.getElementById('highscores').classList.remove('hidden'); // Show the highscores
    document.getElementById('view-highscores').classList.add('hidden');
    document.getElementById('go-back').classList.remove('hidden');
    document.getElementById('clear-highscores').classList.remove('hidden');
    displayHighscores();
  }
});

// Event Listener for going back to the quiz
document.getElementById('go-back').addEventListener('click', () => {
  document.getElementById('view-highscores').classList.remove('hidden');
  document.getElementById('highscores').classList.add('hidden');
  document.getElementById('go-back').classList.add('hidden');
  document.getElementById('clear-highscores').classList.add('hidden');
  InitHeader.classList.remove("hidden");
  startBtn.classList.remove("hidden");
  document.getElementById("initials").value = '';
  currentQuestionIndex = 0;  // reset the question index
  score = 0;  // reset the score
  timeRemaining = duration;  // reset the time
});







