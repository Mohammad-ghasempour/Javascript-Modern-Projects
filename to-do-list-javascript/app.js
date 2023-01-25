const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
const loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded" , getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
};

const addTask = (e) => {
  if (taskInput.value === "") {
    alert("Write a title first!");
  } else {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    //create a remove link
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    //store in Local Storage
    storeInLocalStorage(taskInput.value);

    taskInput.value = "";
    taskInput.focus();
  }

  e.preventDefault();
};

const removeTask = (e) => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      remoteTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

const clearTasks = () => {
  if (confirm("Are you sure to remove all tasks?")) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }
    clearTasksFromLocalStorage();
    
  }
};

const filterTasks = (e) => {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach((task) => {
    if (task.textContent.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

const storeInLocalStorage = (task) => {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks' , JSON.stringify(tasks));

};

const getTasks = ()=>{
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{

        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
    
        //create a remove link
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
    
        taskList.appendChild(li);

    })
}

const remoteTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((item , index)=>{
        if (item === taskItem.textContent){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks' , JSON.stringify(tasks));

}
const clearTasksFromLocalStorage = () => { 
    localStorage.clear();
 }
loadEventListeners();
