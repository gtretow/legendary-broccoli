const changeToLoginScreenButton = document.getElementById("show-login");
const registerScreen = document.getElementById("register-screen");
const loginScreen = document.getElementById("login-screen");
const changeToRegisterScreenButton = document.getElementById("show-register");
const loginButton = document.getElementById("auth-button");

function loginScreenHandler() {
  registerScreen.classList.add("hide");
  loginScreen.classList.remove("hide");
  loginScreen.classList.add("show");
}
function registerScreenHandler() {
  loginScreen.classList.add("hide");
  registerScreen.classList.remove("hide");
  registerScreen.classList.add("show");
}

function loginButtonClickHandler(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log(username, password);
  window.location.href = "pages/todoApp.html";
}

loginButton.addEventListener("click", loginButtonClickHandler);
changeToLoginScreenButton.addEventListener("click", loginScreenHandler);
changeToRegisterScreenButton.addEventListener("click", registerScreenHandler);
