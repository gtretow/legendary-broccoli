const updateModal = document.getElementById("updateModal");
const updateTaskInput = document.getElementById("updateTaskInput");
const closeModalBtn = document.querySelector(".modal__close-btn");
import { setTaskIdToUpdate } from "./taskUtils.js";

export function openModal(taskId, currentTitle = " ") {
  setTaskIdToUpdate(taskId);
  updateTaskInput.value = currentTitle;
  updateModal.classList.remove("hide");
  updateModal.style.display = "flex";
}

export function closeModal() {
  updateModal.classList.add("hide");
  updateModal.style.display = "none";
}

closeModalBtn.addEventListener("click", closeModal);
