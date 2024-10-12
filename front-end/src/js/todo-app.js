const logoutBtn = document.getElementById("logout");
import {
  fetchTasks,
  updateTask,
  handleCreateTask,
  showMessage,
} from "./taskUtils.js";
import { closeModal } from "./modal.js";
let token = localStorage.getItem("token");
const closeModalBtn = document.getElementById("closeBtn");
const updateTaskBtn = document.getElementById("updateTaskBtn");
const taskForm = document.getElementById("addTaskForm");
const updateModal = document.getElementById("updateModal");

if (!token) {
  window.location.href = "/pages/login.html";
}

async function handleLogout() {
  const messageElement = document.getElementById("logoutMessage");
  messageElement.textContent = "Você saiu com sucesso!";
  messageElement.classList.remove("hide");

  setTimeout(() => {
    messageElement.classList.add("hide");
    localStorage.removeItem("token");
    token = null;
    window.location.href = "/index.html";
  }, 2000);
}

logoutBtn.addEventListener("click", handleLogout);

window.onload = () => {
  if (token) {
    fetchTasks();
  }
};

closeModalBtn.addEventListener("click", closeModal);
updateModal.addEventListener("click", closeModal);
updateTaskBtn.addEventListener("click", updateTask);
taskForm.addEventListener("submit", handleCreateTask);
