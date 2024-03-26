"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/style.css");
var taskInput = document.getElementById('taskInput');
var addTask = document.getElementById('addTask');
var taskList = document.getElementById('taskList');
var todos = [];
addTask.addEventListener('click', function () {
    var taskText = taskInput.value.trim();
    if (taskText !== '') {
        var newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        todos.push(newTask);
        renderTodos();
        taskInput.value = '';
    }
});
function renderTodos() {
    taskList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) {
            li.style.textDecoration = 'line-through';
        }
        li.addEventListener('click', function () { return toggleCompleted(todo.id); });
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () { return removeTask(todo.id); });
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}
function toggleCompleted(id) {
    var index = -1;
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
}
function removeTask(id) {
    todos = todos.filter(function (todo) { return todo.id !== id; });
    renderTodos();
}
