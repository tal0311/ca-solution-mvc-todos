"use strict";

const STORAGE_KEY = "todosDB";
var gTodos;
var gFilterBy = "ALL";

var gSortBy = "all";

function getTodosForDisplay() {
  const todos = gTodos;
  todos = _filterTodos(todos, gFilterBy);
  // return gTodos.filter(
  //   (todo) =>
  //     (todo.isDone && gFilterBy === "DONE") ||
  //     (!todo.isDone && gFilterBy === "ACTIVE")
  // );
  return todos;
}

function _filterTodos(todos, filterBy) {
  if (gFilterBy === "All") return todos;
  return todos.filter((todo) => todo.isDone === filterBy);
}
function _sortTodos() {}
function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;

  _saveTodosToStorage();
}

function addTodo({ txt, importance }) {
  const todo = _createTodo(txt, importance);
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  return gTodos.filter((todo) => !todo.isDone).length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function setSortedBy(val) {
  //!val to lower case
  gSortBy = val;
  console.log(val);
  getTodosForDisplay();
}

function createTodos() {
  console.log("creating todos");

  const todos = _loadFromStorage(STORAGE_KEY) || [];
  if (!todos || !todos.length) {
    todos.push(
      _createTodo("fisrt task", 1),
      _createTodo("second task", 2),
      _createTodo("thired task", 2)
    );
    console.log(todos);
  }
  gTodos = todos;
  _saveTodosToStorage();
}

function _createTodo(txt, importance, isDone = false) {
  const todo = {
    id: _makeId(),
    txt,
    isDone,
    createdAt: Date.now(),
    importance
  };
  return todo;
}

//todo: get time and date - pass timestamp inside inside new Date() return it to the user as human time.

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _loadFromStorage() {
  return loadFromStorage(STORAGE_KEY);
}
function _saveTodosToStorage() {
  saveToStorage(STORAGE_KEY, gTodos);
}

// console.log(gTodos.sort((a, b) => (a.txt > b.txt ? 1 : -1)));
