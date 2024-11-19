// Quiz questions and answers
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our Solar System?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    },
    {
        question: "Which programming language is known as the language of the web?",
        options: ["Python", "Java", "C++", "JavaScript"],
        answer: "JavaScript"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        answer: "Albert Einstein"
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

document.addEventListener("DOMContentLoaded", () => {
    renderQuestion(currentQuestionIndex);
    document.getElementById('submit-btn').style.display = 'none';
});

// Render the current question
function renderQuestion(index) {
    const question = quizQuestions[index];
    const questionContainer = document.getElementById('question-container');
    
    questionContainer.innerHTML = `
        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
        <div>
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}
                </label><br>
            `).join('')}
        </div>
    `;

    // Disable Previous/Next buttons at the start and end
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === quizQuestions.length - 1;
    
    // Enable the submit button when the last question is displayed
    if (index === quizQuestions.length - 1) {
        document.getElementById('submit-btn').style.display = 'block';
    } else {
        document.getElementById('submit-btn').style.display = 'none';
    }
}

// Show next question
function showNextQuestion() {
    if (validateAnswer(currentQuestionIndex)) {
        currentQuestionIndex++;
        renderQuestion(currentQuestionIndex);
    } else {
        alert("Please select an answer before proceeding.");
    }
}

// Show previous question
function showPrevQuestion() {
    currentQuestionIndex--;
    renderQuestion(currentQuestionIndex);
}

// Validate answer
function validateAnswer(index) {
    const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedOption) {
        userAnswers[index] = selectedOption.value;
        return true;
    }
    return false;
}

// Show results
function showResults() {
    let score = 0;

    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    document.getElementById('question-container').style.display = 'none';
    document.getElementById('navigation').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    document.getElementById('score').textContent = `${score} out of ${quizQuestions.length}`;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('navigation').style.display = 'block';
    renderQuestion(currentQuestionIndex);
}
