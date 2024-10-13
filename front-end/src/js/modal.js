const updateModal = document.getElementById("updateModal");
const updateTaskInput = document.getElementById("updateTaskInput");

import { setTaskIdToUpdate } from "./taskUtils.js";

export async function openModal(taskId, status) {
  setTaskIdToUpdate(taskId, status);
  updateTaskInput.value = "";
  updateModal.classList.remove("hide");
  updateModal.style.display = "flex";
}

export async function closeModal() {
  updateModal.classList.add("hide");
  updateModal.style.display = "none";
}
