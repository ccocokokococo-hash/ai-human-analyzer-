const tasks = [
  {
    text: "My favourite hobby is drawing. I started drawing when I was little. I like it because I feel calm when I draw.",
    answer: "Human",
    explanation: "This text is personal and has real feelings."
  },
  {
    text: "Technology plays an important role in modern education. It helps students access information and improve learning skills.",
    answer: "AI",
    explanation: "This text is formal, organized and general."
  },
  {
    text: "I think a healthy lifestyle is important, but sometimes it is hard. I try to eat fruit, but I also like chips.",
    answer: "Human",
    explanation: "This text has honest personal details."
  },
  {
    text: "Friendship plays an important role in people’s lives. A true friend provides support and helps a person overcome difficulties.",
    answer: "AI",
    explanation: "This text uses formal and general phrases."
  },
  {
    text: "My school day starts early. I feel sleepy in the morning, but I like meeting my friends.",
    answer: "Human",
    explanation: "This text includes emotions and real school-life details."
  },
  {
    text: "English is one of the most important languages in the world. It is used in education, travel and international communication.",
    answer: "AI",
    explanation: "This text is clear and correct, but it sounds general and formal."
  }
];

const questionCounter = document.getElementById("questionCounter");
const liveScore = document.getElementById("liveScore");
const taskText = document.getElementById("taskText");
const aiBtn = document.getElementById("aiBtn");
const humanBtn = document.getElementById("humanBtn");
const taskFeedback = document.getElementById("taskFeedback");
const nextBtn = document.getElementById("nextBtn");

let currentTask = 0;
let score = 0;
let answered = false;
let answers = [];

function loadTask() {
  const task = tasks[currentTask];

  questionCounter.textContent = `Question ${currentTask + 1} / ${tasks.length}`;
  liveScore.textContent = `Score: ${score}`;
  taskText.textContent = task.text;

  taskFeedback.style.display = "none";
  taskFeedback.textContent = "";
  nextBtn.style.display = "none";
  answered = false;

  aiBtn.disabled = false;
  humanBtn.disabled = false;
  aiBtn.style.opacity = "1";
  humanBtn.style.opacity = "1";
}

function chooseAnswer(selected) {
  if (answered) return;

  answered = true;
  const task = tasks[currentTask];
  const isCorrect = selected === task.answer;

  if (isCorrect) {
    score++;
    taskFeedback.textContent = `Correct! ${task.explanation}`;
    taskFeedback.style.background = "rgba(47, 187, 127, 0.14)";
  } else {
    taskFeedback.textContent = `Not exactly. Correct answer: ${task.answer}. ${task.explanation}`;
    taskFeedback.style.background = "rgba(255, 138, 61, 0.15)";
  }

  answers.push({
    question: currentTask + 1,
    selected: selected,
    correct: task.answer,
    isCorrect: isCorrect
  });

  liveScore.textContent = `Score: ${score}`;
  taskFeedback.style.display = "block";
  nextBtn.style.display = "inline-flex";

  aiBtn.disabled = true;
  humanBtn.disabled = true;
  aiBtn.style.opacity = "0.7";
  humanBtn.style.opacity = "0.7";
}

aiBtn.addEventListener("click", () => chooseAnswer("AI"));
humanBtn.addEventListener("click", () => chooseAnswer("Human"));

nextBtn.addEventListener("click", () => {
  currentTask++;

  if (currentTask >= tasks.length) {
    localStorage.setItem("diagnosisScore", score);
    localStorage.setItem("diagnosisTotal", tasks.length);
    localStorage.setItem("diagnosisAnswers", JSON.stringify(answers));
    window.location.href = "result.html";
    return;
  }

  loadTask();
});

loadTask();
