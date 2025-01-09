const quizData = [
    {
        question: "Which is the largest planet in our solar system?",
        options: ["Mars", "Jupiter", "Saturn", "Earth"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correct: 0
    },
    {
        question: "Which animal is known as the 'King of the Jungle'?",
        options: ["Tiger", "Lion", "Elephant", "Gorilla"],
        correct: 1
    },
    {
        question: "How many continents are there in the world?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["Australia", "New Zealand", "South Africa", "India"],
        correct: 0
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        correct: 3
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Mercury", "Jupiter"],
        correct: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: [
            "Vincent van Gogh",
            "Leonardo da Vinci",
            "Pablo Picasso",
            "Michelangelo"
        ],
        correct: 1
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
        correct: 2
    },
    {
        question: "Which is the fastest land animal?",
        options: ["Cheetah", "Lion", "Horse", "Antelope"],
        correct: 0
    }
];

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.initializeElements();
        this.setupEventListeners();
        this.updateTotalQuestions();
    }

    initializeElements() {
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultScreen = document.getElementById('result-screen');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextButton = document.getElementById('next-btn');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.scoreSpan = document.getElementById('score');
        this.finalScore = document.getElementById('final-score');
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => this.startQuiz());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartQuiz());
    }

    startQuiz() {
        this.startScreen.classList.add('hidden');
        this.quizScreen.classList.remove('hidden');
        this.loadQuestion();
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        this.questionText.textContent = question.question;
        this.currentQuestionSpan.textContent = this.currentQuestionIndex + 1;
        this.optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.className = 'option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkAnswer(index));
            this.optionsContainer.appendChild(button);
        });
        
        this.nextButton.classList.add('hidden');
    }

    checkAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestionIndex];
        const options = this.optionsContainer.children;
        
        for (let option of options) {
            option.style.pointerEvents = 'none';
        }

        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            this.score++;
            this.scoreSpan.textContent = this.score;
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }

        this.nextButton.classList.remove('hidden');
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.quizScreen.classList.add('hidden');
        this.resultScreen.classList.remove('hidden');
        this.finalScore.textContent = `Your score: ${this.score} out of ${this.questions.length}`;
        
        // Add star rating container
        const starContainer = document.createElement('div');
        starContainer.className = 'star-rating';
        starContainer.innerHTML = `
            <p>How would you rate this quiz?</p>
            <div class="stars">
                ${Array(5).fill().map((_, i) => 
                    `<span class="star" data-rating="${i + 1}">★</span>`
                ).join('')}
            </div>
            <p class="rating-message"></p>
        `;
        
        // Add star rating functionality
        const stars = starContainer.querySelectorAll('.star');
        const ratingMessage = starContainer.querySelector('.rating-message');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const rating = star.dataset.rating;
                stars.forEach(s => {
                    s.classList.toggle('hover', s.dataset.rating <= rating);
                });
            });
            
            star.addEventListener('mouseout', () => {
                stars.forEach(s => s.classList.remove('hover'));
            });
            
            star.addEventListener('click', () => {
                const rating = star.dataset.rating;
                stars.forEach(s => {
                    s.classList.toggle('selected', s.dataset.rating <= rating);
                });
                ratingMessage.textContent = `Thanks for rating ${rating} stars!`;
            });
        });
        
        this.resultScreen.insertBefore(starContainer, document.getElementById('restart-btn'));
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.scoreSpan.textContent = '0';
        this.resultScreen.classList.add('hidden');
        this.startQuiz();
    }

    updateTotalQuestions() {
        document.getElementById('total-questions').textContent = this.questions.length;
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new Quiz(quizData);
}); 