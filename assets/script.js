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
var highscoresInput = document.getElementById("initials");
var highscoresName = document.getElementById("highscores-initials");
var highscoresDisplayScore = document.getElementById("highscores-score");
var endGameBtn = document.getElementById("endGameBtns");
var submitScoreBtns = document.getElementById("submit");

// creating an array of objects for the questions, choices and answers
var quizQuestions = [{
    // question property
question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
// choices for the question
choiceA: "script href='xxx.js",
choiceB: "script name='xxx.js'",
choiceC: "script src='xxx.js'",
choiceD: "script file='xxx.js'",
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
    choiceA: "script",
    choiceB: "js",
    choiceC: "javascript",
    choiceD: "scripting",
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
//  this function checks to see if the answer is correct or not and adds or subtracts time accordingly
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
// This function is the end page screen that displays your score after either completeing the quiz or upon timer run out
function showScore(){
    quizPage.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timerInterval);
    highscoresInput.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtns.addEventListener("click", function highscore(){
    
    
    if(highscoresInput.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoresInput.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameover.style.display = "none";
        highscoresContainer.style.display = "flex";
        highscoresDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));

        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoresName.innerHTML = "";
    highscoresDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoresName.appendChild(newNameSpan);
        highscoresDisplayScore.appendChild(newScoreSpan);
    }
}

// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
    firstPage.style.display = "none"
    gameover.style.display = "none";
    highscoresContainer.style.display = "flex";
    highscoresDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
    window.localStorage.clear();
    highscoresName.textContent = "";
    highscoresDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
    highscoresContainer.style.display = "none";
    gameover.style.display = "none";
    firstPage.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the response to each answer 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is wrong.
    }else{
        showScore();
    }
}

// This button starts the quiz!
startQuizbutton.addEventListener("click",startQuiz);