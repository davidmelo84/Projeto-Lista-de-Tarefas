const form = document.querySelector("#todo-form")
const taskTitleInput = document.querySelector("#task-title-input")
const todoListUl = document.querySelector("#todo-list")

let tasks = []

function renderTaskOnHTML(taskTitle, done = false) {
const li = document.createElement("li")
  //li.textContent = taskTitle // Criando a tag <li>Tarefa 2</li>
  const input = document.createElement("input")
  input.setAttribute("type", "checkbox")
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement

    const spanToToggle = liToToggle.querySelector("span")

    const done = event.target.checked
    if(done){
       spanToToggle.style.textDecoration = "line-through"
    }else{
        spanToToggle.style.textDecoration = "none"
    }

   tasks = tasks.map(t => {
        if(t.title === spanToToggle.textContent){
            return {
             title: t.title,
             done: !t.done,
        }
    }
            return t

    })
    localStorage.setItem("tasks", JSON.stringify(tasks)) // Salvando no localStorage 

    
  })
  input.checked = done

  
  const span = document.createElement("span")
  span.textContent = taskTitle
  if(done){
    span.style.textDecoration = "line-through"
  }

  const button = document.createElement("button")
  button.textContent = "Remover"
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement
       
    const titleToRemove = liToRemove.querySelector("span").textContent // Remove do Array
    
    tasks =  tasks.filter(t => t.title !== titleToRemove) // Filtrando o que deseja remover
    
    todoListUl.removeChild(liToRemove) // Remove o item da lista

    localStorage.setItem("tasks", JSON.stringify(tasks)) // Salvando no localStorage 

  })

  li.appendChild(input)
  li.appendChild(span)
  li.appendChild(button)  

  todoListUl.appendChild(li)
}

window.onload = () =>{
    const tasksOnLocalStorage = localStorage.getItem("tasks")
    if(!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage) 

    tasks.forEach(t => {
        renderTaskOnHTML(t.title, t.done)
    })
}

form.addEventListener("submit", (event) => {
   event.preventDefault() // Evita o comportamento padrão de recarregar a página ao submeter o formulário

 const taskTitle = taskTitleInput.value

 if(taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.")
    return // Sair da função
}

// Adicionando a nova tarefa ao array de tasks
 tasks.push({
    title: taskTitle,
    done: false,
 })

 localStorage.setItem("tasks", JSON.stringify(tasks)) // Salvando no localStorage 


// Adicionando a nova tarefa ao HTML

renderTaskOnHTML(taskTitle)

  taskTitleInput.value = ""// Limpa o input toda vez que algo foi submetido 
})