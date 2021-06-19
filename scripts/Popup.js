export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  open = () => {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close = () => {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners = () => {
    this._closeButton = this._popupSelector.querySelector('.popup__button');
    this._closeButton.addEventListener('click', this.close);
    this._popupSelector.addEventListener('click', this._handleOverlayClose);
  }
}
