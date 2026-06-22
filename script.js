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

function saveGoals(){
  const goals = document.querySelectorAll('.goal');
  const goalsData=[];

  goals.forEach((goal)=>{
    const input = goal.querySelector('input');
    goalsData.push({
      text: input.value,
      completed:goal.classList.contains('completed'),
    });

  });

  localStorage.setItem("goals", JSON.stringify(goalsData));

}

checkboxes.forEach((checkbox) => {
  const goal = checkbox.parentElement;
  checkbox.addEventListener("click", () => {
    goal.classList.toggle("completed");
    updateProgressbar();
    saveGoals();
  });
});

const inputs = document.querySelectorAll('.goal input');

inputs.forEach((input)=>{
  input.addEventListener("input",()=>{
    saveGoals();
  })
})


function loadGoals(){
  const savedGoals = localStorage.getItem("goals")
   if (!savedGoals) return;

   const goalsData= JSON.parse(savedGoals);
   const goals = document.querySelectorAll(".goal");

   goals.forEach((goal,index)=>{
    const input = goal.querySelector("input");
    const goalData= goalsData[index];

     if (!goalData) return;

       input.value = goalData.text;

    if (goalData.completed) {
      goal.classList.add("completed");
    } else {
      goal.classList.remove("completed");
    }

   })
    updateProgressbar();
}

loadGoals();

