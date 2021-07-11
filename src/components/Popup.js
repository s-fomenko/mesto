export class Popup {
  constructor(popup) {
    this._popup = popup;
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

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners () {
    this._closeButton = this._popup.querySelector('.popup__button');
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
