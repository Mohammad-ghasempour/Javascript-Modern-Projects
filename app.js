const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
const loadEventListeners = () => {
  form.addEventListener("submit", addTask);
};

const addTask = (e) => {
    if (taskInput.value === ""){
        alert('Add a task!');
    }else{
        const li = document.createElement("li");
        li.className="collection-item";
        li.appendChild(document.createTextNode(taskInput.value));

        //create a remove link
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        taskList.appendChild(li);
    }

    e.preventDefault();

};

loadEventListeners();
