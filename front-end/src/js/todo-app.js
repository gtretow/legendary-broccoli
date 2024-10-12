const logoutBtn = document.getElementById("logout");
import { fetchTasks } from "./taskUtils.js";
let token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/pages/login.html";
}

async function handleLogout() {
  localStorage.removeItem("token");
  token = null;
  window.location.href = "/index.html";
}

logoutBtn.addEventListener("click", handleLogout);

window.onload = () => {
  if (token) {
    fetchTasks();
  }
};
