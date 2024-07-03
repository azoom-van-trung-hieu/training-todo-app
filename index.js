const inputText = document.querySelector(".input-text");
const addButton = document.querySelector(".input-button");
const taskContainer = document.querySelector(".task-container");
const tabItems = document.querySelectorAll(".tab-item");

inputText.addEventListener("input", function (e) {
  addButton.disabled = !e.target.value.trim();
});

const initialTasks = [
  {
    isChecked: true,
  },
  {
    isChecked: false,
  },
  {
    isChecked: false,
  },
  {
    isChecked: true,
  },
  {
    isChecked: false,
  },
];

let taskList = [];

function initTaskList() {
  taskList = [];

  taskContainer.innerHTML =
    initialTasks
      .map((task, index) => {
        const chosenTab = document.querySelector(".chosen-tab");
        const imgSrc = task.isChecked ? "./assets/Check circle outline.png" : "./assets/Radio button unchecked.png";
        const taskText = `${chosenTab.textContent} Work No. ${index + 1}`;

        taskList = [...taskList, { isChecked: task.isChecked, text: taskText }];

        return `
      <div class="task">
        <img class="checked-icon" src="${imgSrc}" alt="checked" task-index="${index}" />
        <p class="task-text ${task.isChecked && "task-done"}">${taskText}</p>
        <img class="delete-icon" src="./assets/Delete outline.png" alt="Delete icon" task-index="${index}" />
      </div>
    `;
      })
      .join("") +
    `
      <div class="clear-completed-container">
        <img class="clear-completed-icon" src="./assets/Clear completed.png" alt="Clear completed icon" />
        <p class="clear-completed-text">Clear Completed</p>
      </div>
    `;

  addCheckedIconEventListeners();
  addClearCompletedEventListener();
  addDeleteIconEventListeners();
}

initTaskList();

function renderTaskList() {
  taskContainer.innerHTML =
    taskList
      .map((task, index) => {
        const imgSrc = task.isChecked ? "./assets/Check circle outline.png" : "./assets/Radio button unchecked.png";

        return `
    <div class="task">
      <img class="checked-icon" src="${imgSrc}" alt="checked" task-index="${index}"/>
      <p class="task-text ${task.isChecked && "task-done"}">${task.text}</p>
      <img class="delete-icon" src="./assets/Delete outline.png" alt="Delete icon" task-index="${index}" />
    </div>
  `;
      })
      .join("") +
    `
    <div class="clear-completed-container">
      <img class="clear-completed-icon" src="./assets/Clear completed.png" alt="Clear completed icon" />
      <p class="clear-completed-text">Clear Completed</p>
    </div>
  `;

  addCheckedIconEventListeners();
  addClearCompletedEventListener();
  addDeleteIconEventListeners();
}

tabItems.forEach((tab) => {
  tab.addEventListener("click", function () {
    tabItems.forEach((item) => item.classList.remove("chosen-tab"));

    tab.classList.add("chosen-tab");

    initTaskList();
  });
});

addButton.addEventListener("click", function () {
  const taskTexts = document.querySelectorAll(".task-text");
  const taskTextsValues = Array.from(taskTexts).map((taskText) => taskText.textContent);

  const newTodo = inputText.value.trim();
  if (newTodo) {
    const isDuplicate = taskTextsValues.some((taskText) => taskText === newTodo);
    if (!isDuplicate) {
      taskList = [{ isChecked: false, text: newTodo }, ...taskList];

      inputText.value = "";
      addButton.disabled = true;

      renderTaskList();
    }
  }
});

function addCheckedIconEventListeners() {
  const checkedIcons = document.querySelectorAll(".checked-icon");

  checkedIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const index = Number(icon.getAttribute("task-index"));

      taskList[index].isChecked = !taskList[index].isChecked;

      renderTaskList();
    });
  });
}

function addDeleteIconEventListeners() {
  const deleteIcons = document.querySelectorAll(".delete-icon");

  deleteIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const index = icon.getAttribute("task-index");
      const taskText = taskList[index].text;

      if (confirm(`${taskText} will be deleted. Are you sure?`)) {
        taskList.splice(index, 1);

        renderTaskList();
      }
    });
  });
}

function addClearCompletedEventListener() {
  const clearCompletedButton = document.querySelector(".clear-completed-container");

  clearCompletedButton.addEventListener("click", function () {
    taskList = taskList.filter((task) => !task.isChecked);

    renderTaskList();
  });
}
