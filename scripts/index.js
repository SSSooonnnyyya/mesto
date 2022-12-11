const profileButton = document.querySelector('.profile__edit-botton');
const addButton = document.querySelector('.profile__add-botton');
const popupProfile = document.querySelector('.popup_profile');
const popupCards = document.querySelector('.popup_cards');
const popupImage = document.querySelector('.popup-image');
const popups = document.querySelectorAll('.popup');
const popupsClose = document.querySelectorAll('.popup__close-botton');
const profileName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__character');
const nameInput = document.querySelector('.popup__input_value_name');
const jobInput = document.querySelector('.popup__input_value_job');
const mestoInput = document.querySelector('.popup__input_value_mesto');
const imgInput = document.querySelector('.popup__input_value_img-link');
const cards = document.querySelector('.elements');

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
      link: 'https://images.unsplash.com/photo-1535427284698-c8e68a1eb910?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1736&q=80'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://images.unsplash.com/photo-1553785063-9e892a3f15b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
    }
  ];

const createCard = (cardName, cardLink) => {
    const card = document.createElement('article');
    card.classList.add('element');
    const mask = document.createElement('img');
    mask.classList.add('element__mask');
    mask.setAttribute('src', cardLink);
    mask.setAttribute('alt', cardName);
    const del = document.createElement('button');
    del.classList.add('element__delete-button');
    const group = document.createElement('div');
    group.classList.add('element__group');
    const sign = document.createElement('h2');
    sign.textContent = cardName;
    sign.classList.add('element__title');
    const like = document.createElement('button');
    like.classList.add('element__like-botton');
    like.setAttribute('type', 'button')
    group.append(sign, like);
    card.append(mask, group, del);
    return card;
}

const fulfillCards = (cardName, cardLink) => {
    cards.append(createCard(cardName, cardLink));
}

cards.append(...initialCards.map((initialCard) => {
    return createCard(initialCard.name, initialCard.link);
}))

function openProfilePopup () {
    popupProfile.classList.add('popup_opened');
    jobInput.value = job.textContent;
    nameInput.value = profileName.textContent;
}

function openCardPopup () {
    popupCards.classList.add('popup_opened');
}

function closePopup() {
    popups.forEach(function(item) {
        item.classList.remove('popup_opened');
    })
}

function submitProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

function submitCards (evt) {
    evt.preventDefault();
    const newCard = createCard(mestoInput.value, imgInput.value)
    cards.prepend(newCard);
    closePopup();
    mestoInput.value = null;
    imgInput.value = null;

    newCard.querySelector('.element__delete-button').addEventListener('click', deleteCard);
    newCard.querySelector('.element__mask').addEventListener('click', showImage);
    newCard.querySelector('.element__like-botton').addEventListener('click', likeCard);
}

const likeButtons = document.querySelectorAll('.element__like-botton');

function likeCard (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('element__like-botton_active');
}

const deleteButtons = document.querySelectorAll('.element__delete-button');

function deleteCard (evt) {
    evt.preventDefault();
    evt.target.parentElement.remove();
}

const images = document.querySelectorAll('.element__mask');

function showImage(evt) {
    evt.preventDefault();
    popupImage.classList.add('popup_opened');
    const container = popupImage.querySelector('.popup-image__container');
    const image = container.querySelector('.popup-image__picture');
    image.setAttribute('src', evt.target.getAttribute('src'));

    const title = container.querySelector('.popup-image__title');
    const grandparent = evt.target.parentElement;
    const parent = grandparent.querySelector('.element__group')
    const currentTitle = parent.querySelector('.element__title');
    title.textContent = currentTitle.textContent;
    image.setAttribute('alt', currentTitle.textContent);
}

images.forEach(function(item) {
    item.addEventListener('click', showImage);
})

profileButton.addEventListener('click', openProfilePopup);
addButton.addEventListener('click', openCardPopup);
popupProfile.addEventListener('submit', submitProfile);
popupsClose.forEach(function(item) {
    item.addEventListener('click', closePopup);
})
popupCards.addEventListener('submit', submitCards);
likeButtons.forEach(function(item) {
    item.addEventListener('click', likeCard);
})
deleteButtons.forEach(function(item) {
    item.addEventListener('click', deleteCard);
})