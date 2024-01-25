// Below to be used to set the first question presented when the
// start quiz button is clicked.
let currentQuestion = 0;

// Below total of correct answers, can be changed to an array
// and accessed by the .length property. Concat with /amountOfQuestions to
// make it flow better on the page.
let total = 0;

// Below variables for timer
let timer = 100;
let timerInterval;

// QUESTIONS GO HERE//
const multiChoice = [
  {
    qnumb: 1,
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
    qnumb: 2,
    question: "JavaScript can be manually inserted into script tags on the html doc:",
    correct: "true",
    choices: [
      "true",
      "false"
    ]
  },
  {
    qnumb: 3,
    question: ".length does what?",
    correct: "Returns how many characters are in what is referenced.",
    choices: [
      "Returns the sum of what is referenced",
      "Returns how many characters are in what is referenced.",
      "Doubles the length and disables your css, obliterating your page in the process"
    ]
  },
  { // ADDED MORE QUESTIONS // 
    qnumb: 4,
    question: "Functions can receive more than one input:",
    correct: "True",
    choices: [
      "False",
      "True"
    ]
  },
  {
    qnumb: 5,
    question: "What operator is used to concatenate?",
    correct: "+",
    choices: [
      "-",
      "+",
      "#",
      "&&"
    ]
  }

];
// END QUESTIONS//

// declare variables to be interacted with.
const startQuiz = document.getElementById('startQuiz');
const quizContainer = document.getElementById('quizContainer');
const questionContainer = document.getElementById('questionContainer');
const answerChoicesContainer = document.getElementById('answerChoices');
const resultPage = document.getElementById('resultPage');
const timerDisplay = document.getElementById('timerDisplay');
//MAKE SURE DOM IS LOADED OR MANY ERRORS WILL OCCUR
// ADD EVENT LISTENER WITH NAMED FUNCTION TO RUN WHEN THE USER STARTS QUIZ//
document.addEventListener('DOMContentLoaded', function () {
    //HIDE THINGS SO THE QUIZ LOOKS NICE
    quizContainer.style.display = 'none'; 
    resultPage.style.display = 'none'; 

    startQuiz.addEventListener('click', function () {
        //starts with hiding the start quiz button
        startQuiz.style.display = 'none'; 
        //removes display none prop from the container
        quizContainer.style.display = 'block'; 
        //maintains hidden status of the results page
        resultPage.style.display = 'none'; // Hide the results page initially
        //once all of the above has ran these functions begin at the same time:
        //Starts a timer that counts down from 100 seconds.
        startTimer();
        //shuffles the questions to add variety to quiz.
        shuffle();
        //Shows the current question after shuffling
        displayQuestion(currentQuestion);
    });
});
//displayQuestion begins
function displayQuestion(questionIndex) {
    //checks if there are more questions, if so proceeds to next.
    if (questionIndex < multiChoice.length) {
        //empty array for true false values
        let choices = [];
        //using i instead of j breaks quiz
        for (let j = 0; j < multiChoice[questionIndex].choices.length; j++) {
            //push radio button into html doc
            choices.push( 
                //label for consistant styling and clickability
                '<label>'
                + '<input type="radio" name="questions' + questionIndex + '" value="' + multiChoice[questionIndex].choices[j] + '">'
                //Adds capital letters to the front of the choices for formatting
                + String.fromCharCode(65 + j) + ': '
                + shuffle()[questionIndex].choices[j]
                + '</label>'
            );
            console.log(questionIndex);
        }

        // Display the question and choices in the respective divs
        questionContainer.innerHTML = '<p class="questions">' + multiChoice[questionIndex].question + '</p>';
        answerChoicesContainer.innerHTML = '<ul class="answerChoices">' + choices.join('') + '</ul>';

        // Add event listener to answer choices
        const answerInputs = document.querySelectorAll('input[name="questions' + questionIndex + '"]');
        answerInputs.forEach(input => {
            input.addEventListener('click', function () {
                checkAnswer(input.value, questionIndex);
            });
        });
    } else {
        showResults();
    }
}
//fixes undefined function error
function deductTime(seconds) {
    timer -= seconds;
    if (timer < 0) {
        timer = 0;
    }
}

function checkAnswer(selectedAnswer, questionIndex) {
    //correctAnswer is the shuffled multichoice questions that have been correctly answered.
    const correctAnswer = multiChoice[questionIndex].correct;

    // if answer is true
    if (selectedAnswer === correctAnswer) {
        // adds to correctAnswer
        total++; 
    } else {
        // answer is false, deduct 10 seconds from the timer.
        deductTime(10);
    }

    // Proceed to the next question
    currentQuestion++;
    displayQuestion(currentQuestion);
}

function showResults() {
    //more hiding and revealing. 
    resultPage.style.display = 'block'; 
    quizContainer.style.display = 'none'; 
    
   
}

function startTimer() {
    //starts counting down from the value in the timer variable
    timerInterval = setInterval(function () {
        if (timer > 0) {
            timer--;
    // connects to html to allow the user to see it on the page in the #timerDisplay div
            timerDisplay.textContent = timer; 
             //once timer<0
        } else {
           //clear the timer
            clearInterval(timerInterval);
            //start the showResults function as this is supposed to be the end of the quiz.
            showResults(); 
        }
    }, 1000);
}

// Shuffle multiChoice array.
function shuffle() {
    let whateverIndex = multiChoice.length, randomIndex;
    while (whateverIndex > 0) {
        randomIndex = Math.floor(Math.random() * whateverIndex);
        whateverIndex--;
        [multiChoice[whateverIndex], multiChoice[randomIndex]] =
            [multiChoice[randomIndex], multiChoice[whateverIndex]];
            
    }
   return multiChoice;
}