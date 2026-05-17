const questionBank = [
  // TYPE 1: single
  {
    type: "single",
    text: "My favourite hobby is drawing. I started drawing when I was little. I like it because I feel calm when I draw.",
    answer: "Human",
    options: ["AI", "Human"],
    explanation: "This text is personal and has real feelings."
  },
  {
    type: "single",
    text: "Technology plays an important role in modern education. It helps students access information and improve learning skills.",
    answer: "AI",
    options: ["AI", "Human"],
    explanation: "This text is formal, organized and general."
  },
  {
    type: "single",
    text: "Sometimes grammar is hard for me, but I try to learn new words every week.",
    answer: "Human",
    options: ["AI", "Human"],
    explanation: "This text sounds natural and shows a real learning difficulty."
  },
  {
    type: "single",
    text: "Grammar is an essential part of language learning because it helps students create correct and meaningful sentences.",
    answer: "AI",
    options: ["AI", "Human"],
    explanation: "This text is formal and explanatory."
  },

  // TYPE 2: compare
  {
    type: "compare",
    text: `
      <b>Text A:</b> I want to become a doctor because I want to help people. I know it is difficult, but I think it is important.<br><br>
      <b>Text B:</b> A doctor is one of the most important professions in society. Doctors diagnose diseases and improve quality of life.
    `,
    answer: "Text A is Human, Text B is AI",
    options: [
      "Text A is Human, Text B is AI",
      "Text A is AI, Text B is Human"
    ],
    explanation: "Text A has personal opinion. Text B is formal and general."
  },
  {
    type: "compare",
    text: `
      <b>Text A:</b> Educational videos are useful tools that support listening skills and vocabulary development.<br><br>
      <b>Text B:</b> I like using videos in English lessons because I can hear real pronunciation and remember words better.
    `,
    answer: "Text A is AI, Text B is Human",
    options: [
      "Text A is Human, Text B is AI",
      "Text A is AI, Text B is Human"
    ],
    explanation: "Text A sounds formal. Text B gives a personal classroom example."
  },
  {
    type: "compare",
    text: `
      <b>Text A:</b> I feel nervous before speaking English in class, but when my teacher supports me, I try to speak more.<br><br>
      <b>Text B:</b> Speaking practice helps students improve fluency, pronunciation and confidence in English communication.
    `,
    answer: "Text A is Human, Text B is AI",
    options: [
      "Text A is Human, Text B is AI",
      "Text A is AI, Text B is Human"
    ],
    explanation: "Text A includes feelings. Text B is formal and educational."
  },

  // TYPE 3: feature
  {
    type: "feature",
    text: "Drawing is an enjoyable activity that helps students express creativity and develop imagination.",
    answer: "Formal vocabulary",
    options: ["Formal vocabulary", "Personal story", "Strong emotion", "Small mistake"],
    explanation: "The text uses formal phrases like “express creativity” and “develop imagination.”"
  },
  {
    type: "feature",
    text: "I also like chips, but I try to eat fruit and drink water because I want to be healthier.",
    answer: "Personal example",
    options: ["Clear structure", "Personal example", "Academic style", "No emotion"],
    explanation: "The text includes a real personal detail about chips, fruit and water."
  },
  {
    type: "feature",
    text: "First, students can use AI for ideas. Second, they can check grammar. Finally, they should add their own opinion.",
    answer: "Clear structure",
    options: ["Clear structure", "No organization", "Only emotion", "Spelling mistake"],
    explanation: "The words “First,” “Second,” and “Finally” show clear structure."
  },
  {
    type: "feature",
    text: "I feel tired in the morning, but I like meeting my friends at school.",
    answer: "Emotion",
    options: ["Emotion", "Formal vocabulary", "General information", "Academic style"],
    explanation: "The phrase “I feel tired” shows emotion."
  },

  // TYPE 4: reason
  {
    type: "reason",
    text: "This text looks AI-like: “English provides students with opportunities for future education and international communication.” Why?",
    answer: "It sounds formal and general.",
    options: [
      "It has many personal memories.",
      "It sounds formal and general.",
      "It has many spelling mistakes.",
      "It uses slang."
    ],
    explanation: "AI-like texts often sound formal, general and polished."
  },
  {
    type: "reason",
    text: "This text looks human-like: “I do not always like writing essays because it takes time, but interesting topics help me.” Why?",
    answer: "It has personal opinion.",
    options: [
      "It has personal opinion.",
      "It is written like a dictionary.",
      "It has no emotions.",
      "It is very academic."
    ],
    explanation: "Human writing often includes personal opinion and real feelings."
  },
  {
    type: "reason",
    text: "A student says this text is AI-like: “Group work is an effective classroom method that develops cooperation and problem-solving skills.” What sign did the student notice?",
    answer: "Academic vocabulary",
    options: [
      "Personal story",
      "Academic vocabulary",
      "Small grammar mistake",
      "Informal words"
    ],
    explanation: "Words like “effective method,” “cooperation,” and “problem-solving skills” sound academic."
  }
];

const TASK_COUNT = 8;

const studentBox = document.getElementById("studentBox");
const diagnosisCard = document.getElementById("diagnosisCard");
const studentNameInput = document.getElementById("studentName");
const startBtn = document.getElementById("startBtn");

const questionCounter = document.getElementById("questionCounter");
const liveScore = document.getElementById("liveScore");
const taskText = document.getElementById("taskText");
const taskButtons = document.querySelector(".task-buttons");
const taskFeedback = document.getElementById("taskFeedback");
const nextBtn = document.getElementById("nextBtn");

let tasks = [];
let currentTask = 0;
let score = 0;
let answered = false;
let answers = [];
let studentName = "";

function shuffleArray(array) {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[i]];
  }

  return copiedArray;
}

function hasTooManySameTypes(items) {
  for (let i = 0; i < items.length - 2; i++) {
    if (
      items[i].type === items[i + 1].type &&
      items[i].type === items[i + 2].type
    ) {
      return true;
    }
  }
  return false;
}

function createRandomTasks() {
  const singleTasks = shuffleArray(questionBank.filter(item => item.type === "single")).slice(0, 3);
  const compareTasks = shuffleArray(questionBank.filter(item => item.type === "compare")).slice(0, 2);
  const featureTasks = shuffleArray(questionBank.filter(item => item.type === "feature")).slice(0, 2);
  const reasonTasks = shuffleArray(questionBank.filter(item => item.type === "reason")).slice(0, 1);

  let selected = [...singleTasks, ...compareTasks, ...featureTasks, ...reasonTasks];
  let mixed = shuffleArray(selected);
  let attempts = 0;

  while (hasTooManySameTypes(mixed) && attempts < 50) {
    mixed = shuffleArray(selected);
    attempts++;
  }

  return mixed;
}

function getTaskLabel(type) {
  if (type === "single") return "Choose: AI or Human";
  if (type === "compare") return "Compare two texts";
  if (type === "feature") return "Find the main feature";
  if (type === "reason") return "Choose the reason";
  return "Task";
}

startBtn.addEventListener("click", () => {
  studentName = studentNameInput.value.trim();

  if (!studentName) {
    alert("Please write your name first.");
    return;
  }

  tasks = createRandomTasks();

  currentTask = 0;
  score = 0;
  answered = false;
  answers = [];

  localStorage.setItem("currentStudentName", studentName);

  studentBox.classList.add("hidden");
  diagnosisCard.classList.remove("hidden");

  loadTask();
});

function loadTask() {
  const task = tasks[currentTask];

  questionCounter.textContent = `Question ${currentTask + 1} / ${tasks.length} — ${getTaskLabel(task.type)}`;
  liveScore.textContent = `Score: ${score}`;

  taskText.innerHTML = task.text;

  taskFeedback.style.display = "none";
  taskFeedback.textContent = "";
  nextBtn.style.display = "none";
  answered = false;

  renderOptions(task);
}

function renderOptions(task) {
  taskButtons.innerHTML = "";

  const shuffledOptions = shuffleArray(task.options);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
    button.className = "btn option-btn";
    button.textContent = option;

    if (option === "AI") button.classList.add("ai-btn");
    else if (option === "Human") button.classList.add("human-btn");
    else button.classList.add("neutral-btn");

    button.addEventListener("click", () => chooseAnswer(option));

    taskButtons.appendChild(button);
  });
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
    type: task.type,
    text: task.text,
    selected: selected,
    correct: task.answer,
    isCorrect: isCorrect
  });

  liveScore.textContent = `Score: ${score}`;
  taskFeedback.style.display = "block";
  nextBtn.style.display = "inline-flex";

  const buttons = taskButtons.querySelectorAll("button");
  buttons.forEach(button => {
    button.disabled = true;
    button.style.opacity = "0.75";
  });
}

nextBtn.addEventListener("click", () => {
  currentTask++;

  if (currentTask >= tasks.length) {
    finishDiagnosis();
    return;
  }

  loadTask();
});

function finishDiagnosis() {
  const percent = Math.round((score / tasks.length) * 100);

  const result = {
    id: Date.now(),
    name: studentName,
    score: score,
    total: tasks.length,
    percent: percent,
    date: new Date().toLocaleString(),
    answers: answers
  };

  localStorage.setItem("diagnosisScore", score);
  localStorage.setItem("diagnosisTotal", tasks.length);
  localStorage.setItem("diagnosisAnswers", JSON.stringify(answers));
  localStorage.setItem("diagnosisStudentName", studentName);

  const savedResults = JSON.parse(localStorage.getItem("teacherResults")) || [];
  savedResults.push(result);

  localStorage.setItem("teacherResults", JSON.stringify(savedResults));

  window.location.href = "result.html";
}
