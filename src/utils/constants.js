export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible'
}

export const editButton = document.querySelector('.profile__button_type_edit');
export const editPopupSelector = document.querySelector('.popup_type_edit');
export const editForm = document.querySelector('.form_type_edit');
export const nameInput = editForm.querySelector('#name');
export const descriptionInput = editForm.querySelector('#description');
export const addButton = document.querySelector('.profile__button_type_add');
export const addPopupSelector = document.querySelector('.popup_type_add');
export const addForm = document.querySelector('.form_type_add');
export const avatarEditButton = document.querySelector('.profile__button_type_avatar-edit');
export const avatarEditPopupSelector = document.querySelector('.popup_type_avatar-edit');
export const avatarEditForm = document.querySelector('.form_type_avatar-edit');
export const imagePopupSelector = document.querySelector('.popup_type_image');
export const deletePopupSelector = document.querySelector('.popup_type_delete');
export const nameElement = document.querySelector('.profile__name');
export const descriptionElement = document.querySelector('.profile__description');
export const avatarElement = document.querySelector('.profile__avatar');
export const cardsContainer = '.elements';
