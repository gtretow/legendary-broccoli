const apiUrl = "http://localhost:5000/api";
const taskForm = document.getElementById("addTaskForm");
const taskList = document.getElementById("taskList");
const logoutBtn = document.getElementById("logout");
const todoSection = document.getElementById("todo-section");
const closeModalBtn = document.querySelector(".modal__close-btn");
const updateModal = document.getElementById("updateModal");
const updateTaskInput = document.getElementById("updateTaskInput");
const updateTaskBtn = document.getElementById("updateTaskBtn");

let token = localStorage.getItem("token");
let taskIdToUpdate;

if (!token) {
  window.location.href = "/pages/login.html";
}

function openModal(taskId, currentTitle = " ") {
  taskIdToUpdate = taskId;
  updateTaskInput.value = currentTitle;
  updateModal.classList.remove("hide");
  updateModal.style.display = "flex";
}

function closeModal() {
  updateModal.classList.add("hide");
  updateModal.style.display = "none";
}

async function handleCreateTask(e) {
  e.preventDefault();
  const title = document.getElementById("taskName").value;

  try {
    const res = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskItem: title }),
    });
    const data = await res.json();
    if (res.ok) {
      document.getElementById("taskName").value = "";
      fetchTasks();
    } else {
      alert(data.message || "Erro ao adicionar tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}

async function fetchTasks() {
  try {
    const res = await fetch(`${apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const tasks = await res.json();
    taskList.innerHTML = "";

    if (!tasks || tasks.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="todo-app__list--taskContainer">
          <li>nenhuma tarefa criada</li>
        </div>`;
      taskList.appendChild(div);
      return;
    }

    (tasks || []).forEach((task) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="todo-app__list--taskContainer">
            <li>${task.taskItem}</li>
            <div class="todo-app__list--buttonContainer">
                <button class="btn todo-app__list--deleteButton" onclick="deleteTask('${task._id}')">Excluir</button>
                <button class="btn todo-app__list--updateButton" onclick="openModal('${task._id}')">Alterar</button>
            </div>
        </div>
        `;
      taskList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

async function updateTask() {
  const newTask = updateTaskInput.value;
  try {
    const res = await fetch(`${apiUrl}/tasks/${taskIdToUpdate}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ taskItem: newTask }),
    });

    if (res.ok) {
      closeModal();
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "Erro ao atualizar tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchTasks();
    } else {
      const data = await res.json();
      alert(data.message || "Erro ao remover tarefa");
    }
  } catch (err) {
    console.error(err);
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  token = null;
  window.location.href = "/index.html";
});

taskForm.addEventListener("submit", handleCreateTask);

updateTaskBtn.addEventListener("click", updateTask);

closeModalBtn.addEventListener("click", closeModal);

window.onload = () => {
  if (token) {
    fetchTasks();
  }
};
