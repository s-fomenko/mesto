export class Card {
  constructor({ link, name, likes, owner, _id }, cardTemplate, userId, {handleImageOpen, handleCardDelete, handleSetLike, handleRemoveLike}) {
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardTemplate = cardTemplate;
    this._handleImageOpen = handleImageOpen;
    this._handleCardDelete = handleCardDelete;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._userId = userId;
  }

  _setLikesCount = likes => this._cardLikesCount.textContent = likes.length;

  _setLike = (button) => {
    this._handleSetLike(this._id)
      .then(card => {
        this._setLikesCount(card.likes);
        button.classList.add('card__button_active');
      })
      .catch(err => console.log(err));
  }

  _removeLike = (button) => {
    this._handleRemoveLike(this._id)
      .then(card => {
        this._setLikesCount(card.likes);
        button.classList.remove('card__button_active');
      })
      .catch(err => console.log(err));
  }

  _isLikedByMe = (likes, button) => {
    likes.forEach(user => {
      if (user._id === this._userId) {
        button.classList.add('card__button_active');
      }
    })
  }

  _checkCardLike = button => {
    button.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('card__button_active')) {
        this._removeLike(button);
      } else {
        this._setLike(button);
      }
    });
  }

  _removeCardPopupOpen = button => {
    button.addEventListener('click', () => this._handleCardDelete(this._id, this));
  }

  _getImage = image => {
    image.addEventListener('click', () => {
      this._handleImageOpen(this._link, this._name)
    });
  }

  _addListeners = card => {
    this._likeButton = card.querySelector('.card__button_type_like');
    this._removeButton = card.querySelector('.card__button_type_remove');
    this._image = card.querySelector('.card__image');
    this._isLikedByMe(this._likes, this._likeButton)
    this._checkCardLike(this._likeButton);
    this._removeCardPopupOpen(this._removeButton);
    this._getImage(this._image);
  }

  _checkOwner = () => {
    if (this._owner._id === this._userId) {
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
    this._setLikesCount(this._likes);
    this._addListeners(this._card);
    this._checkOwner();
    return this._card;
  }

  removeCard = () => this._card.remove();
}
