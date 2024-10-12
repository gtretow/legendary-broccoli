import { openModal, closeModal } from "./modal.js";
import { apiUrl } from "./config.js";

const token = localStorage.getItem("token");
const taskForm = document.getElementById("addTaskForm");
let taskIdToUpdate;

export function setTaskIdToUpdate(id) {
  taskIdToUpdate = id;
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

export async function fetchTasks() {
  try {
    const res = await fetch(`${apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const tasks = await res.json();

    const taskList = document.getElementById("taskList");
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
                  <button class="btn todo-app__list--deleteButton">Excluir</button>
                  <button class="btn todo-app__list--updateButton"">Alterar</button>
              </div>
          </div>`;

      const deleteButton = div.querySelector(".todo-app__list--deleteButton");
      const updateButton = div.querySelector(".todo-app__list--updateButton");
      deleteButton.addEventListener("click", () => deleteTask(task._id));
      updateButton.addEventListener("click", () => openModal(task._id));

      taskList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

updateTaskBtn.addEventListener("click", updateTask);
taskForm.addEventListener("submit", handleCreateTask);
