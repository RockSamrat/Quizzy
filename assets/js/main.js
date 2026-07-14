import { randomSymbolPattern } from "./utils.js";
import { questions } from "./questions.js";

const startButtonMain = document.getElementById("start");
const mainPage = document.getElementById("main-page");
const examPage = document.getElementById("exam-page");
const modalPage = document.getElementById("modal-overlay");
const startButtonModal = document.getElementById("start-rule");
const question = document.getElementById("question");
const optionOne = document.getElementById("option-1");
const optionTwo = document.getElementById("option-2");
const optionThree = document.getElementById("option-3");
const optionFour = document.getElementById("option-4");
const nextButton = document.getElementById("next-btn");
const optionButtons = document.querySelectorAll(".option-btn");
const resultPage = document.getElementById("result-page");
const timer = document.getElementById("timer");
const restart = document.getElementById("restart");
const finalScore = document.getElementById("final-score");
let currentIndex = 0;
let shuffledQuestions = [];
let userAnswers = [];
let timeleft = 180;
let timeInterval = null;

function loadQuestion(shuffledQuestions) {
  const currentQuestion = shuffledQuestions[currentIndex];
  question.textContent = currentQuestion.question;
  optionOne.textContent = currentQuestion.options[0];
  optionTwo.textContent = currentQuestion.options[1];
  optionThree.textContent = currentQuestion.options[2];
  optionFour.textContent = currentQuestion.options[3];
}

function submitExam() {
  examPage.style.display = "none";
  resultPage.style.display = "flex";
  let score = 0;
  for (let i = 0; i < shuffledQuestions.length; i++) {
    if (shuffledQuestions[i].answer === userAnswers[i]) {
      score++;
    }
  }
  clearInterval(timeInterval);
  finalScore.textContent = `You scored ${score} out of ${shuffledQuestions.length}.`
  console.log(score);
  console.log(userAnswers);
  console.log(shuffledQuestions.map((q) => q.answer));
}

function startTimer() {
  timeInterval = setInterval(() => {
    timeleft -= 1;
    let minutes = Math.floor(timeleft / 60);
    let seconds = timeleft % 60;
    seconds = String(seconds).padStart(2, "0");
    timer.textContent = `${minutes}:${seconds}`;
    if (timeleft === 0) {
      submitExam();
    }
  }, 1000);
}

startButtonModal.addEventListener("click", () => {
  const checked = document.getElementById("checkbox").checked;
  if (checked) {
    localStorage.setItem("skipModal", "true");
  }
  modalPage.style.display = "none";
  examPage.style.display = "flex";
  startTimer();
});

startButtonMain.addEventListener("click", () => {
  const difficultyValue = document.getElementById("difficulty").value;
  const categoryValue = document.getElementById("category").value;
  const filteredQuestions = questions.filter(
    (item) =>
      item.difficulty === difficultyValue && item.category === categoryValue,
  );
  shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5);
  loadQuestion(shuffledQuestions);

  if (localStorage.getItem("skipModal")) {
    examPage.style.display = "flex";
    mainPage.style.display = "none";
    startTimer();
  } else {
    mainPage.style.display = "none";
    modalPage.style.display = "flex";
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex === shuffledQuestions.length - 1) {
    submitExam();
  } else {
    currentIndex++;
    loadQuestion(shuffledQuestions);
  }
  optionButtons.forEach((btn) => btn.classList.remove("choosen-btn"));
});

optionButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    userAnswers[currentIndex] = index;
    optionButtons.forEach((btn) => btn.classList.remove("choosen-btn"));
    button.classList.add("choosen-btn");
    console.log(userAnswers);
  });
});

restart.addEventListener("click", () => {
  resultPage.style.display = "none";
  mainPage.style.display = "flex";
  currentIndex = 0;
  userAnswers = [];
  timeleft = 180;
  shuffledQuestions = [];
  clearInterval(timeInterval);
  optionButtons.forEach(btn => btn.classList.remove("choosen-btn"))
});

randomSymbolPattern();
