const editButton = document.querySelector('.profile__button_type_edit');
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = editPopup.querySelector('.popup__button');

const editForm = document.querySelector('.form_type_edit');
const nameInput = editForm.querySelector('#name');
const descriptionInput = editForm.querySelector('#description');

const addButton = document.querySelector('.profile__button_type_add');
const addPopup = document.querySelector('.popup_type_add');
const addCloseButton = addPopup.querySelector('.popup__button');

const addForm = document.querySelector('.form_type_add');
const placeInput = addForm.querySelector('#place');
const linkInput = addForm.querySelector('#link');
const addFormButton = addForm.querySelector('.form__button');


const imagePopup = document.querySelector('.popup_type_image');
const imageCloseButton = imagePopup.querySelector('.popup__button');
const popupImage = imagePopup.querySelector('.image__item');
const popupDescription = imagePopup.querySelector('.image__description');

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.elements');

const popupList = document.querySelectorAll('.popup');

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

const getImage = image => {
  image.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');
    const cardImage = card.querySelector('.card__image');
    const cardDescription = card.querySelector('.card__title');

    popupImage.src = cardImage.src;
    popupImage.alt = cardDescription.textContent;
    popupDescription.textContent = cardDescription.textContent;
    togglePopup(imagePopup);
  });
};

const addListeners = card => {
  const likeButton = card.querySelector('.card__button_type_like');
  const removeButton = card.querySelector('.card__button_type_remove');
  const image = card.querySelector('.card__image');
  getLike(likeButton);
  removeCard(removeButton);
  getImage(image);
}

const getCard = (link, place) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = place;
  cardTitle.textContent = place;
  addListeners(card);
  return card;
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

const editFormCloseHandler = () => togglePopup(editPopup);

// add card
const addFormOpenHandler = () => {
  addForm.reset();
  togglePopup(addPopup);
  toggleButtonState([placeInput, linkInput], addFormButton, config);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const card = getCard(linkInput.value, placeInput.value);
  cardsContainer.prepend(card);
  togglePopup(addPopup);
};

const addFormCloseHandler = () => togglePopup(addPopup);

// image popup
const imageFormCloseHandler = () => togglePopup(imagePopup);


editButton.addEventListener('click', editFormOpenHandler);
editForm.addEventListener('submit', editFormSubmitHandler);
editCloseButton.addEventListener('click', editFormCloseHandler);
addButton.addEventListener('click', addFormOpenHandler);
addForm.addEventListener('submit', addFormSubmitHandler);
addCloseButton.addEventListener('click', addFormCloseHandler);
imageCloseButton.addEventListener('click', imageFormCloseHandler);

// create initial cards
initialCards.forEach(item => {
  const card = getCard(item.link, item.name);
  cardsContainer.append(card);
})

// close popup methods
popupList.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      togglePopup(popup);
    }
  })
})
