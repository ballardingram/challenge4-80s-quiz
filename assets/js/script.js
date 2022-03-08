const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById ('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame () {
startButton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion () {
  resetState()
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
questionElement.innerText = question.question
question.answers.forEach(answer => {
  const button = document.createElement('button')
  button.innerText = answer.text
  button.classList.add('btn')
  if (answer.correct) {
    button.dataset.correct = answer.correct
  }
  button.addEventListener('click', selectAnswer)
  answerButtonsElement.appendChild(button)
})
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild
    (answerButtonsElement.firstChild)

  }
}

function selectAnswer (e) {
const selectedButton = e.target
const correct = selectedButton.dataset.correct
setStatusClass(document.body, correct)
Array.from(answerButtonsElement.children).forEach(button => {
  setStatusClass(button, button.dataset.correct)
})
if(shuffledQuestions.length > currentQuestionIndex +1) {
nextButton.classList.remove('hide')
} else {
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  }
}

function setStatusClass(element,correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What year did Galaga come out?',
    answers: [
      {text: '1980', correct: false},
      {text: '1981', correct: true},
      {text: '1989', correct: false},
      {text: '2001', correct: false}
    ]
  },
  {
    question: 'What is the name of the Italian Plumber from Brooklyn who has a brother named Luigi?',
    answers: [
      {text: 'Wario', correct: false},
      {text: 'Yoshi', correct: false},
      {text: 'Mario', correct: true},
      {text: 'Toad', correct: false}
    ]
  },
  {
    question: 'Which one of these games is considered "Fixed Shooter?',
    answers: [
      {text: 'Tempest', correct: false},
      {text: 'Joust', correct: false},
      {text: 'Frogger', correct: false},
      {text: 'Centipede', correct: true}
    ]
  },
  {
    question: 'Who developed Pac-Man?',
    answers: [
      {text: 'Namco', correct: true},
      {text: 'Midway', correct: false},
      {text: 'Nintendo', correct: false},
      {text: 'Atari', correct: false}
    ]
  },
  {
    question: 'Which game is about a programmer that gets sucked into the "The Grid"?',
    answers: [
      {text: 'Spy Hunter', correct: false},
      {text: 'Moon Patrol', correct: false},
      {text: 'Tron', correct: true},
      {text: 'Tapper', correct: false},
    ]
  }
]