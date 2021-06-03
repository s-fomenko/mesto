const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  }

  _showInputError = (inputElement) => {
    this._inputErrorClass = this._config.inputErrorClass;
    this._errorClass = this._config.errorClass;
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._inputErrorClass = this._config.inputErrorClass;
    this._errorClass = this._config.errorClass;
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };

  _hasInvalidInput = inputList => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  _toggleButtonState = (inputList, buttonElement) => {
    this._inactiveButtonClass = this._config.inactiveButtonClass;
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
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
    this._submitButtonSelector = this._config.submitButtonSelector;

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  enableValidation = () => {
    this._setEventListeners()
  }
}

const formList = Array.from(document.querySelectorAll('.form'));

formList.forEach((formElement) => {
  const form = new FormValidator(formElement, config);
  form.enableValidation();
});

