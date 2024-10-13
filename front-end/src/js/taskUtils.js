import { openModal, closeModal } from "./modal.js";
import { config } from "./config.js";

const token = localStorage.getItem("token");
let taskIdToUpdate;
let taskStatus;

export function setTaskIdToUpdate(id, status) {
  taskIdToUpdate = id;
  taskStatus = status;
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${config.apiUrl}/tasks/${id}`, {
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

export async function updateTask() {
  const newTask = updateTaskInput.value;

  const newStatus = document.getElementById("updateTaskStatus").value;

  try {
    const res = await fetch(`${config.apiUrl}/tasks/${taskIdToUpdate}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        taskItem: newTask,
        status: newStatus == taskStatus ? null : newStatus,
      }),
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

export async function handleCreateTask(e) {
  e.preventDefault();
  const title = document.getElementById("taskName").value;

  try {
    const res = await fetch(`${config.apiUrl}/tasks`, {
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
    const res = await fetch(`${config.apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const tasks = await res.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    if (!tasks || tasks.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="todo-app__list--taskContainer">
            <li>Nenhuma tarefa criada</li>
          </div>`;
      taskList.appendChild(div);
      return;
    }

    (tasks || []).forEach((task) => {
      const div = document.createElement("div");
      div.innerHTML = `
          <div class="todo-app__list--taskContainer">
            <li class="todo-app__list--taskItem">${task.taskItem}</li>
            <span class="todo-app__list--taskStatus">${translateStatus(
              task.status
            )}</span>
            <div class="todo-app__list--buttonContainer">
                <button class="btn todo-app__list--deleteButton">Excluir</button>
                <button class="btn todo-app__list--updateButton">Alterar</button>
            </div>
          </div>
        `;

      const deleteButton = div.querySelector(".todo-app__list--deleteButton");
      const updateButton = div.querySelector(".todo-app__list--updateButton");
      deleteButton.addEventListener("click", () => deleteTask(task._id));
      updateButton.addEventListener("click", () =>
        openModal(task._id, task.status)
      );

      taskList.appendChild(div);
    });
  } catch (err) {
    console.error(err);
  }
}

export function translateStatus(status) {
  const translations = {
    pending: "Pendente",
    complete: "Concluída",
  };
  return translations[status] || status;
}
