// Elements for "Welcome Page" and "Start Button"
const welcomeEl = document.querySelector("#welcome");
const startQuizBtnEl = document.querySelector("#startQuiz");

// Elements for the structure of the quiz. This includes questions and answers.
const quizEl = document.querySelector("#quiz");
const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");

// Elements for the Scoreboard, initials, and final score.
const inputScoreEl = document.querySelector("#inputScore");
const initialsEl = document.querySelector("#initials");
const submitInitialsBtnEl = document.querySelector("#submitInitials");
const userScoreEl = document.querySelector("#score");

// Elements for the scoreboard itself. Displays the scores, with options to clear and return to the landing page.
const highScoresEl = document.querySelector("#highScores");
const scoresEl = document.querySelector("#scores");
const goBackBtnEl = document.querySelector("#goBack");
const clearScoresBtnEl = document.querySelector("#clearScores");

// List of variables and const that are used throughout the rest of the code.
const viewHScoresBtnEl = document.querySelector("#viewHScores");
const timerEl = document.querySelector("#timer");
var score = 0;
var currentQ = 0;
var highScores = [];
var interval;
var timeGiven = 100;
var secondsElapsed = 0;

// Timer code.
function startTimer() {
    timerEl.textContent = timeGiven;
    interval = setInterval(function () {
        secondsElapsed++;
        timerEl.textContent = timeGiven - secondsElapsed;
        if (secondsElapsed >= timeGiven) {
            currentQ = questions.length;
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}


// This code changes it from question to question. It interacts with the timer to impac tthe final score.
function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        renderQuestion();
    } else {
        stopTimer();
        if ((timeGiven - secondsElapsed) > 0)
            score += (timeGiven - secondsElapsed);
        userScoreEl.textContent = score;
        hide(quizEl);
        show(inputScoreEl);
        timerEl.textContent = 0;
    }
}

// This code validates if the answer is correct or incorrect. A message will be displayed if the user got it correct or incorrect.
function checkAnswer(answer) {
    if (questions[currentQ].answer == questions[currentQ].choices[answer.id]) {
        score += 5;
        displayMessage("Correct!");
    }
    else {
        secondsElapsed += 10;
        displayMessage("Don't veg out! That's wrong.");
    }
}

// This displays the message at the bottom of the question for two (2) seconds.
function displayMessage(m) {
    let messageHr = document.createElement("hr");
    let messageEl = document.createElement("div");
    messageEl.textContent = m;
    document.querySelector(".jumbotron").appendChild(messageHr);
    document.querySelector(".jumbotron").appendChild(messageEl);
    setTimeout(function () {
            messageHr.remove();
            messageEl.remove();
    }, 2000);

}

function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

//This is the reset code.
function reset() {
    score = 0;
    currentQ = 0;
    secondsElapsed = 0;
    timerEl.textContent = 0;
}

// Renders the current question.
function renderQuestion() {
    questionEl.textContent = questions[currentQ].title;
    for (i = 0; i < answersEl.children.length; i++) {
        answersEl.children[i].children[0].textContent = `${(i + 1)}: ${questions[currentQ].choices[i]}`;
    }
}

// This stores the high score information in local storage.
function renderHighScores() {
    // Clear content
    scoresEl.innerHTML = "";
    show(highScoresEl);
    highScores = JSON.parse(localStorage.getItem("scores"));
    for (let i = 0; i < highScores.length; i++) {
        let scoreItem = document.createElement("div");
        scoreItem.className += "row mb-3 p-2";
        console.log(scoreItem)
        scoreItem.setAttribute("style", "background-color:darkslategrey");
        scoreItem.textContent = `${(i + 1)}. ${highScores[i].username} - ${highScores[i].userScore}`;
        scoresEl.appendChild(scoreItem);
    }
}


// This code is used to display the high score.
viewHScoresBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    hide(quizEl);
    hide(inputScoreEl);
    renderHighScores();
    stopTimer();
    reset();
});

// This code starts the quiz from the homepage only.
startQuizBtnEl.addEventListener("click", function () {
    hide(welcomeEl);
    startTimer();
    renderQuestion();
    show(quizEl);
});

// This code checks to see if the answer is correct and calls the next question.
answersEl.addEventListener("click", function (e) {
    if (e.target.matches("button")) {
        checkAnswer(e.target);
        nextQuestion();
    }
});

// This puts the users score as an object pusehed to local storage. It renders high scores as well.
submitInitialsBtnEl.addEventListener("click", function () {
    let initValue = initialsEl.value.trim();
    if (initValue) {
        let userScore = { username: initValue, userScore: score };
        initialsEl.value = '';
        highScores = JSON.parse(localStorage.getItem("scores")) || [];
        highScores.push(userScore)
        localStorage.setItem("scores", JSON.stringify(highScores));
        hide(inputScoreEl);
        renderHighScores();
        reset();
    }
});

// Returns back to the landing page.
goBackBtnEl.addEventListener("click", function () {
    hide(highScoresEl);
    show(welcomeEl);
});

// Clears saved scores from local storage.
clearScoresBtnEl.addEventListener("click", function () {
    highScores = [];
    localStorage.setItem("scores", JSON.stringify(highScores));
    renderHighScores();
});


