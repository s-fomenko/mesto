import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../utils/initialCards.js';
import { config } from '../utils/constants.js';

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

const createCard = (item) => {
  const card = new Card(item, '#card-template', imagePopup.open);
  return card.getCard();
}

const cardList = new Section({items: initialCards, renderer: (item) => {
    cardList.addItemToEnd(createCard(item));
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

const editPopup = new PopupWithForm(editPopupSelector, editFormSubmitHandler);
editPopup.setEventListeners();

const editFormOpenHandler = () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name
  descriptionInput.value = userData.description;
  editPopup.open();
};

// add card
const addFormSubmitHandler = (item) => {
  cardList.addItemToStart(createCard(item));
  addPopup.close();
};

const addPopup = new PopupWithForm(addPopupSelector, addFormSubmitHandler);
addPopup.setEventListeners();

const addFormOpenHandler = () => {
  addCardValidator.disableSubmitButton();
  addPopup.open();
};

// image popup
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();


editButton.addEventListener('click', editFormOpenHandler);
addButton.addEventListener('click', addFormOpenHandler);

// create initial cards
cardList.renderItems();

