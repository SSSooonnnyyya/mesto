
const profileButton = document.querySelector('.profile__edit-botton');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close-botton');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__character');
let nameInput = document.querySelector('#fullname');
let jobInput = document.querySelector('#job');

function openPopup() {
    popup.classList.add('popup_opened');
    jobInput.value = job.textContent;
    nameInput.value = name.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

popup.addEventListener('submit', handleFormSubmit);
profileButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);