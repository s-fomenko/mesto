import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../components/initialCards.js';

import './index.css';

const editButton = document.querySelector('.profile__button_type_edit');
const editPopupSelector = document.querySelector('.popup_type_edit');

const editForm = document.querySelector('.form_type_edit');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const addButton = document.querySelector('.profile__button_type_add');
const addPopupSelector = document.querySelector('.popup_type_add');

const addForm = document.querySelector('.form_type_add');

const imagePopupSelector = document.querySelector('.popup_type_image');

const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');

const cardsContainer = '.elements';

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

const createCard = (link, place) => {
  const card = new Card(link, place, '#card-template', imagePopup.open);
  return card.getCard();
}

const cardList = new Section({items: initialCards, renderer: ({ link, name }) => {
    cardList.addItemToEnd(createCard(link, name));
  }}, cardsContainer);

const editCardValidator = new FormValidator(editForm, config);
editCardValidator.enableValidation();

const addCardValidator = new FormValidator(addForm, config);
addCardValidator.enableValidation();

// edit user info
const userInfo = new UserInfo({nameElement, descriptionElement})

const editFormSubmitHandler = ({ name, description }) => {
  userInfo.setUserInfo(name, description);
  editPopup.close();
};

const editPopup = new PopupWithForm(editPopupSelector, editFormSubmitHandler)

const editFormOpenHandler = () => {
  nameInput.value = userInfo.getUserInfo().name
  descriptionInput.value = userInfo.getUserInfo().description;
  editPopup.open();
  editPopup.setEventListeners();
};

// add card
const addFormSubmitHandler = ({ link, place }) => {
  cardList.addItemToStart(createCard(link, place));
  addPopup.close();
};

const addPopup = new PopupWithForm(addPopupSelector, addFormSubmitHandler);

const addFormOpenHandler = () => {
  addCardValidator.disableSubmitButton();
  addPopup.open();
  addPopup.setEventListeners();
};

// image popup
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();


editButton.addEventListener('click', editFormOpenHandler);
addButton.addEventListener('click', addFormOpenHandler);

// create initial cards
cardList.renderItems();

