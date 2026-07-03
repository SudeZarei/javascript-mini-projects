const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
  if (!inputBox.value) {
    alert("Task field cannot be empty!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = inputBox.value;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  inputBox.value = "";
  // save after adding a new task
  saveData();
}

listContainer.addEventListener(
  "click",
  function (event) {
    if (event.target.tagName === "LI") {
      event.target.classList.toggle("checked");

      // save after any changes
      saveData();
      return;
    }

    if (event.target.tagName === "SPAN") {
      event.target.parentElement.remove();

      // save after any changes
      saveData();
      return;
    }
  },
  false,
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showData() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showData();
