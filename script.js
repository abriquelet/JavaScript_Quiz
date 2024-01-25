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
//added area for previous scores
const previousHighScoresElement = document.getElementById('previousHighScores');
//actual scoreboard
const scoreboardElement = document.getElementById('scoreboard');
//added restartButton
const restartButton = document.getElementById('restart');
//MAKE SURE DOM IS LOADED OR MANY ERRORS WILL OCCUR
// ADD EVENT LISTENER WITH NAMED FUNCTION TO RUN WHEN THE USER STARTS QUIZ//
document.addEventListener('DOMContentLoaded', function () {
    //HIDE THINGS SO THE QUIZ LOOKS NICE
    quizContainer.style.display = 'none'; 
    resultPage.style.display = 'none'; 

    startQuiz.addEventListener('click', function () {
        
        const saveScoreForm = document.getElementById('saveScore');

        // submits initials
        saveScoreForm.addEventListener('submit', function (event) {
            //will not run without preventing default
            event.preventDefault(); 

            // takes from input text box
            const initialsInput = document.getElementById('initials');
            const initials = initialsInput.value;

            // first, middle, last initial
            if (initials.length === 3) {
                // send to local storage
                localStorage.setItem('userInitials', initials);
                // Concatenate initials with the score and store it in local storage
                localStorage.setItem('userScore', initials + ' scored ' + total + '/5');
                console.log('Initials stored:', initials + ' scored ' + total + '/5');
            } else {
                alert('You must enter exactly 3 characters to save your score.');
            }
        });

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
//IF RESTART IS CLICKED
//clears all values and goes to the startQuiz on click function again. 
restartButton.addEventListener('click', function () {
    // Reset variables
    currentQuestion = 0;
    total = 0;
    timer = 100;

    // Stop the timer interval
    clearInterval(timerInterval);

    // Reset display styles
    quizContainer.style.display = 'none';
    resultPage.style.display = 'none';
    startQuiz.style.display = 'block';

    // Clear the timer display
    timerDisplay.textContent = '';

    // Show the start quiz button
    startQuiz.style.display = 'block';

    // Start the quiz again
    startQuiz.click();
});

//displayQuestion begins
function displayQuestion(questionIndex) {
    if (questionIndex < multiChoice.length) {
        let choices = [];
        //using i breaks functionality, now only pulls answers relevant to the question by pulling from
        //multiChoice using dom as opposed to mixing up the choices with the questions. 
        for (let j = 0; j < multiChoice[questionIndex].choices.length; j++) {
            choices.push(
                '<label>'
                + '<input type="radio" name="questions' + questionIndex + '" value="' + multiChoice[questionIndex].choices[j] + '">'
                +   String.fromCharCode(65 + j) + ': '
                + multiChoice[questionIndex].choices[j]
                + '</label>'
            );
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
// updates scoreboard
function updateHighScores() {
    // get previous scores using getItem
    const previousScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    // gets current score and initials
    const initials = localStorage.getItem('userInitials');
    const userScore = total + "/5";
  
    //add current score to storage
    previousScores.push({ initials, score: userScore });
  
    // Sort the scores in descending order
    previousScores.sort((a, b) => {
      return parseInt(b.score) - parseInt(a.score);
    });
  
    // limits to top 3
    const top3Scores = previousScores.slice(0, 3);
  
    // injects to html
    const scoreboardElement = document.getElementById('scoreboard');
    if (scoreboardElement) {
      scoreboardElement.innerHTML = top3Scores.map(score => `<li>${score.initials}: ${score.score}</li>`).join('');
    }
  
    // using setItem to save to local storage
    localStorage.setItem('highScores', JSON.stringify(top3Scores));
  }

function showResults() {
    // more hiding and revealing.
    resultPage.style.display = 'block';
    quizContainer.style.display = 'none';
  
    let score = total + "/5";
    let scoreValueElement = document.getElementById('scoreValue');
    // targets html 
    if (scoreValueElement) {
      scoreValueElement.textContent = score;
  
      // anon function 
      updateHighScores();
    } else {
      alert("Why start a quiz if you aren't going to answer any questions?");
    }
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
