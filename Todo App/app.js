document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  // Load todo list from local storage
  if (localStorage.getItem('todos')) {
    todoList.innerHTML = localStorage.getItem('todos');
    addCheckboxListeners();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const todoText = todoInput.value;

    if (todoText.trim() !== '') { // Trim to handle whitespace
      addTodoItem(todoText);
      todoInput.value = '';
      saveTodoList(); // Save todo list to local storage
    }
  });

  function addTodoItem(text) {
    const li = document.createElement('li');
    const todoText = document.createTextNode(text);
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox'; // Set type before appending to DOM
    li.appendChild(todoText);
    li.appendChild(checkbox);
    todoList.appendChild(li);

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTodoList(); // Save todo list to local storage
    });
  }

  // Function to save todo list to local storage
  function saveTodoList() {
    localStorage.setItem('todos', todoList.innerHTML);
  }

  // Function to add event listeners to checkboxes
  function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('#todoList input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        const li = this.parentNode;
        if (this.checked) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
        saveTodoList(); // Save todo list to local storage
      });
    });
  }
});
