// listing HTML ids to be used in the script
var firstPage = document.getElementById("firstPage");
var quizPage = document.getElementById("quiz");
var resultsPage = document.getElementById("quiz-results");
var startQuizbutton = document.getElementById("start-btn");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var timer = document.getElementById("timer");
var finalScore = document.getElementById("final-score");
var gameover = document.getElementById("gameover");
var questions = document.getElementById("questions");
var highscoresContainer = document.getElementById("highscores-container");
var highscoresDiv = document.getElementById("highscorePage");
var highscoresInputname = document.getElementById("initials");
var HighscoresName = document.getElementById("highscores-intials");
var highscoresDisplayScore = document.getElementById("highscores-score");
var endGameBtn = document.getElementById("endGameBtns");
var submitScoreBtns = document.getElementById("submit");

// creating an array of objects for the questions, choices and answers
var quizQuestions = [{
    // question property
question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
// choices for the question
choiceA: "<script href='xxx.js'>",
choiceB: "<script name='xxx.js'>",
choiceC: "<script src='xxx.js'>",
choiceD: "<script file='xxx.js'>",
// correct answer property
correctAnswer: "c"},
{
question: "How do you write 'Hello World' in an alert box?",
choiceA: "msgBox('Hello World');",
choiceB: "alertBox('Hello World');",
choiceC: "msg('Hello World');",
choiceD: "alert('Hello World');",
correctAnswer: "d"},
{
question: "How do you create a function in JavaScript?",
choiceA: "function = myFunction()",
choiceB: "function myFunction()",
choiceC: "function:myFunction()",
choiceD: "function myFunction()",
correctAnswer: "b"},
{
question: "How do you call a function named 'myFunction'?",
choiceA: "call myFunction()",
choiceB: "call function myFunction()",
choiceC: "myFunction()",
choiceD: "function myFunction()",
correctAnswer: "c"},
{
    question: "Iniside which HTML element do we put the JavaScript?",
    choiceA: "<script>",
    choiceB: "<js>",
    choiceC: "<javascript>",
    choiceD: "<scripting>",
    correctAnswer: "a"},

];
    // adding global variables because they will be used in multiple functions
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// adding this function to cycle through the questions choices and answers
function generateQuizQuestion() {
    gameover.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questions.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};
//  this 
function startQuiz() {
    gameover.style.display = "none";
    firstPage.style.display = "none";
    generateQuizQuestion();
    
    // start timer
    timerInterval = setInterval(function() {
        timeLeft--;
        timer.textContent = "Time: " + timeLeft;
        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizPage.style.display = "block";
}