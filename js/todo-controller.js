"use strict";

function onInit() {
  createTodos();
  renderTodos();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  //todo: add confirm
  console.log("Removing Todo", todoId);

  removeTodo(todoId);
  renderTodos();
}

function renderTodos() {
  let todos = getTodosForDisplay();
  console.log(todos);

  var strHTMLs = "";
  if (!todos.length) {
    strHTMLs = `<li class="no-todos">add your Todos </li>`;
    document.querySelector(".todo-list").innerHTML = strHTMLs;
  } else {
    strHTMLs = todos.map(
      (todo) =>
        `<li class="${todo.isDone ? "done" : ""}" onclick="onToggleTodo('${
          todo.id
        }')">
            ${todo.txt}
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            <p class=" ${todo.importance < 3 ? "" : "important"}">${
          todo.importance
        }</p>
            </li>
            <small>${todo.createdAt}</small>`
    );
    document.querySelector(".todo-list").innerHTML = strHTMLs.join("");
  }

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

  elTxt.value = "";
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

function setUserMsg(msg) {
  document.querySelector(".user-msg").classList.toggle("open");
  if (!msg) return;
  document.querySelector(".msg-txt").innerText = msg || "";
  setTimeout(setUserMsg, 2000);
}
