import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (data) => {
    const name = data.name;
    const dateInput = data.date;
    let date;

    if (dateInput) {
      date = new Date(dateInput);
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    } else {
      date = "";
    }

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values); //remove once additem is complete
    section.addItem(todo);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
  },
});

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck);
  const todoElement = todo.getView();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const element = generateTodo(item);
    section.addItem(element);
  },
  // generate todo item, add it to the todolist, refer to the foreach loop in this file

  containerSelector: ".todos__list",
});
section.renderItem();
//remember to call section instances renderItems method

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//addTodoForm.addEventListener("submit", (evt) => {
//evt.preventDefault();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

initialTodos.forEach((item) => {
  renderTodo(item);
}); //make sure to remove this after render items function is complete

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
