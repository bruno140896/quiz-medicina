let currentQuestion = 0;
let score = 0;

// Variáveis do cronômetro
let timer;
let timeLeft = 15;
const timerEl = document.getElementById("timer");

// Elementos da interface
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const resultEl = document.getElementById("result");
const restartButton = document.getElementById("restart-button");

function showQuestion() {
  clearInterval(timer); // Para o cronômetro anterior
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countDown, 1000);

  const question = quizQuestions[currentQuestion];
  questionEl.textContent = question.question;
  optionsEl.innerHTML = "";

  question.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.addEventListener("click", () => {
      clearInterval(timer); // Para o cronômetro ao responder
      selectAnswer(option);
    });
    optionsEl.appendChild(li);
  });
}

function selectAnswer(selected) {
  const correct = quizQuestions[currentQuestion].correctAnswer;
  if (selected === correct) score++;
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  timerEl.textContent = ""; // limpa o cronômetro no final
  nextButton.style.display = "none";
  resultEl.textContent = `Resultados do Quiz ${score} de ${quizQuestions.length} perguntas.`;
  restartButton.classList.add("show"); // Mostra botão com fade-in
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  restartButton.classList.remove("show");
  nextButton.style.display = "block";
  showQuestion();
}

function updateTimer() {
  timerEl.textContent = `Tempo restante: ${timeLeft}s`;
}

function countDown() {
  timeLeft--;
  updateTimer();
  if (timeLeft === 0) {
    clearInterval(timer);
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
}

// Início do quiz ao clicar no botão "Iniciar"
startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

// Eventos dos botões
nextButton.addEventListener("click", showQuestion);
restartButton.addEventListener("click", restartQuiz);


