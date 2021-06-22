export class Card {
  constructor(link, place, cardTemplate, handleCardClick) {
    this._link = link;
    this._place = place;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getLike = button => {
    button.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__button_active')
    });
  }

  _removeCard = button => {
    button.addEventListener('click', (evt) => {
      evt.target.closest('.card').remove();
    });
  }

  _getImage = image => {
    image.addEventListener('click', (evt) => {
      this._card = evt.target.closest('.card');
      this._handleCardClick(this._link, this._place)
    });
  }

  _addListeners = card => {
    this._likeButton = card.querySelector('.card__button_type_like');
    this._removeButton = card.querySelector('.card__button_type_remove');
    this._image = card.querySelector('.card__image');
    this._getLike(this._likeButton);
    this._removeCard(this._removeButton);
    this._getImage(this._image);
  }

  getCard = () => {
    this._card = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._place;
    this._cardTitle.textContent = this._place;
    this._addListeners(this._card);
    return this._card;
  }
}
