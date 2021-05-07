const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__button');

const editButton = document.querySelector('.profile__button_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.form_type_edit');

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

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

// common methods
const togglePopup = popupType => popupType.classList.toggle('popup_opened');
const popupCloseHandler = () => popup.classList.remove('popup_opened')

closeButton.addEventListener('click', popupCloseHandler);

// edit user info
const editFormOpenHandler = () => {
  nameInput.value = name.textContent;
  descriptionInput.value = description.textContent;
  togglePopup(editPopup);
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  description.textContent = descriptionInput.value;
  togglePopup(editPopup);
};

editButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);


// create initial cards
initialCards.forEach(item => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;
  cardsContainer.append(card);
})
