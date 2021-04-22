let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button');
let editButton = document.querySelector('.profile__button_type_edit');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let descriptionInput = formElement.querySelector('#description');

let formSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened')
}

let formOpenHandler = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  popup.classList.add('popup_opened')
}

let formCloseHandler = () => popup.classList.remove('popup_opened')

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', formOpenHandler);
closeButton.addEventListener('click', formCloseHandler);
