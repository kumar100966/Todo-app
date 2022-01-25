// Variables and Selectors

const userInputField = document.querySelector("#user-input");
const todoListContainer = document.querySelector(".todo-list-items-container");
const todoListChildren = todoListContainer.children;
const addTodoButton = document.querySelector(".submit-button");
let filterSelection = document.getElementById("filter");

// Event Listeners
addTodoButton.addEventListener("click", createTodo);
filterSelection.addEventListener("change", filterTodos);
document.addEventListener("DOMContentLoaded", readFromLocalStorage);

// Functions

function createTodo(event) {
  event.preventDefault();
  userInput = userInputField.value;
  userInputField.value = "";
  writeToLocalStorage(userInput);
  writeTodoItem(userInput);
}

function writeTodoItem(userInput) {
  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add("todo-list-item");
  newTodoItem.innerHTML = `<p>${userInput}</p>
  <button class="todo-button-container check-container">
    <img src="./icons/check-mark.svg" alt="check" />
  </button>
  <button class="todo-button-container trash-container">
    <img src="./icons/trash-can.svg" alt="trash" />
  </button>`;
  newTodoItem.addEventListener("click", completeTodo);
  newTodoItem.addEventListener("click", deleteTodo);

  todoListContainer.appendChild(newTodoItem);
}

function completeTodo(event) {
  if (!event.target.classList.contains("check-container")) return;
  event.target.parentElement.classList.toggle("completed");
}

function deleteTodo(event) {
  if (!event.target.classList.contains("trash-container")) return;
  let todo = event.target.parentElement;
  deleteFromLocalStorage(event.target.parentElement.childNodes[0].innerText);
  todo.addEventListener("transitionend", (event) => {
    todo.remove();
  });
  todo.classList.add("deleted");
}

function filterTodos(event) {
  switch (event.target.value) {
    case "completed":
      for (todo of todoListChildren) {
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
      break;
    case "uncompleted":
      for (todo of todoListChildren) {
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
      }
      break;
    case "all":
      for (todo of todoListChildren) {
        todo.style.display = "flex";
      }
      break;
  }
}

function writeToLocalStorage(todo) {
  let stringOfTodos = localStorage.getItem("todos");
  if (!stringOfTodos) {
    todo = [`${todo}`];
    localStorage.setItem("todos", JSON.stringify(todo));
  } else {
    let listOfTodos = JSON.parse(stringOfTodos);
    listOfTodos.push(`${todo}`);
    localStorage.setItem("todos", JSON.stringify(listOfTodos));
  }
}

function readFromLocalStorage() {
  let listOfTodos = checkLocalStorageForTodos();
  for (todo of listOfTodos) {
    writeTodoItem(todo);
  }
}

function deleteFromLocalStorage(todo) {
  let listOfTodos = checkLocalStorageForTodos();
  if (!listOfTodos.includes(todo)) return;
  listOfTodos.splice(listOfTodos.indexOf(todo), 1);
  localStorage.setItem("todos", JSON.stringify(listOfTodos));
}

function checkLocalStorageForTodos() {
  let stringOfTodos = localStorage.getItem("todos");
  if (!stringOfTodos) return;
  return JSON.parse(stringOfTodos);
}
