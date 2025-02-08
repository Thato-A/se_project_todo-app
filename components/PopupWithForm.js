import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    //move constructor here "popup__form"
    const inputValues = {};
    this._inputList.forEach((input) => {
      //part 7 of video
    });
    return inputValues;
  }

  setEventListeners() {
    console.log(this._popupForm);
    this._popupForm.addEventListener("submit", (evt) => {
      console.log(evt);
      evt.preventDefault();
      this._handleFormSubmit(evt);
      //pass result of getInputValues to submission handle
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
