document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  if (localStorage.getItem('todos')) {
    todoList.innerHTML = localStorage.getItem('todos');
    addCheckboxListeners();
    addDeleteListeners();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const todoText = todoInput.value;

    if (todoText.trim() !== '') {
      addTodoItem(todoText);
      todoInput.value = '';
      saveTodoList();
    }
  });

  function addTodoItem(text) {
    const li = document.createElement('li');
    const todoText = document.createTextNode(text);
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    li.appendChild(todoText);
    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    todoList.appendChild(li);

    deleteButton.addEventListener('click', function () {
      li.remove();
      saveTodoList();
    });

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        li.classList.add('completed');
      } else {
        li.classList.remove('completed');
      }
      saveTodoList();
    });
  }

  function saveTodoList() {
    localStorage.setItem('todos', todoList.innerHTML);
  }

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
        saveTodoList();
      });
    });
  }

  function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const li = this.parentNode;
        li.remove();
        saveTodoList();
      });
    });
  }
});

