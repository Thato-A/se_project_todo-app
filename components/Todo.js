class Todo {
  constructor(data, selector, handleCheck) {
    this._data = data;
    this._name = data.name;
    this._date = data.date;
    this._selector = selector;
    this._completed = data.completed;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = !this._completed;
      this._handleCheck(this._completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
      this._element = null;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);
  }

  _generateNameElement() {
    this._nameEl = this._element.querySelector(".todo__name");
    this._nameEl.textContent = this._name;
  }

  _generateDateElement() {
    this._dateEl = this._element.querySelector(".todo__date");
    const dueDate = new Date(this._date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._element = this._getTemplate();
    this._generateNameElement();
    this._generateDateElement();
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    this._generateCheckboxEl();
    this._setEventListeners();
    return this._element;
  }
}

export default Todo;
