const resultsTableBody = document.getElementById("resultsTableBody");
const emptyState = document.getElementById("emptyState");
const downloadCsvBtn = document.getElementById("downloadCsvBtn");
const clearResultsBtn = document.getElementById("clearResultsBtn");

const results = JSON.parse(localStorage.getItem("teacherResults")) || [];

function getLevel(percent) {
  if (percent >= 85) return "Excellent";
  if (percent >= 65) return "Good";
  if (percent >= 45) return "Medium";
  return "Needs Practice";
}

function renderResults() {
  if (results.length === 0) {
    emptyState.style.display = "block";
    resultsTableBody.innerHTML = "";
    return;
  }

  emptyState.style.display = "none";

  resultsTableBody.innerHTML = results.map((item, index) => {
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.score} / ${item.total}</td>
        <td>${item.percent}%</td>
        <td>${getLevel(item.percent)}</td>
        <td>${item.date}</td>
      </tr>
    `;
  }).join("");
}

downloadCsvBtn.addEventListener("click", () => {
  if (results.length === 0) {
    alert("No results to download.");
    return;
  }

  const header = ["№", "Student Name", "Score", "Total", "Percentage", "Level", "Date"];

  const rows = results.map((item, index) => [
    index + 1,
    item.name,
    item.score,
    item.total,
    `${item.percent}%`,
    getLevel(item.percent),
    item.date
  ]);

  const csvContent = [header, ...rows]
    .map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ai-human-diagnosis-results.csv";
  link.click();

  URL.revokeObjectURL(url);
});

clearResultsBtn.addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear all results?");
  if (!confirmClear) return;

  localStorage.removeItem("teacherResults");
  location.reload();
});

renderResults();
