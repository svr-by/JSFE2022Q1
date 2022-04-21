"use strict"

// Burger menu
const BURGER = document.querySelector('.burger');
const LOGO = document.querySelector('.header__logo');
const NAV = document.querySelector('.header__nav');
const BACK = document.querySelector('.back');

function toggleMenu () {
    BURGER.classList.toggle('open');
    NAV.classList.toggle('open');
    LOGO.classList.toggle('hidden');
    BACK.classList.toggle('visible');
    document.body.classList.toggle('noscroll');
}

function closeMenu() {
    BURGER.classList.remove('open');
    NAV.classList.remove('open');
    LOGO.classList.remove('hidden');
    BACK.classList.remove('visible');
    document.body.classList.remove('noscroll');
}

window.addEventListener('resize', closeMenu);
BURGER.addEventListener('click', toggleMenu);
BACK.addEventListener('click', closeMenu);
NAV.addEventListener('click', (event) => {if(event.target.classList.contains('nav__link')) closeMenu()});


//JSON database
const PETS = [];
fetch("../../js/pets.json")
.then(response => response.json())
.then(data => data.forEach(pet => PETS.push(pet)));


//Popup windows
let petCards = document.querySelectorAll('.pets__card');
petCards.forEach(card => card.querySelector('.button').addEventListener('click', showPopup));

function showPopup(event) {
    let name = event.target.previousElementSibling.textContent;
    let pet = PETS.find(obj => obj.name === name);
    console.log(pet.name);

    let popup = document.createElement('div');
    popup.innerHTML = 
    `
    <div class="popup__window">
        <div class="popup__img">
            <img src="${pet.img}" alt="${name}">
        </div>
        <div class="popup__description">
            <h3 class="popup__title">${name}</h3>
            <h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
            <h5 class="popup__text">${pet.description}</h5>
            <div class="popup__list">
                <li><h5><b>Age:</b> ${pet.age}</h5></li>
                <li><h5><b>Inoculations:</b> ${pet.inoculations.join(", ")}</h5></li>
                <li><h5><b>Diseases:</b> ${pet.diseases.join(", ")}</h5></li>
                <li><h5><b>Parasites:</b> ${pet.parasites.join(", ")}</h5></li>
            </div>
        </div>
        <button class='button button_circle button_white popup__button'>✖</button>
    </div>
    `
    console.log(popup);
}
