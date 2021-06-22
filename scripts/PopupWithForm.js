import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector('.form');
  }

  _getInputValues = () => {
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
    this._formData = {};

    this._inputList.forEach(({ name, value }) => {
      this._formData[name] = value;
    });

    return this._formData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this._handleFormSubmit)
  }

  close() {
    super.close();

    this._formElement.reset();
  }
}

