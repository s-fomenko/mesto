import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

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

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

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
  addFormButton.disabled = true;
  addFormButton.classList.add('form__button_disabled');
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

// form validation
const formList = Array.from(document.querySelectorAll('.form'));

formList.forEach((formElement) => {
  const form = new FormValidator(formElement, config);
  form.enableValidation();
});
