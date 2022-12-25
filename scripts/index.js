const profileButton = document.querySelector('.profile__edit-botton');
const buttonAdd = document.querySelector('.profile__add-botton');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCards = document.querySelector('.popup_type_cards');
const popupImage = document.querySelector('.popup_type_image');
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
const container = popupImage.querySelector('.popup__box');
const popupImagePicture = container.querySelector('.popup__picture');
const popupImageTitle = container.querySelector('.popup__sign');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-botton',
    inactiveButtonClass: 'popup__submit-botton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };


const createCard = (initialCard) => {
    const newCard = template.content.querySelector('.element').cloneNode(true);
    const mask = newCard.querySelector('.element__mask');
    mask.setAttribute('src', initialCard.link);
    mask.setAttribute('alt', initialCard.name);

    newCard.querySelector('.element__title').textContent = initialCard.name; 
    
    newCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
    mask.addEventListener('click', handleShowImage);
    newCard.querySelector('.element__like-botton').addEventListener('click', handleLikeCard);

    return newCard;
}

function renderCard(initialCard) {
    cards.prepend(createCard(initialCard));
}

initialCards.forEach((initialCard) => {
    renderCard(initialCard);
})

function openProfilePopup () {
    jobInput.value = job.textContent;
    nameInput.value = profileName.textContent;
    openPopup(popupProfile);
}

function openCardPopup () {
    openPopup(popupCards);
}

function openPopup(domElement) {
    domElement.classList.add('popup_opened');
    const inputs = domElement.querySelectorAll(validationConfig.inputSelector);
    const button = domElement.querySelector(validationConfig.submitButtonSelector);

    if (inputs.length > 0) {
        toggleButtonState(inputs, button, validationConfig);
    }
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
    renderCard({ name: mestoInput.value, link: imgInput.value });
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
popups.forEach(function(item) {
    item.addEventListener('click', function(event) {
        if(event.target === event.currentTarget) {
            handleClosePopup(event);
        }
    })
});

document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
        document.querySelector('.popup_opened').classList.remove('popup_opened');
        }
})

popupCards.addEventListener('submit', handleSubmitCards);

enableValidation(validationConfig);