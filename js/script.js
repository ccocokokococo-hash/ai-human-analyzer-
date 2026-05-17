const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const aiPercent = document.getElementById("aiPercent");
const humanPercent = document.getElementById("humanPercent");
const aiScoreCircle = document.getElementById("aiScoreCircle");
const humanScoreCircle = document.getElementById("humanScoreCircle");
const verdict = document.getElementById("verdict");
const feedbackList = document.getElementById("feedbackList");

const sampleText = `Technology plays an important role in modern education. It helps students access information, improve their learning skills and communicate with teachers. However, technology should be used responsibly because it may distract students from studying.`;

const aiFormalWords = [
  "important", "society", "responsible", "creativity", "develop",
  "improve", "communication", "skills", "opportunities", "education",
  "modern", "access", "resources", "however", "therefore", "conclusion",
  "advantages", "disadvantages", "significant", "essential", "effective",
  "various", "beneficial", "productive", "quality", "requires"
];

const humanPersonalWords = [
  "i", "my", "me", "we", "our", "us", "friend", "friends",
  "school", "homework", "after school", "feel", "felt", "like",
  "love", "think", "want", "try", "sometimes", "tired", "happy",
  "sad", "family", "teacher", "class", "classmates"
];

function countMatches(text, words) {
  let count = 0;
  const lower = text.toLowerCase();

  words.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    const matches = lower.match(regex);
    if (matches) count += matches.length;
  });

  return count;
}

function getSentenceCount(text) {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  return sentences.length || 1;
}

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

function getAverageSentenceLength(text) {
  const words = getWordCount(text);
  const sentences = getSentenceCount(text);
  return words / sentences;
}

function hasClearStructure(text) {
  const lower = text.toLowerCase();
  const structureWords = ["first", "second", "finally", "in conclusion", "however", "therefore", "for example"];
  return structureWords.some(word => lower.includes(word));
}

function analyzeText() {
  const text = textInput.value.trim();

  if (!text) {
    verdict.textContent = "Please write or paste a text first.";
    feedbackList.innerHTML = "";
    updateCircle(aiScoreCircle, 0, "#2f80ed");
    updateCircle(humanScoreCircle, 0, "#2fbb7f");
    aiPercent.textContent = "0%";
    humanPercent.textContent = "0%";
    return;
  }

  const wordCount = getWordCount(text);
  const avgSentenceLength = getAverageSentenceLength(text);
  const formalCount = countMatches(text, aiFormalWords);
  const personalCount = countMatches(text, humanPersonalWords);
  const structure = hasClearStructure(text);

  let aiScore = 20;
  let humanScore = 20;

  if (formalCount >= 3) aiScore += 25;
  else if (formalCount >= 1) aiScore += 12;

  if (personalCount >= 4) humanScore += 28;
  else if (personalCount >= 1) humanScore += 14;

  if (structure) aiScore += 15;

  if (avgSentenceLength > 16) aiScore += 15;
  if (avgSentenceLength < 12) humanScore += 12;

  if (wordCount > 70) aiScore += 8;
  if (wordCount < 55) humanScore += 8;

  const emotionWords = ["happy", "sad", "tired", "calm", "excited", "angry", "worried", "love", "like"];
  const emotionCount = countMatches(text, emotionWords);
  if (emotionCount >= 2) humanScore += 15;

  if (text.includes("I ") || text.toLowerCase().includes(" my ")) {
    humanScore += 10;
  }

  aiScore = Math.min(aiScore, 95);
  humanScore = Math.min(humanScore, 95);

  const total = aiScore + humanScore;
  const aiFinal = Math.round((aiScore / total) * 100);
  const humanFinal = 100 - aiFinal;

  aiPercent.textContent = `${aiFinal}%`;
  humanPercent.textContent = `${humanFinal}%`;

  updateCircle(aiScoreCircle, aiFinal, "#2f80ed");
  updateCircle(humanScoreCircle, humanFinal, "#2fbb7f");

  if (aiFinal > humanFinal) {
    verdict.textContent = "Result: This text looks more AI-like. It may be formal, organized or general.";
  } else if (humanFinal > aiFinal) {
    verdict.textContent = "Result: This text looks more human-like. It may include personal feelings or real examples.";
  } else {
    verdict.textContent = "Result: This text has both AI-like and human-like features.";
  }

  showFeedback({
    wordCount,
    avgSentenceLength,
    formalCount,
    personalCount,
    structure,
    emotionCount,
    aiFinal,
    humanFinal
  });
}

function updateCircle(circle, percent, color) {
  const degree = percent * 3.6;
  circle.style.background = `conic-gradient(${color} ${degree}deg, #e6eef8 ${degree}deg)`;
}

function showFeedback(data) {
  const items = [];

  items.push({
    type: "ai",
    text: `Word count: ${data.wordCount}. Longer and very polished texts may look more AI-like.`
  });

  if (data.formalCount >= 3) {
    items.push({
      type: "ai",
      text: `Formal vocabulary found: ${data.formalCount} words. Formal words can be a sign of AI writing.`
    });
  } else {
    items.push({
      type: "human",
      text: "The vocabulary is not too formal. This can make the text sound more natural."
    });
  }

  if (data.personalCount >= 3) {
    items.push({
      type: "human",
      text: `Personal words found: ${data.personalCount}. Personal words often make a text more human-like.`
    });
  } else {
    items.push({
      type: "ai",
      text: "There are not many personal words. AI texts often sound general."
    });
  }

  if (data.structure) {
    items.push({
      type: "ai",
      text: "The text has clear structure words. This can make it look organized and AI-like."
    });
  }

  if (data.emotionCount >= 2) {
    items.push({
      type: "human",
      text: "The text includes emotional words. Emotions are often connected with human writing."
    });
  }

  if (data.avgSentenceLength > 16) {
    items.push({
      type: "ai",
      text: `Average sentence length is ${data.avgSentenceLength.toFixed(1)} words. Longer sentences may sound formal.`
    });
  } else {
    items.push({
      type: "human",
      text: `Average sentence length is ${data.avgSentenceLength.toFixed(1)} words. Shorter sentences may sound like student writing.`
    });
  }

  feedbackList.innerHTML = items
    .map(item => `<div class="feedback-item ${item.type === "human" ? "human-type" : ""}">${item.text}</div>`)
    .join("");
}

analyzeBtn.addEventListener("click", analyzeText);

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  feedbackList.innerHTML = "";
  verdict.textContent = "Add a text and click “Analyze Text”.";
  aiPercent.textContent = "0%";
  humanPercent.textContent = "0%";
  updateCircle(aiScoreCircle, 0, "#2f80ed");
  updateCircle(humanScoreCircle, 0, "#2fbb7f");
});

sampleBtn.addEventListener("click", () => {
  textInput.value = sampleText;
  analyzeText();
});

const quizData = [
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
  }
];

const questionNumber = document.getElementById("questionNumber");
const quizScore = document.getElementById("quizScore");
const quizText = document.getElementById("quizText");
const quizFeedback = document.getElementById("quizFeedback");
const nextBtn = document.getElementById("nextBtn");
const quizButtons = document.querySelectorAll(".quiz-buttons button");

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const question = quizData[currentQuestion];

  questionNumber.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;
  quizScore.textContent = `Score: ${score}`;
  quizText.textContent = question.text;
  quizFeedback.style.display = "none";
  quizFeedback.textContent = "";
  nextBtn.style.display = "none";
  answered = false;

  quizButtons.forEach(button => {
    button.disabled = false;
    button.style.opacity = "1";
  });
}

quizButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (answered) return;

    answered = true;
    const selected = button.dataset.answer;
    const correct = quizData[currentQuestion].answer;

    if (selected === correct) {
      score++;
      quizFeedback.textContent = `Correct! ${quizData[currentQuestion].explanation}`;
      quizFeedback.style.background = "rgba(47, 187, 127, 0.14)";
    } else {
      quizFeedback.textContent = `Not exactly. Correct answer: ${correct}. ${quizData[currentQuestion].explanation}`;
      quizFeedback.style.background = "rgba(255, 138, 61, 0.15)";
    }

    quizScore.textContent = `Score: ${score}`;
    quizFeedback.style.display = "block";
    nextBtn.style.display = "inline-flex";

    quizButtons.forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = "0.7";
    });
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion >= quizData.length) {
    quizText.textContent = `Quiz finished! Your score is ${score} / ${quizData.length}.`;
    questionNumber.textContent = "Final Result";
    quizFeedback.style.display = "block";

    if (score >= 4) {
      quizFeedback.textContent = "Excellent! You can identify AI and human writing very well.";
      quizFeedback.style.background = "rgba(47, 187, 127, 0.14)";
    } else if (score >= 3) {
      quizFeedback.textContent = "Good job! You understand many differences, but you can practice more.";
      quizFeedback.style.background = "rgba(247, 201, 72, 0.2)";
    } else {
      quizFeedback.textContent = "Keep practicing! Pay attention to emotions, personal examples and formal words.";
      quizFeedback.style.background = "rgba(255, 138, 61, 0.15)";
    }

    nextBtn.textContent = "Restart Quiz";
    nextBtn.style.display = "inline-flex";

    quizButtons.forEach(button => {
      button.style.display = "none";
    });

    nextBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      nextBtn.textContent = "Next Question";
      quizButtons.forEach(button => {
        button.style.display = "inline-flex";
      });
      nextBtn.onclick = null;
      loadQuestion();
    };

    return;
  }

  loadQuestion();
});

loadQuestion();
