import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template"); remove
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  // const todoElement = todoTemplate.content.querySelector(".todo").cloneNode(true);
  // const todoNameEl = todoElement.querySelector(".todo__name");
  // const todoCheckboxEl = todoElement.querySelector(".todo__complete");
  // const todoLabel = todoElement.querySelector(".todo__label");
  // const todoDate = todoElement.querySelector(".todo__date");
  // const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

  // todoNameEl.textContent = data.name;
  // todoCheckboxEl.checked = data.completed;

  // todoCheckboxEl.id = `todo-${data.id}`;
  // todoLabel.setAttribute("for", `todo-${data.id}`);

  // const dueDate = new Date(data.date);
  // if (!NaN(dueDate)) {
  // todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US",{
  //    year: "numeric",
  //    month: "short",
  //     day: "numeric",
  //  })}`;
  // }
  // todoDeleteBtn.addEventListener("click", () => {
  //   todoElement.remove();
  // });

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  let date;
  // Create a date object and adjust for timezone
  if (dateInput) {
    date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  } else {
    date = "";
  }

  const id = uuidv4();
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
