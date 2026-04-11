// Task 4: Store questions in an array of objects
var questions = [
    {
        q: "What is 2 + 2?",
        options: ["3", "4", "5", "22"],
        correct: 1 // The second option (index 1) is "4"
    },
    {
        q: "What color is the sky?",
        options: ["Green", "Blue", "Red", "Yellow"],
        correct: 1
    },
    {
        q: "Is JavaScript fun?",
        options: ["No", "Maybe", "Yes", "What is JS?"],
        correct: 2
    }
];

// Variables to keep track of the quiz state
var currentQuestionIndex = 0;
var score = 0;
var selectedOption = -1; // -1 means nothing is selected yet

// This function shows the question and the buttons
function showQuestion() {
    var qData = questions[currentQuestionIndex];
    
    // Set the question text
    document.getElementById("question").innerHTML = qData.q;
    
    // Get all the buttons
    var buttons = document.getElementsByClassName("btn");
    
    // Set the text for each button manually
    buttons[0].innerHTML = qData.options[0];
    buttons[1].innerHTML = qData.options[1];
    buttons[2].innerHTML = qData.options[2];
    buttons[3].innerHTML = qData.options[3];

    // Reset button colors
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    
    selectedOption = -1; // Reset selection for new question
}

// This runs when a user clicks an answer button
function selectAnswer(num) {
    selectedOption = num;
    
    // Remove "selected" color from all buttons
    var buttons = document.getElementsByClassName("btn");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("selected");
    }
    
    // Add "selected" color to the one clicked
    buttons[num].classList.add("selected");
}

// This runs when "Next" is clicked
function goToNextQuestion() {
    if (selectedOption == -1) {
        alert("Please pick an answer first!");
        return;
    }

    // Check if the answer was correct
    if (selectedOption == questions[currentQuestionIndex].correct) {
        score = score + 1;
    }

    // Move to next question or end the quiz
    currentQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Task 5: Show the final score
function showResults() {
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";
    
    document.getElementById("final-score").innerHTML = "You got " + score + " out of " + questions.length;

    // Show a special message based on the score
    if (score == 3) {
        document.getElementById("message").innerHTML = "Excellent!";
    } else if (score >= 1) {
        document.getElementById("message").innerHTML = "Good!";
    } else {
        document.getElementById("message").innerHTML = "Try Again!";
    }
}

// Task 6: Bonus Restart Feature
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-section").style.display = "block";
    document.getElementById("result-section").style.display = "none";
    showQuestion();
}

// Start the quiz for the first time
showQuestion();
