const questions = [
  {
    question: "¿Cuándo y en dónde nació?",
    answers: [
      { text: "Nació el 22 de enero de 1881 en Almonacid de la Sierra, Zaragoza", correct: true },
      { text: "Nació el 15 de marzo de 1883 en Barbastro", correct: false },
      { text: "Nació el 1 de octubre de 1880 en Zaragoza", correct: false },
      { text: "Nació el 22 de enero de 1885 en Almonacid de la Sierra, Zaragoza", correct: false },
    ],
  },
  {
    question: "¿En qué año inició el noviciado en Peralta de la Sal?",
    answers: [
      { text: "En 1885", correct: false },
      { text: "En 1900", correct: false },
      { text: "En 1899", correct: true },
      { text: "En 1897", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
  }
  Array.from(answersElement.children).forEach((button) => {
    button.disabled = true;
    button.style.backgroundColor = button.dataset.correct === "true" ? "green" : "red";
  });
  nextButton.style.display = "block";
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.textContent = `¡Terminaste! Tu puntuación es: ${score}/${questions.length}`;
  scoreElement.textContent = "";
  nextButton.style.display = "none";
}

nextButton.addEventListener("click", showNextQuestion);

showQuestion();