const profileButton = document.querySelector('.profile__edit-botton');
const buttonAdd = document.querySelector('.profile__add-botton');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
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
const template = document.querySelector('#cards-template');
const container = popupImage.querySelector('.popup-image__container');
const popupImagePicture = container.querySelector('.popup-image__picture');
const popupImageTitle = container.querySelector('.popup-image__title');

const createCard = (initialCard) => {
    const newCard = template.content.querySelector('.element').cloneNode(true);
    newCard.querySelector('.element__mask').setAttribute('src', initialCard.link);
    newCard.querySelector('.element__title').textContent = initialCard.name; 
    cards.prepend(newCard);
    
    newCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
    newCard.querySelector('.element__mask').addEventListener('click', handleShowImage);
    newCard.querySelector('.element__like-botton').addEventListener('click', handleLikeCard);
}

initialCards.forEach((initialCard) => {
    createCard(initialCard);
})

function openProfilePopup () {
    openPopup(popupProfile);
    jobInput.value = job.textContent;
    nameInput.value = profileName.textContent;
}

function openCardPopup () {
    openPopup(popupCards);
}

function openPopup(domElement) {
    domElement.classList.add('popup_opened');
}

function handleClosePopup(evt) {
    closePopup(evt.target.closest('div.popup'));
}

function closePopup(item) {
    item.classList.remove('popup_opened');
}

function handleSubmitProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(nameInput.closest('div.popup'));
}

function handleSubmitCards (evt) {
    evt.preventDefault();
    createCard({ name: mestoInput.value, link: imgInput.value });
    closePopup(mestoInput.closest('div.popup'));
    mestoInput.value = null;
    imgInput.value = null;
}

function handleLikeCard (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('element__like-botton_active');
}

function handleDeleteCard (evt) {
    evt.preventDefault();
    evt.target.closest('article.element').remove();
}

function handleShowImage(evt) {
    evt.preventDefault();
    openPopup(popupImage);
    popupImagePicture.setAttribute('src', evt.target.getAttribute('src'));
    const currentTitle = evt.target.closest('article.element').querySelector('.element__title');
    popupImageTitle.textContent = currentTitle.textContent;
    popupImagePicture.setAttribute('alt', currentTitle.textContent);
}

profileButton.addEventListener('click', openProfilePopup);
buttonAdd.addEventListener('click', openCardPopup);
popupProfile.addEventListener('submit', handleSubmitProfile);
popupsClose.forEach(function(item) {
    item.addEventListener('click', handleClosePopup);
})
popupCards.addEventListener('submit', handleSubmitCards);