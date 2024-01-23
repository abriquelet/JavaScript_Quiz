//Below to be used to set the first question presented when the 
//start quiz button is clicked.

let currentQuestion = 0;

//Below total of correct answers, can be changed to an array 
//and accessed by the .length property. Concat with /amountOfQuestions to
//make it flow better on the page.

let total = 0;

//QUESTIONS GO HERE//
const multiChoice = [ {
qnumb:1,
question: "A common console debugging tool:",
correct: "console.log()",
choices: [
"console.log()",
"error handling",
"toLocaleString()",
"toLowerCase()"
]
},
{
qnumb:2,
question: "JavaScript can be manually inserted into <script> tags on the html doc:",
correct: "true",
choices: [
    "true",
    "false"
]
},
{
qnumb:3,
question: ".length does what?",
correct: "Returns how many characters are in what is referenced.",
choices: [
    "Returns the sum of what is referenced",
    "Returns how many characters are in what is referenced.",
    "Doubles the length and disables your css, obliterating your page in the process" 
]
}
]
//END QUESTIONS//

//declare variables to be interacted with.
const startQuiz = document.getElementById('startQuiz');
const quizContainer = document.getElementsByClassName('quizContainer');
const countdown = document.getElementById('countdown');
const cText = document.getElementById('cText');
const seconds = document.getElementById('seconds');
const insertQ = document.getElementById('insertQ');
const multChoice = document.getElementById('multChoice');
const resultPage = document.getElementsByClassName('resultPage');
const fResult = document.getElementById('fResult');
const hideStart = document.getElementsByClassName('hideStart');
const restart = document.getElementById('restart');
const saveScore = document.getElementById('saveScore');
const prevHigh = document.getElementById('prevHigh');
const prevScores = document.getElementById('prevScores');



//ADD EVENT LISTENER WITH NAMED FUNCTION TO RUN WHEN USER STARTS QUIZ//

startQuiz.addEventListener('click', shuffle);

// Shuffle multiChoice array

function shuffle() {
let whateverIndex = multiChoice.length, randomIndex;
    while (whateverIndex>0){
let randomIndex = Math.floor(Math.random() * multiChoice.length);
    whateverIndex--;
    [multiChoice[whateverIndex], multiChoice[randomIndex]] =
    [multiChoice[randomIndex], multiChoice[whateverIndex]];
    console.log(shuffle());
}
  }
// let starter = function shuffle(qnumb) }

// Start game?