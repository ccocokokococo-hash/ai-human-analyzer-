const questionBank = [
  {
    text: "My favourite hobby is drawing. I started drawing when I was little. I like it because I feel calm when I draw.",
    answer: "Human",
    explanation: "This text is personal and has real feelings."
  },
  {
    text: "Drawing is an enjoyable activity that helps students express creativity and develop imagination.",
    answer: "AI",
    explanation: "This text is formal, general and polished."
  },
  {
    text: "Technology plays an important role in modern education. It helps students access information and improve learning skills.",
    answer: "AI",
    explanation: "This text is formal, organized and general."
  },
  {
    text: "I use online dictionaries when I do my English homework. Sometimes I do not know a word, so I check it quickly.",
    answer: "Human",
    explanation: "This text has a real school-life example."
  },
  {
    text: "I think a healthy lifestyle is important, but sometimes it is hard. I try to eat fruit, but I also like chips.",
    answer: "Human",
    explanation: "This text has honest personal details."
  },
  {
    text: "A healthy lifestyle includes proper nutrition, regular physical activity and enough sleep.",
    answer: "AI",
    explanation: "This text sounds like a general explanation."
  },
  {
    text: "Friendship plays an important role in people’s lives. A true friend provides support and helps a person overcome difficulties.",
    answer: "AI",
    explanation: "This text uses formal and general phrases."
  },
  {
    text: "My best friend helps me when I do not understand homework. We also laugh a lot and talk after school.",
    answer: "Human",
    explanation: "This text has personal experience and natural language."
  },
  {
    text: "My school day starts early. I feel sleepy in the morning, but I like meeting my friends.",
    answer: "Human",
    explanation: "This text includes emotions and real school-life details."
  },
  {
    text: "A school day is an important part of student life because it helps learners gain knowledge and communication skills.",
    answer: "AI",
    explanation: "This text is formal and general."
  },
  {
    text: "English is one of the most important languages in the world. It is used in education, travel and international communication.",
    answer: "AI",
    explanation: "This text is clear and correct, but it sounds general and formal."
  },
  {
    text: "I want to learn English because I can watch films, understand songs and talk with people from other countries.",
    answer: "Human",
    explanation: "This text has personal motivation and simple student language."
  },
  {
    text: "Learning English provides students with many opportunities for future education, travel and international communication.",
    answer: "AI",
    explanation: "This text sounds formal and polished."
  },
  {
    text: "Sometimes grammar is hard for me, but I try to learn new words every week.",
    answer: "Human",
    explanation: "This text sounds natural because it shows a real learning difficulty."
  },
  {
    text: "Grammar is an essential part of language learning because it helps students create correct and meaningful sentences.",
    answer: "AI",
    explanation: "This text is formal and explanatory."
  },
  {
    text: "I like group work because I can talk with my classmates and share ideas. But sometimes it is noisy.",
    answer: "Human",
    explanation: "This text has a personal opinion and real classroom detail."
  },
  {
    text: "Group work is an effective classroom method that develops communication, cooperation and problem-solving skills.",
    answer: "AI",
    explanation: "This text sounds academic and organized."
  },
  {
    text: "I want to become a doctor because I want to help people. I know it is difficult, but I think it is important.",
    answer: "Human",
    explanation: "This text has personal opinion and simple vocabulary."
  },
  {
    text: "A doctor is one of the most important professions in society. Doctors diagnose diseases, treat patients and improve quality of life.",
    answer: "AI",
    explanation: "This text has formal vocabulary and general information."
  },
  {
    text: "I feel nervous before speaking English in class, but when my teacher supports me, I try to speak more.",
    answer: "Human",
    explanation: "This text includes feelings and personal experience."
  },
  {
    text: "Speaking practice helps students improve fluency, pronunciation and confidence in English communication.",
    answer: "AI",
    explanation: "This text is formal, clear and general."
  },
  {
    text: "I do not always like writing essays because it takes time. But when the topic is interesting, I can write more easily.",
    answer: "Human",
    explanation: "This text has honest opinion and natural student language."
  },
  {
    text: "Essay writing helps students organize their ideas, develop arguments and improve academic communication skills.",
    answer: "AI",
    explanation: "This text sounds academic and general."
  },
  {
    text: "I like using videos in English lessons because I can hear real pronunciation and remember words better.",
    answer: "Human",
    explanation: "This text gives a personal classroom example."
  },
  {
    text: "Educational videos are useful tools that support listening skills, vocabulary development and student engagement.",
    answer: "AI",
    explanation: "This text uses formal educational vocabulary."
  },
  {
    text: "When I write a story, I usually choose simple words because I want my classmates to understand it.",
    answer: "Human",
    explanation: "This text sounds personal and natural."
  },
  {
    text: "Story writing develops imagination, creativity and the ability to express ideas in a clear written form.",
    answer: "AI",
    explanation: "This text is polished and explanatory."
  },
  {
    text: "I think AI is useful, but I do not want it to do all my homework. I still want to learn by myself.",
    answer: "Human",
    explanation: "This text has personal opinion and real student thinking."
  },
  {
    text: "Artificial intelligence can support learning by providing explanations, correcting grammar and generating ideas.",
    answer: "AI",
    explanation: "This text sounds formal and informative."
  },
  {
    text: "Our English teacher sometimes gives us dialogues. I like them because we can act and speak with a partner.",
    answer: "Human",
    explanation: "This text includes a real classroom situation."
  },
  {
    text: "Dialogues are effective learning activities because they develop speaking skills and improve communication.",
    answer: "AI",
    explanation: "This text is general and academic."
  },
  {
    text: "I like reading short stories in English because they are not too difficult and I can learn new words.",
    answer: "Human",
    explanation: "This text has simple language and personal opinion."
  },
  {
    text: "Reading short stories in English helps learners expand vocabulary and develop reading comprehension skills.",
    answer: "AI",
    explanation: "This text sounds formal and educational."
  },
  {
    text: "Sometimes I make mistakes in English, but I am not afraid because mistakes help me learn.",
    answer: "Human",
    explanation: "This text shows personal feelings and learning experience."
  },
  {
    text: "Mistakes are a natural part of the learning process and can help students improve their language accuracy.",
    answer: "AI",
    explanation: "This text gives a polished general explanation."
  }
];

const TASK_COUNT = 6;

const studentBox = document.getElementById("studentBox");
const diagnosisCard = document.getElementById("diagnosisCard");
const studentNameInput = document.getElementById("studentName");
const startBtn = document.getElementById("startBtn");

const questionCounter = document.getElementById("questionCounter");
const liveScore = document.getElementById("liveScore");
const taskText = document.getElementById("taskText");
const aiBtn = document.getElementById("aiBtn");
const humanBtn = document.getElementById("humanBtn");
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

function hasAlternatingPattern(items) {
  const answers = items.map(item => item.answer);

  let patternOne = true;
  let patternTwo = true;

  for (let i = 0; i < answers.length; i++) {
    const expectedOne = i % 2 === 0 ? "Human" : "AI";
    const expectedTwo = i % 2 === 0 ? "AI" : "Human";

    if (answers[i] !== expectedOne) patternOne = false;
    if (answers[i] !== expectedTwo) patternTwo = false;
  }

  return patternOne || patternTwo;
}

function hasTooManySameInRow(items) {
  const answers = items.map(item => item.answer);

  for (let i = 0; i < answers.length - 2; i++) {
    if (answers[i] === answers[i + 1] && answers[i] === answers[i + 2]) {
      return true;
    }
  }

  return false;
}

function createRandomTasks() {
  const aiQuestions = shuffleArray(questionBank.filter(item => item.answer === "AI"));
  const humanQuestions = shuffleArray(questionBank.filter(item => item.answer === "Human"));

  let selected = [];

  const aiCount = Math.random() > 0.5 ? 3 : 4;
  const humanCount = TASK_COUNT - aiCount;

  selected = [
    ...aiQuestions.slice(0, aiCount),
    ...humanQuestions.slice(0, humanCount)
  ];

  let mixedTasks = shuffleArray(selected);
  let attempts = 0;

  while (
    (hasAlternatingPattern(mixedTasks) || hasTooManySameInRow(mixedTasks)) &&
    attempts < 50
  ) {
    mixedTasks = shuffleArray(selected);
    attempts++;
  }

  return mixedTasks;
}

function randomizeButtons() {
  const buttonsContainer = document.querySelector(".task-buttons");
  const buttons = shuffleArray([aiBtn, humanBtn]);

  buttonsContainer.innerHTML = "";
  buttons.forEach(button => buttonsContainer.appendChild(button));
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

  randomizeButtons();
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
    text: task.text,
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
