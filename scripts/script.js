// edit user info
const popup = document.querySelector('.popup_type_edit');
const closeButton = popup.querySelector('.popup__button');
const editButton = document.querySelector('.profile__button_type_edit');
const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const editForm = document.querySelector('.form_type_edit');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened')
}

const formOpenHandler = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  popup.classList.add('popup_opened')
}

const formCloseHandler = () => popup.classList.remove('popup_opened')

editForm.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', formOpenHandler);
closeButton.addEventListener('click', formCloseHandler);

// create initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

initialCards.forEach(item => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;
  cardsContainer.append(card);
})
