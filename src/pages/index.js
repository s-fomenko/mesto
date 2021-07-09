import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { DeletePopup } from '../components/DeletePopup.js';
import { UserInfo } from '../components/UserInfo.js';
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

const deletePopupSelector = document.querySelector('.popup_type_delete');

const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const avatarElement = document.querySelector('.profile__avatar');

const cardsContainer = '.elements';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '2b1e20c0-2d56-4dae-97da-d3c1a4fc77d4',
    'Content-Type': 'application/json'
  }
})

const createCard = (item) => {
  const card = new Card(item, '#card-template', imagePopup.open, deletePopup.open.bind(deletePopup));
  deletePopup.getCardDeleteMethod(card);
  return card.getCard();
}

const cardList = new Section({renderer: (item) => {
    cardList.addItemToEnd(createCard(item));
  }}, cardsContainer);

const editCardValidator = new FormValidator(editForm, config);
editCardValidator.enableValidation();

const addCardValidator = new FormValidator(addForm, config);
addCardValidator.enableValidation();

// edit user info
const userInfo = new UserInfo({nameElement, descriptionElement, avatarElement})

const editFormSubmitHandler = ({ name, description }) => {
  api.editUserInfo(name, description)
    .then(user => userInfo.setUserInfo(user.name, user.about))
    .catch(err => console.log(err))
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
  api.setNewCard(item.place, item.link)
    .then(card => cardList.addItemToStart(createCard(card)))
    .catch(err => console.log(err))
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

// delete popup
const deletePopupSubmitHandler = (id) => {
  api.deleteCard(id)
    .catch(err => console.log(err))
}

const deletePopup = new DeletePopup(deletePopupSelector, deletePopupSubmitHandler);
deletePopup.setEventListeners();

editButton.addEventListener('click', editFormOpenHandler);
addButton.addEventListener('click', addFormOpenHandler);

// create initial userInfo
api.getUserInfo()
  .then(user => {
    userInfo.setUserInitialInfo(user.name, user.about, user.avatar);
  })
  .catch(err => console.log(err))

// create initial cards
api.getCards()
  .then(cards => {
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err))

