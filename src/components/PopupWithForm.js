import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
    this._formButton = this._formElement.querySelector('.form__button')
    this._formButtonDefaultContent = this._formButton.textContent;
    this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'));
  }

  _getInputValues = () => {
    this._formData = {};

    this._inputList.forEach(({ name, value }) => {
      this._formData[name] = value;
    });
    return this._formData;
  }

  _getFormData = evt => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this._getFormData)
  }

  close() {
    super.close();

    this._formElement.reset();
  }

  dataLoading = isLoading => {
    this._formButton.textContent = isLoading? 'Сохранение...' : this._formButtonDefaultContent;
  }
}

