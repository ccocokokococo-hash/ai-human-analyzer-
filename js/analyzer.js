const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const aiPercent = document.getElementById("aiPercent");
const humanPercent = document.getElementById("humanPercent");
const aiCircle = document.getElementById("aiCircle");
const humanCircle = document.getElementById("humanCircle");
const verdict = document.getElementById("verdict");
const feedbackList = document.getElementById("feedbackList");

const sampleText = `Technology plays an important role in modern education. It helps students access information, improve their learning skills and communicate with teachers. However, technology should be used responsibly because it may distract students from studying.`;

const aiWords = [
  "important", "society", "responsible", "creativity", "develop",
  "improve", "communication", "skills", "opportunities", "education",
  "modern", "access", "resources", "however", "therefore", "conclusion",
  "advantages", "disadvantages", "significant", "essential", "effective",
  "various", "beneficial", "productive", "quality", "requires"
];

const humanWords = [
  "i", "my", "me", "we", "our", "us", "friend", "friends",
  "school", "homework", "after school", "feel", "felt", "like",
  "love", "think", "want", "try", "sometimes", "tired", "happy",
  "sad", "family", "teacher", "class", "classmates"
];

const emotionWords = [
  "happy", "sad", "tired", "calm", "excited", "angry",
  "worried", "love", "like", "afraid", "proud", "nervous"
];

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function getSentenceCount(text) {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  return sentences.length || 1;
}

function countMatches(text, words) {
  const lower = text.toLowerCase();
  let count = 0;

  words.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, "g");
    const match = lower.match(regex);
    if (match) count += match.length;
  });

  return count;
}

function hasStructureWords(text) {
  const lower = text.toLowerCase();
  const structureWords = [
    "first", "second", "third", "finally", "in conclusion",
    "however", "therefore", "for example", "as a result"
  ];

  return structureWords.some(word => lower.includes(word));
}

function updateCircle(circle, percent, color) {
  const degree = percent * 3.6;
  circle.style.background = `conic-gradient(${color} ${degree}deg, #e6eef8 ${degree}deg)`;
}

function analyzeText() {
  const text = textInput.value.trim();

  if (!text) {
    verdict.textContent = "Please write or paste a text first.";
    aiPercent.textContent = "0%";
    humanPercent.textContent = "0%";
    updateCircle(aiCircle, 0, "#2f80ed");
    updateCircle(humanCircle, 0, "#2fbb7f");
    feedbackList.innerHTML = "";
    return;
  }

  const wordCount = getWordCount(text);
  const sentenceCount = getSentenceCount(text);
  const averageSentenceLength = wordCount / sentenceCount;

  const formalCount = countMatches(text, aiWords);
  const personalCount = countMatches(text, humanWords);
  const emotionCount = countMatches(text, emotionWords);
  const structure = hasStructureWords(text);

  let aiScore = 20;
  let humanScore = 20;

  if (formalCount >= 4) aiScore += 28;
  else if (formalCount >= 2) aiScore += 18;
  else if (formalCount >= 1) aiScore += 8;

  if (structure) aiScore += 18;

  if (averageSentenceLength > 17) aiScore += 14;
  if (wordCount > 80) aiScore += 8;

  if (personalCount >= 5) humanScore += 30;
  else if (personalCount >= 2) humanScore += 18;
  else if (personalCount >= 1) humanScore += 8;

  if (emotionCount >= 2) humanScore += 18;
  else if (emotionCount >= 1) humanScore += 8;

  if (averageSentenceLength < 12) humanScore += 12;

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

  updateCircle(aiCircle, aiFinal, "#2f80ed");
  updateCircle(humanCircle, humanFinal, "#2fbb7f");

  if (aiFinal >= 60) {
    verdict.textContent = "This text looks more AI-like because it has formal vocabulary, clear structure or general style.";
  } else if (humanFinal >= 60) {
    verdict.textContent = "This text looks more human-like because it has personal examples, emotions or natural student language.";
  } else {
    verdict.textContent = "This text has both AI-like and human-like features.";
  }

  showFeedback({
    wordCount,
    averageSentenceLength,
    formalCount,
    personalCount,
    emotionCount,
    structure
  });
}

function showFeedback(data) {
  const feedback = [];

  if (data.formalCount >= 2) {
    feedback.push({
      type: "ai",
      text: `Formal vocabulary found: ${data.formalCount}. This may make the text look AI-like.`
    });
  } else {
    feedback.push({
      type: "human",
      text: "The vocabulary is not too formal. This can sound more natural."
    });
  }

  if (data.structure) {
    feedback.push({
      type: "ai",
      text: "The text has clear structure words. AI texts often sound organized."
    });
  }

  if (data.personalCount >= 2) {
    feedback.push({
      type: "human",
      text: `Personal words found: ${data.personalCount}. This can be a sign of human writing.`
    });
  } else {
    feedback.push({
      type: "ai",
      text: "There are few personal words. AI texts often sound general."
    });
  }

  if (data.emotionCount >= 1) {
    feedback.push({
      type: "human",
      text: `Emotion words found: ${data.emotionCount}. Human writing often shows feelings.`
    });
  }

  feedback.push({
    type: data.averageSentenceLength > 16 ? "ai" : "human",
    text: `Average sentence length: ${data.averageSentenceLength.toFixed(1)} words.`
  });

  feedbackList.innerHTML = feedback.map(item => {
    const className = item.type === "human" ? "feedback-item human-type" : "feedback-item";
    return `<div class="${className}">${item.text}</div>`;
  }).join("");
}

analyzeBtn.addEventListener("click", analyzeText);

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  aiPercent.textContent = "0%";
  humanPercent.textContent = "0%";
  updateCircle(aiCircle, 0, "#2f80ed");
  updateCircle(humanCircle, 0, "#2fbb7f");
  verdict.textContent = "Add a text and click “Analyze Text”.";
  feedbackList.innerHTML = "";
});

sampleBtn.addEventListener("click", () => {
  textInput.value = sampleText;
  analyzeText();
});
