const bigScore = document.getElementById("bigScore");
const levelBadge = document.getElementById("levelBadge");
const percentScore = document.getElementById("percentScore");
const criticalLevel = document.getElementById("criticalLevel");
const recommendationText = document.getElementById("recommendationText");
const studentResultName = document.getElementById("studentResultName");
const copyResultBtn = document.getElementById("copyResultBtn");

const score = Number(localStorage.getItem("diagnosisScore")) || 0;
const total = Number(localStorage.getItem("diagnosisTotal")) || 6;
const studentName = localStorage.getItem("diagnosisStudentName") || "Student";

const percent = Math.round((score / total) * 100);

studentResultName.textContent = studentName;
bigScore.textContent = `${score} / ${total}`;
percentScore.textContent = `${percent}%`;

let level = "";
let critical = "";
let recommendation = "";

if (percent >= 85) {
  level = "Excellent";
  critical = "High";
  recommendation = "Excellent work! You can identify AI and human writing very well. Continue using clear criteria such as vocabulary, structure, emotions and personal examples.";
  levelBadge.style.background = "rgba(47,187,127,0.15)";
  levelBadge.style.color = "#128755";
} else if (percent >= 65) {
  level = "Good";
  critical = "Good";
  recommendation = "Good result! You understand many differences between AI and human writing. Try to pay more attention to personal examples and formal vocabulary.";
  levelBadge.style.background = "rgba(47,128,237,0.14)";
  levelBadge.style.color = "#1d5fd1";
} else if (percent >= 45) {
  level = "Medium";
  critical = "Medium";
  recommendation = "You are improving. To get better results, look carefully at emotions, real-life examples and whether the text sounds too formal.";
  levelBadge.style.background = "rgba(247,201,72,0.25)";
  levelBadge.style.color = "#9a6b00";
} else {
  level = "Needs Practice";
  critical = "Basic";
  recommendation = "Keep practicing. Remember: AI texts are often formal and organized, while human texts often have feelings, simple words and real-life examples.";
  levelBadge.style.background = "rgba(255,138,61,0.16)";
  levelBadge.style.color = "#b45309";
}

levelBadge.textContent = level;
criticalLevel.textContent = critical;
recommendationText.textContent = recommendation;

copyResultBtn.addEventListener("click", async () => {
  const resultText = `
AI or Human? English Text Analyzer
Student: ${studentName}
Result: ${score} / ${total}
Percentage: ${percent}%
Level: ${level}
Critical Thinking Level: ${critical}
Recommendation: ${recommendation}
  `.trim();

  try {
    await navigator.clipboard.writeText(resultText);
    copyResultBtn.textContent = "Copied!";

    setTimeout(() => {
      copyResultBtn.textContent = "Copy Result";
    }, 1500);
  } catch {
    alert(resultText);
  }
});
