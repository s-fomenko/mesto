export class Card {
  constructor({ link, name, likes, owner }, cardTemplate, handleImageOpen, handleCardDelete) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner;
    this._cardTemplate = cardTemplate;
    this._handleImageOpen = handleImageOpen;
    this._handleCardDelete = handleCardDelete;
  }

  _getLike = button => {
    button.addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__button_active')
    });
  }

  _removeCard = button => {
    button.addEventListener('click', () => this._handleCardDelete());
  }

  _getImage = image => {
    image.addEventListener('click', (evt) => {
      this._card = evt.target.closest('.card');
      this._handleImageOpen(this._link, this._name)
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

  _checkOwner = () => {
    if (this._owner.name === 'Sergey Fomenko') {
      this._removeButton.classList.add('card__button_visible');
    }
  }

  getCard = () => {
    this._card = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._cardLikesCount = this._card.querySelector('.card__likes-count');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardLikesCount.textContent = this._likes.length;
    this._addListeners(this._card);
    this._checkOwner();
    return this._card;
  }
}
