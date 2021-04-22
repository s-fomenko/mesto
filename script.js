let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button');
let editButton = document.querySelector('.profile__button_type_edit');
let name = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('#name');
let descriptionInput = formElement.querySelector('#description');

nameInput.value = name.textContent;
descriptionInput.value = description.textContent;

let formSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closeButton.addEventListener('click', () => popup.classList.remove('popup_opened'));
