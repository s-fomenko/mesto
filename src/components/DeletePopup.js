import { Popup } from './Popup.js';

export class DeletePopup extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupSelector.querySelector('.form');
  }

  open(id) {
    this._id = id;
    super.open();
  }

  getCardDeleteMethod = card => {
    this._card = card;
  }

  _deleteCard = evt => {
    evt.preventDefault();
    this._handleFormSubmit(this._id);
    this._card.removeCard();
    super.close();
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this._deleteCard)
  }
}

