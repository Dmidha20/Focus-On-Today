const checkboxes = document.querySelectorAll(".checkbox");
const progressFill = document.querySelector(".progress-fill");

function updateProgressbar() {
  const completedGoals = document.querySelectorAll(".goal.completed").length;
  console.log("dsds", completedGoals);

  const totalGoals = document.querySelectorAll(".goal").length;

  const percentage = (completedGoals / totalGoals) * 100;
  console.log("fdfds", progressFill);

  progressFill.style.width = percentage + "%";
}

checkboxes.forEach((checkbox) => {
  const goal = checkbox.parentElement;
  checkbox.addEventListener("click", () => {
    goal.classList.toggle("completed");
    updateProgressbar();
  });
});
