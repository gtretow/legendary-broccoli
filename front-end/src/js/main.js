import { fetchTasks } from "./taskUtils.js";
import { apiUrl } from "./config.js";

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const changeToLoginScreenButton = document.getElementById("show-login");
const changeToRegisterScreenButton = document.getElementById("show-register");

const loginScreen = document.getElementById("login-screen");
const registerScreen = document.getElementById("register-screen");
let token = localStorage.getItem("token");

function loginScreenHandler() {
  registerScreen.classList.add("hide");
  loginScreen.classList.add("show");
  loginScreen.classList.remove("hide");
}
function registerScreenHandler() {
  loginScreen.classList.add("hide");
  registerScreen.classList.remove("hide");
  registerScreen.classList.add("show");
}

async function handleRegisterUser(e) {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  try {
    const res = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      token = data.token;
      localStorage.setItem("token", token);
      window.location.href = "pages/todo-app.html";
      fetchTasks();
    } else {
      alert(data.message || "Erro no registro");
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleLoginUser(e) {
  e.preventDefault();
  const userData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (res.ok) {
      token = data.token;
      localStorage.setItem("token", token);
      window.location.href = "pages/todo-app.html";
      fetchTasks();
    } else {
      alert(data.message || "Erro no login");
    }
  } catch (err) {
    console.error(err);
  }
}

changeToLoginScreenButton.addEventListener("click", loginScreenHandler);
changeToRegisterScreenButton.addEventListener("click", registerScreenHandler);
registerForm.addEventListener("submit", handleRegisterUser);
loginForm.addEventListener("submit", handleLoginUser);
