import { Popup } from './Popup.js';

export class DeletePopup extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);

    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.form');
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  _deleteCard = evt => {
    evt.preventDefault();
    this._handleFormSubmit(this._id, this._card)
      .then(() => {
        super.close();
      })
  }

  setEventListeners = () => {
    super.setEventListeners();

    this._formElement.addEventListener('submit', this._deleteCard)
  }
}

