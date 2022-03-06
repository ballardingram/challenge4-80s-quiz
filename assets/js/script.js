// List of questions.

let questions = [
    {
        question: "What is the greatest city in the United States of America?",
        choiceA: "Chicago, Illinois",
        choiceB: "Austin, Texas",
        choiceC: "Seattle, Washington",
        correct: "A"
    },{
        question: "Assuming you know where the greatest city in the USA is located, what state is directly north of that?",
        choiceA: "Nebraska",
        choiceB: "Wisconsin",
        choiceC: "Florida",
        correct: "B"
    },{
        question: "Since its obvious you know where the greatest city in the US is located, what state is furthest west from there?",
        choiceA: "Utah",
        choiceB: "Idaho",
        choiceC: "Oregon",
        correct: "C"
    }
];

const lastQuestion = questions.length - 1;
let ruinningQuestion = 0;

function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML="<p>" + q.question + "</p>"
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}