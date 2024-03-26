import './css/style.css'

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTask = document.getElementById('addTask') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

let todos: TodoItem[] = [];

addTask.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
      const newTask: TodoItem = {
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
  todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.text;
      if (todo.completed) {
          li.style.textDecoration = 'line-through'; 
      }
      li.addEventListener('click', () => toggleCompleted(todo.id));
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => removeTask(todo.id));
      li.appendChild(removeButton);
      taskList.appendChild(li);
  });
}

function toggleCompleted(id: number) {
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
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


function removeTask(id: number) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}