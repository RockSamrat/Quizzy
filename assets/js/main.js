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
let currentIndex = 0;
let shuffledQuestions = [];
let userAnswers = [];

startButtonModal.addEventListener("click", () => {
  const checked = document.getElementById("checkbox").checked;
  if (checked) {
    localStorage.setItem("skipModal", "true");
  }
  modalPage.style.display = "none";
  examPage.style.display = "flex";
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
});
 optionButtons.forEach((button, index) => {
    button.addEventListener('click', () =>{
        userAnswers.push(index);
        console.log(userAnswers)
    })
})

function loadQuestion(shuffledQuestions) {
  const currentQuestion = shuffledQuestions[currentIndex];
  question.textContent = currentQuestion.question;
  optionOne.textContent = currentQuestion.options[0];
  optionTwo.textContent = currentQuestion.options[1];
  optionThree.textContent = currentQuestion.options[2];
  optionFour.textContent = currentQuestion.options[3];
}

function submitExam(){
    examPage.style.display = "none";
    resultPage.style.display = "flex";
    let score = 0;
    for(let i = 0; i < shuffledQuestions.length; i++){
        if(shuffledQuestions[i].answer === userAnswers[i]){
            score++;
        }
    }
    console.log(score)
}
randomSymbolPattern();
