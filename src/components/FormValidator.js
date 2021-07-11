export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._submitButtonSelector = this._config.submitButtonSelector;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError = (inputElement) => {
    this._inputErrorClass = this._config.inputErrorClass;
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._inputErrorClass = this._config.inputErrorClass;
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };

  _hasInvalidInput = inputList => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  disableSubmitButton() {
    this._buttonElement.disbaled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _enableSubmitButton() {
    this._buttonElement.disbaled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton()
    }
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners = () => {
    this._inputSelector = this._config.inputSelector;
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners()
  }

  resetValidation = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }
}
