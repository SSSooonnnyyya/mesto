
const profileButton = document.querySelector('.profile__edit-botton');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close-botton');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__character');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_character');

profileButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);

function openPopup(event) {
    event.preventDefault();
    popup.classList.add('popup_opened');
    jobInput.value = job.textContent;
    nameInput.value = name.textContent;
}

function closePopup(event) {
    event.preventDefault();
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popup.classList.remove('popup_opened');
}

popup.addEventListener('submit', handleFormSubmit);