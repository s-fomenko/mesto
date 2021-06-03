const editButton = document.querySelector('.profile__button_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__button');

const editForm = document.querySelector('.form_type_edit');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const addButton = document.querySelector('.profile__button_type_add');
const addPopup = document.querySelector('.popup_type_add');
const addCloseButton = addPopup.querySelector('.popup__button');

const addForm = document.querySelector('.form_type_add');
const placeInput = addForm.querySelector('#place');
const linkInput = addForm.querySelector('#link');
const addFormButton = addForm.querySelector('.form__button');


const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__button');
const popupImage = imagePopup.querySelector('.image__item');
const popupDescription = imagePopup.querySelector('.image__description');

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const cardsContainer = document.querySelector('.elements');

const popupList = document.querySelectorAll('.popup');

const openPopup = (popupType) => {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = (popupType) => {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const closePopupByEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');

  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

class Card {
  constructor(link, place, cardTemplate) {
    this._link = link;
    this._place = place;
    this._cardTemplate = cardTemplate;
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
      this._cardImage = this._card.querySelector('.card__image');
      this._cardDescription = this._card.querySelector('.card__title');

      popupImage.src = this._cardImage.src;
      popupImage.alt = this._cardDescription.textContent;
      popupDescription.textContent = this._cardDescription.textContent;
      openPopup(imagePopup);
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

// edit user info
const editFormOpenHandler = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  openPopup(editPopup);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  closePopup(editPopup);
};

const editFormCloseHandler = () => closePopup(editPopup);

// add card
const addFormOpenHandler = () => {
  addForm.reset();
  openPopup(addPopup);
  toggleButtonState([placeInput, linkInput], addFormButton, config);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = new Card(linkInput.value, placeInput.value, '#card-template');
  cardsContainer.prepend(card.getCard());
  closePopup(addPopup);
};

const addFormCloseHandler = () => closePopup(addPopup);

// image popup
const imageFormCloseHandler = () => closePopup(imagePopup);


editButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
editCloseButton.addEventListener('click', editFormCloseHandler);
addButton.addEventListener('click', addFormOpenHandler);
addForm.addEventListener('submit', addFormSubmitHandler);
addCloseButton.addEventListener('click', addFormCloseHandler);
imageCloseButton.addEventListener('click', imageFormCloseHandler);

// create initial cards
initialCards.forEach(item => {
  const card = new Card(item.link, item.name, '#card-template');
  cardsContainer.append(card.getCard());
})

// close popup methods
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  })
})
