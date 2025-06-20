import { todos as initialTodos } from './data.js';

// 폼 및 메시지 리스트 요소 선택
const form = document.getElementById("googleForm");
const messageList = document.getElementById("messageList");

// 폼 제출 이벤트 처리
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("모든 항목을 입력해주세요.")
  }
});

document.getElementById('saveBtn').addEventListener('click', function () {
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("password", document.getElementById("password").value);
  document.getElementById('result').textContent = "저장 완료!";
});


document.getElementById('checkBtn').addEventListener('click', function () {
  const value = localStorage.getItem(email);
  if (value) {
    document.getElementById('result').textContent = `저장된 값: ${value}`;
  } else {
    document.getElementById('result').textContent = "저장된 값이 없습니다.";
  }
});


// 할 일 목록
let todos = [...initialTodos];

const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "index.html";
}

const todoList = document.getElementById("todoList");
const titleInput = document.getElementById("titleInput");
const descriptionInput = document.getElementById("descriptionInput");
const isCompletedInput = document.getElementById("isCompletedInput");

function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "incomplete") return !todo.isCompleted;
    return true;
  });

  filteredTodos.forEach(todo => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card ${todo.isCompleted ? "bg-light" : ""}">
        <div class="card-body">
          <h5 class="card-title ${todo.isCompleted ? 'text-decoration-line-through' : ''}">${todo.title}</h5>
          <p class="card-text">${todo.description || ""}</p>
          <span class="badge ${todo.isCompleted ? "bg-success" : "bg-warning text-dark"}">
            ${todo.isCompleted ? "완료됨" : "미완료"}
          </span>
        </div>
      </div>
    `;
    todoList.appendChild(card);
  });
}

window.filterTodos = function (type) {
  renderTodos(type);
}

window.addTodo = function () {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const isCompleted = isCompletedInput.value === "true";

  if (!title) {
    alert("제목은 필수입니다.");
    return;
  }

  const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

  const newTodo = {
    id: maxId + 1,
    title,
    description,
    isCompleted
  };

  todos.push(newTodo);

  titleInput.value = "";
  descriptionInput.value = "";
  isCompletedInput.value = "false";

  renderTodos();
}

renderTodos();
