// Click to reveal button code.
document.addEventListener("DOMContentLoaded", function(event){
    showQuizBtn.addEventListener('click', function(event) {
    console.log("what")
    buildQuiz()
    })
})

function buildQuiz() {
console.log('hey')
const output = [];

myQuestions.forEach((currentQuestion, questionNumber) => {
  const answers = [];

  for (var letter in currentQuestion.answers) {
    answers.push(
      `<label>
      <input type="radio" name="question${questionNumber}" value="${letter}">
      ${letter} :
      ${currentQuestion.answers[letter]}
    </label>`
    );
  }

  output.push(
    `<div class="question"> ${currentQuestion.question} </div>
  <div class="answers"> ${answers.join("")} </div>`
  );
});

quizContainer.innerHTML = output.join("");
}


const quizContainer = document.getElementById("quiz");
const showQuizBtn = document.getElementById('showQuiz')
const myQuestions = [{
  question: "What state is known as the Lone Star State?",
  answers: {
    a: "Nebraska",
    b: "Montana",
    c: "Texas"
  },
  correctAnswer: "c"
},
{
  question: "What state is home to 'Sin City'?",
  answers: {
    a: "Washington",
    b: "Nevada",
    c: "Florida"
  },
  correctAnswer: "b"
},
{
    question: "What state is the largest?",
    answers: {
        a: "Alaska",
        b: "Rhode Island",
        c: "Hawaii"
    },
    correctAnswer:"a"
}
]

var i = 0;
function move() {
    if (i ==0) {
        i=1;
        var elem = document.getElementById("progressbar");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
                i=0;
            } else {
                width++;
                elem.style.width + "%";
            }
        }
    }
}