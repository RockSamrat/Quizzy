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
const reviewList = document.getElementById("review-list");
const reviewPrevious = document.getElementById("review-previous");
const reviewNext = document.getElementById("review-next");
const reviewPosition = document.getElementById("review-position");
const questionNumber = document.getElementById("question-number");
let currentIndex = 0;
let currentReviewIndex = 0;
let shuffledQuestions = [];
let userAnswers = [];
let timeleft = 180;
let timeInterval = null;
let tabSwitchCounter = 0;
let Numberquestion = 1;

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
  finalScore.textContent = `You scored ${score} out of ${shuffledQuestions.length}.`;
  currentReviewIndex = 0;
  renderAnswerReview();
}

function renderAnswerReview() {
  reviewList.replaceChildren();

  const currentQuestion = shuffledQuestions[currentReviewIndex];
  const questionCard = document.createElement("article");
  questionCard.className = "review-question";

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = `${currentReviewIndex + 1}. ${currentQuestion.question}`;
  questionCard.appendChild(questionTitle);

  const selectedAnswer = userAnswers[currentReviewIndex];
  const optionList = document.createElement("div");
  optionList.className = "review-options";

  currentQuestion.options.forEach((option, optionIndex) => {
    const optionElement = document.createElement("div");
    optionElement.className = "review-option";

    if (optionIndex === currentQuestion.answer) {
      optionElement.classList.add("correct-answer");
    }

    if (
      optionIndex === selectedAnswer &&
      selectedAnswer !== currentQuestion.answer
    ) {
      optionElement.classList.add("incorrect-answer");
    }

    const optionLabel = document.createElement("span");
    optionLabel.textContent = option;
    optionElement.appendChild(optionLabel);

    if (optionIndex === currentQuestion.answer) {
      const correctLabel = document.createElement("span");
      correctLabel.className = "answer-label";
      correctLabel.textContent = "Correct";
      optionElement.appendChild(correctLabel);
    } else if (optionIndex === selectedAnswer) {
      const incorrectLabel = document.createElement("span");
      incorrectLabel.className = "answer-label";
      incorrectLabel.textContent = "Your answer";
      optionElement.appendChild(incorrectLabel);
    }

    optionList.appendChild(optionElement);
  });

  if (selectedAnswer === undefined) {
    const unansweredLabel = document.createElement("p");
    unansweredLabel.className = "unanswered-label";
    unansweredLabel.textContent = "Not answered";
    questionCard.appendChild(unansweredLabel);
  }

  questionCard.appendChild(optionList);
  reviewList.appendChild(questionCard);
  reviewPosition.textContent = `Question ${currentReviewIndex + 1} of ${shuffledQuestions.length}`;
  reviewPrevious.disabled = currentReviewIndex === 0;
  reviewNext.disabled = currentReviewIndex === shuffledQuestions.length - 1;
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
    Numberquestion++;
    loadQuestion(shuffledQuestions);
    questionNumber.textContent = `Question ${Numberquestion} out of 10`
  }
  optionButtons.forEach((btn) => btn.classList.remove("choosen-btn"));
});

reviewPrevious.addEventListener("click", () => {
  if (currentReviewIndex > 0) {
    currentReviewIndex--;
    renderAnswerReview();
  }
});

reviewNext.addEventListener("click", () => {
  if (currentReviewIndex < shuffledQuestions.length - 1) {
    currentReviewIndex++;
    renderAnswerReview();
  }
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
  currentReviewIndex = 0;
  1;
  userAnswers = [];
  timeleft = 180;
  shuffledQuestions = [];
  tabSwitchCounter = 0;
  clearInterval(timeInterval);
  optionButtons.forEach((btn) => btn.classList.remove("choosen-btn"));
});

document.addEventListener("visibilitychange", () => {
  if (examPage.style.display === "flex") {
    if (document.visibilityState === "hidden") {
      if (tabSwitchCounter === 0) {
        alert(
          "You are not allowed to leave the page. Repetation will end the exam",
        );
      }
      tabSwitchCounter++;
    }
    if (tabSwitchCounter >= 2) {
      alert("Exam auto submitted.")
      submitExam();
    }
  }
});

randomSymbolPattern();
