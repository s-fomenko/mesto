import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupImage = this._popupSelector.querySelector('.image__item');
    this._popupDescription = this._popupSelector.querySelector('.image__description');
  }

  open = (image, description) => {
    this._popupImage.src = image;
    this._popupImage.alt = description;
    this._popupDescription.textContent = description;

    super.open();
  }
}
