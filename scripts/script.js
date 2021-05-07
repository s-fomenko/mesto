const editButton = document.querySelector('.profile__button_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const editForm = document.querySelector('.form_type_edit');
const editCloseButton = editPopup.querySelector('.popup__button');

const addButton = document.querySelector('.profile__button_type_add');
const addPopup = document.querySelector('.popup_type_add');
const addForm = document.querySelector('.form_type_add');
const addCloseButton = addPopup.querySelector('.popup__button');

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const placeInput = addForm.querySelector('#place');
const linkInput = addForm.querySelector('#link');

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

const getLike = button => {
  button.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__button_active')
  });
};

const removeCard = button => {
  button.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });
};

const addListeners = card => {
  const likeButton = card.querySelector('.card__button_type_like');
  const removeButton = card.querySelector('.card__button_type_remove');
  getLike(likeButton);
  removeCard(removeButton);
}

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

const editFormCloseHandler = () => editPopup.classList.remove('popup_opened')

editButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
editCloseButton.addEventListener('click', editFormCloseHandler);

// add card
getCard = () => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = linkInput.value;
  card.querySelector('.card__title').textContent = placeInput.value;
  addListeners(card);
  return card;
}

const addFormOpenHandler = () => {
  addForm.reset();
  togglePopup(addPopup);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = getCard();
  cardsContainer.prepend(card);
  togglePopup(addPopup);
};

const addFormCloseHandler = () => addPopup.classList.remove('popup_opened')

addButton.addEventListener('click', addFormOpenHandler);
addForm.addEventListener('submit', addFormSubmitHandler);
addCloseButton.addEventListener('click', addFormCloseHandler);

// create initial cards
initialCards.forEach(item => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__image').src = item.link;
  card.querySelector('.card__title').textContent = item.name;
  addListeners(card);
  cardsContainer.append(card);
})
