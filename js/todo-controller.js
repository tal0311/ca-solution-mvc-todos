"use strict";

function onInit() {
  renderTitle("Loading your tasks");
  setUserMsg("Loading your tasks");
  createTodos();
  // setTimeout(renderTodos, 800); //uncomment to see loading status
  // renderTodos();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  //todo: add confirm
  console.log("Removing Todo", todoId);

  removeTodo(todoId);
  renderTodos();
}

function renderTitle(title = "Todos MVC") {
  document.querySelector("h1").innerText = title;
}
function renderTodos() {
  let todos = getTodosForDisplay();
  renderTitle();

  if (!todos.length) {
    renderTitle("Add your first task");
  }
  const strHTMLs = todos.map((todo) => {
    const time = geDateTime(todo.createdAt);
    return `<li class="flex a-center ${
      todo.isDone ? "done todo-preview" : "todo-preview"
    }" 
        onclick="onToggleTodo('${todo.id}')">
     <p>${todo.txt}</p>
        
       
        <span class=" ${
          todo.importance < 3 ? "impostance" : "impostance important"
        }">${todo.importance}</span>
          <section class="action-container d-none">
           <button>&#8593;</button>
           <button>&#8595;</button>
           <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
          </section>
          </li>
          <small>${time.monthDay} - ${time.hours}</small>
        `;
  });
  document.querySelector(".todo-list").innerHTML = strHTMLs.join("");
  renderStats();
}
function renderStats() {
  document.querySelector(".todos-total-count").innerText = getTodosCount();
  document.querySelector(
    ".todos-active-count"
  ).innerText = getActiveTodosCount();
}

function onToggleTodo(todoId) {
  console.log("Toggling", todoId);
  toggleTodo(todoId);

  renderTodos();
}

function onAddTodo() {
  const txt = document.querySelector("input[name=todoTxt]").value.trim();
  const importance =
    +document.querySelector("input[name=importance]").value || 1;

  if (!txt) {
    setUserMsg("A task must have a title");
    return;
  }
  const todoToAdd = {
    txt,
    importance
  };

  addTodo(todoToAdd);
  _cleanInputs();
  renderTodos();
}

function onSetFilter(filterBy) {
  setFilter(filterBy);
  renderTodos();
}

function onSortBy(val) {
  console.log(val);

  setSortedBy(val);
  renderTodos();
}
function onSortDirection() {
  sortDirection();
  renderTodos();
}

function setUserMsg(msg) {
  document.querySelector(".user-msg").classList.toggle("open");
  if (!msg) return;
  document.querySelector(".msg-txt").innerText = msg || "";
  setTimeout(setUserMsg, 2000);
}

function geDateTime(timeStemp) {
  let time = new Date(timeStemp);

  return {
    monthDay: time.toString().split(" ").slice(1, 3),
    hours: time.toString().split(" ")[4]
  };
}

function _cleanInputs() {
  document.querySelector("input[name=todoTxt]").value = "";
  document.querySelector("input[name=importance]").value = "";
}
