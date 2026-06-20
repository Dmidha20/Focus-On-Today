const checkboxes = document.querySelectorAll('.checkbox');


checkboxes.forEach((checkbox)=>{
    const goal = checkbox.parentElement;
    checkbox.addEventListener("click",()=>{
        // checkbox.classList.toggle("completed")
        goal.classList.toggle("completed")

    })

    
})