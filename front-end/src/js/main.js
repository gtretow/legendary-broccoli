import { fetchTasks } from "./taskUtils.js";
import { config } from "./config.js";

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
function checkInputs(form) {
  let inputs;
  let button;

  if (form != undefined) {
    inputs = form.querySelectorAll("input[required]");
    button = form.querySelector('button[type="submit"]');
  } else {
    return;
  }

  const allFilled = [...inputs].every((input) => input.value.trim() !== "");

  button.disabled = !allFilled;
}

async function handleRegisterUser(e) {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  if (!validateUsernameAsEmail(username)) {
    return;
  }

  try {
    const res = await fetch(`${config.apiUrl}/auth/register`, {
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
    console.log(err);
  }
}

async function handleLoginUser(e) {
  e.preventDefault();
  const userData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  if (!validateUsernameAsEmail(username)) {
    return;
  }

  try {
    const res = await fetch(`${config.apiUrl}/auth/login`, {
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
      alert("Usuário ou senha inválidos");
    }
  } catch (err) {
    console.log(err);
  }
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateUsernameAsEmail(username) {
  if (!isValidEmail(username)) {
    alert("O username deve ser um email válido.");
    return false;
  }
  return true;
}

changeToLoginScreenButton.addEventListener("click", loginScreenHandler);
changeToRegisterScreenButton.addEventListener("click", registerScreenHandler);
registerForm.addEventListener("submit", handleRegisterUser);
loginForm.addEventListener("submit", handleLoginUser);
loginForm.addEventListener("input", () => checkInputs(loginForm));
registerForm.addEventListener("input", () => checkInputs(registerForm));
checkInputs();
