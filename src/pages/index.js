import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { DeletePopup } from '../components/DeletePopup.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  addButton,
  addForm,
  addPopupSelector,
  avatarEditButton,
  avatarEditForm,
  avatarEditPopupSelector,
  avatarElement,
  cardsContainer,
  config,
  deletePopupSelector,
  descriptionElement,
  descriptionInput, editButton,
  editForm,
  editPopupSelector,
  imagePopupSelector,
  nameElement,
  nameInput
} from '../utils/constants.js';

import './index.css';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '2b1e20c0-2d56-4dae-97da-d3c1a4fc77d4',
    'Content-Type': 'application/json'
  }
})

const createCard = (item) => {
  const card = new Card(item, '#card-template', userId, {
    handleImageOpen: imagePopup.open,
    handleCardDelete: deletePopup.open.bind(deletePopup),
    handleSetLike: api.setLike,
    handleRemoveLike: api.removeLike,
  });
  return card.getCard();
}

const cardList = new Section({renderer: (item) => {
    cardList.addItemToEnd(createCard(item));
  }}, cardsContainer);

const editProfileValidator = new FormValidator(editForm, config);
editProfileValidator.enableValidation();

const addCardValidator = new FormValidator(addForm, config);
addCardValidator.enableValidation();

const editAvatarValidator = new FormValidator(avatarEditForm, config);
editAvatarValidator.enableValidation();

// edit user info
const userInfo = new UserInfo({nameElement, descriptionElement, avatarElement})

const editFormSubmitHandler = ({ name, description }) => {
  editPopup.dataLoading(true);
  api.editUserInfo(name, description)
    .then(user => {
      userInfo.setUserInfo(user);
      editPopup.close();
    })
    .catch(err => console.log(err))
    .finally(editPopup.dataLoading(false));
};

const editPopup = new PopupWithForm(editPopupSelector, editFormSubmitHandler);
editPopup.setEventListeners();

const editFormOpenHandler = () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name
  descriptionInput.value = userData.description;
  editProfileValidator.resetValidation();
  editPopup.open();
};

// edit avatar
const editAvatarFormSubmitHandler = (item) => {
  editAvatarPopup.dataLoading(true);
  api.editUserAvatar(item.avatar)
    .then(user => {
      userInfo.setUserInfo(user);
      editAvatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(editAvatarPopup.dataLoading(false))
};

const editAvatarPopup = new PopupWithForm(avatarEditPopupSelector, editAvatarFormSubmitHandler);
editAvatarPopup.setEventListeners();

const editAvatarFormOpenHandler = () => {
  editAvatarValidator.resetValidation();
  editAvatarPopup.open();
};

// add card
const addFormSubmitHandler = (item) => {
  addPopup.dataLoading(true);
  api.setNewCard(item.place, item.link)
    .then(card => {
      cardList.addItemToStart(createCard(card));
      addPopup.close();
    })
    .catch(err => console.log(err))
    .finally(addPopup.dataLoading(false))
};

const addPopup = new PopupWithForm(addPopupSelector, addFormSubmitHandler);
addPopup.setEventListeners();

const addFormOpenHandler = () => {
  addCardValidator.resetValidation();
  addPopup.open();
};

// image popup
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

// delete popup
const deletePopupSubmitHandler = (id, card) => {
  return api.deleteCard(id)
    .then(() => {
      card.removeCard();
    })
    .catch(err => console.log(err))
}

const deletePopup = new DeletePopup(deletePopupSelector, deletePopupSubmitHandler);
deletePopup.setEventListeners();

editButton.addEventListener('click', editFormOpenHandler);
avatarEditButton.addEventListener('click', editAvatarFormOpenHandler)
addButton.addEventListener('click', addFormOpenHandler);

// get initial data
api.getInitialData()
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userId = user._id
    cardList.renderItems(cards);
  })
  .catch(err => console.log(err))

