"use strict";

const STORAGE_KEY = "todosDB";
var gTodos;
var gFilterBy = "ALL";

var gSortBy = {
  val: "",
  des: 1
};

function getTodosForDisplay() {
  let todos = gTodos;
  todos = _filterTodos(todos, gFilterBy);
  _sortTodos(todos, gSortBy);
  return todos;
}

function _filterTodos(todos, filterBy) {
  if (gFilterBy === "ALL") return todos;
  return todos.filter((todo) => todo.isDone === filterBy);
}
function _sortTodos(todos, sortBy) {
  switch (sortBy.val) {
    case "txt":
      sortBy.des === -1
        ? todos.sort((a, b) => a[sortBy.val].localeCompare(b.txt))
        : todos.sort((a, b) => b[sortBy.val].localeCompare(a.txt));
      break;
    default:
      todos.sort((a, b) =>
        b[sortBy.val] - a[sortBy.val] ? sortBy.des : gSortBy.des * -gSortBy.des
      );
      return;
  }
}
function removeTodo(todoId) {
  const idx = getTodoIdx(todoId);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function toggleTodo(todoId) {
  var todo = getTodoById(todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
  return todo;
}

function changeOrder(todoId, val) {
  const idx = getTodoIdx(todoId);
  const todo = gTodos.splice(idx, 1)[0];
  gTodos.splice(idx + val, 0, todo);
}

function getTodoIdx(todoId) {
  return gTodos.findIndex((todo) => todo.id === todoId);
}

function getTodoById(todoId) {
  return gTodos.find((todo) => todo.id === todoId);
}
function addTodo({ txt, importance }) {
  const todo = _createTodo(txt, importance);
  gTodos.unshift(todo);
  _saveTodosToStorage();
  return todo;
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  return gTodos.filter((todo) => !todo.isDone).length;
}

function setFilter(filterBy) {
  if (filterBy !== "ALL") filterBy = JSON.parse(filterBy);

  gFilterBy = filterBy;
}

function setSortedBy(val) {
  gSortBy.val = val;
}

function sortDirection() {
  gSortBy.des = gSortBy.des === 1 ? -1 : 1;
}
function createTodos() {
  console.log("%c Creating todos", "color:lightgreen");

  const todos = _loadFromStorage(STORAGE_KEY) || [];
  if (!todos || !todos.length) {
    todos.push(
      _createTodo("learn JS", 1),
      _createTodo("Leran Css", 2, true),
      _createTodo("Learn HTML", 2)
    );
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
