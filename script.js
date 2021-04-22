const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button');
const editButton = document.querySelector('.profile__button_type_edit');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('#name');
const descriptionInput = formElement.querySelector('#description');

nameInput.value = name.textContent;
descriptionInput.value = description.textContent;

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened')
}

formElement.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closeButton.addEventListener('click', () => popup.classList.remove('popup_opened'));
