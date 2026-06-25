const checkboxes = document.querySelectorAll(".checkbox");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".progress-text");

function updateProgressBar() {
  const completedGoals = document.querySelectorAll(".goal.completed").length;

  const totalGoals = document.querySelectorAll(".goal").length;

  const percentage = (completedGoals / totalGoals) * 100;
  progressText.innerText = `${completedGoals}/${totalGoals} completed`;
  if (completedGoals === totalGoals) {
    progressText.innerText = "All goals completed! 🎉";
  }

  progressFill.style.width = percentage + "%";
}

function saveGoals() {
  const goals = document.querySelectorAll(".goal");
  const goalsData = [];

  goals.forEach((goal) => {
    const input = goal.querySelector("input");
    goalsData.push({
      text: input.value,
      completed: goal.classList.contains("completed"),
    });
  });

  localStorage.setItem("goals", JSON.stringify(goalsData));
}

const errorLabel = document.querySelector(".error-label");

checkboxes.forEach((checkbox) => {
  const goal = checkbox.parentElement;
  checkbox.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".goal input");
    let hasEmptyGoal = false;
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        hasEmptyGoal = true;
      }
    });
    if (hasEmptyGoal) {
      errorLabel.innerText = "Please add all goals first";
      return;
    }
    errorLabel.innerText=""
    goal.classList.toggle("completed");
    updateProgressBar();
    saveGoals();
  });
});

const inputs = document.querySelectorAll(".goal input");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    saveGoals();
  });
});

function loadGoals() {
  const savedGoals = localStorage.getItem("goals");
  if (!savedGoals) return;

  const goalsData = JSON.parse(savedGoals);
  const goals = document.querySelectorAll(".goal");

  goals.forEach((goal, index) => {
    const input = goal.querySelector("input");
    const goalData = goalsData[index];

    if (!goalData) return;

    input.value = goalData.text;

    if (goalData.completed) {
      goal.classList.add("completed");
    } else {
      goal.classList.remove("completed");
    }
  });
  updateProgressBar();
}

loadGoals();
