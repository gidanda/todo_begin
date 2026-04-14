const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const savedTodos = JSON.parse(localStorage.getItem("todos"));

if (savedTodos) {
    savedTodos.forEach((todo) => {
        createTodoElement(todo);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = input.value.trim();

    if (todoText === "") return;

    const todo = {
        text: todoText,
        completed: false
    };

    createTodoElement(todo);
    input.value = "";
    saveData();
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.innerText = todo.text;
    li.classList.add("list-group-item");

    if (todo.completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", function() {
        li.classList.toggle("completed");
        saveData();
    });

    li.addEventListener("contextmenu", function(event) {
        event.preventDefault();

        if (confirm("削除しますか？")) {
            li.remove();
            saveData();
        }
    });

    ul.appendChild(li);
}

function saveData() {
    const todoElements = ul.querySelectorAll("li");
    const todos = [];

    todoElements.forEach((li) => {
        todos.push({
            text: li.innerText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}