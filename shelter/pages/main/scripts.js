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

BURGER.addEventListener('click', toggleMenu);
BACK.addEventListener('click', closeMenu);
NAV.addEventListener('click', (event) => {if(event.target.classList.contains('nav__link')) closeMenu()});
window.addEventListener('resize', () => {if(BURGER.classList.contains('open')) closeMenu();});

//JSON database
const PETS = [];
fetch("../../js/pets.json")
.then(response => response.json())
.then(data => data.forEach(pet => PETS.push(pet)));


//Popup windows
let petCards = document.querySelectorAll('.pets__card');

function createPopup(event) {
    let name = event.target.closest('.pets__card').querySelector('.card__name').textContent;
    let pet = PETS.find(obj => obj.name === name);
    // console.log(pet.name);

    let popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = 
    `
    <div class="popup__wrapper">
        <div class="popup__img">
            <img src="${pet.img}" alt="${name}" class="image">
        </div>
        <div class="popup__desc">
            <h3 class="popup__title">${name}</h3>
            <h4 class="popup__subtitle">${pet.type} - ${pet.breed}</h4>
            <h5 class="popup__text">${pet.description}</h5>
            <ul class="popup__list">
                <li class="popup__item"><h5><b>Age:</b> ${pet.age}</h5></li>
                <li class="popup__item"><h5><b>Inoculations:</b> ${pet.inoculations.join(", ")}</h5></li>
                <li class="popup__item"><h5><b>Diseases:</b> ${pet.diseases.join(", ")}</h5></li>
                <li class="popup__item"><h5><b>Parasites:</b> ${pet.parasites.join(", ")}</h5></li>
            </ul>
        </div>
        <button class='button btn__round btn__remove'>✖</button>
    </div>
    `
    document.body.append(popup);
    popup.addEventListener('click', removePopup)
    document.body.classList.add('noscroll');
}

function removePopup(event) {
    // console.log(event.target.classList.contains('btn__remove'), (event.target.classList.value === 'popup'));
    if (event.target.classList.contains('btn__remove')||(event.target.classList.value === 'popup')) {
        let popup = document.querySelector('.popup');
        popup.remove();
        document.body.classList.remove('noscroll');
    };
};

petCards.forEach(card => card.addEventListener('click', createPopup));

//Slider
setTimeout(() => {
    const BTN_LEFT = document.querySelector('.btn__round--arr-left');
    const BTN_RIGHT = document.querySelector('.btn__round--arr-right');
    const SLIDE_LEFT = document.querySelector('#slide-left');
    const SLIDE_RIGHT = document.querySelector('#slide-right');
    const SLIDE_ACTIVE = document.querySelector('#slide-active');
    const SLIDER = document.querySelector('#slider');

    function moveLeft() {
        SLIDER.classList.add('transition-left');
        BTN_LEFT.removeEventListener('click', moveLeft);
        BTN_RIGHT.removeEventListener('click', moveRight);
    } 
    function moveRight() {
        SLIDER.classList.add('transition-right');
        BTN_RIGHT.removeEventListener('click', moveRight);
        BTN_LEFT.removeEventListener('click', moveLeft);
    } 

    function getRandomIndex(container) {
        let newInd = [];
        let containerInd = Array.from(container.querySelectorAll('.card__name'))
                        .map(selsector => selsector.textContent)
                        .map(name => PETS.findIndex(pet => (pet.name === name)));
        while (newInd.length < containerInd.length) {
            let randomIndex = Math.floor(Math.random() * 8);
            if (!containerInd.includes(randomIndex) && !newInd.includes(randomIndex)) {
                newInd.push(randomIndex);
            }
        }
        console.log(containerInd, newInd);
        return newInd;
    }

    function createSlide(arr, container){

        for(let i=0; i < arr.length; i++){
            let petObj = PETS[arr[i]];
            // console.log(arr[i], petObj.name);
            let petCard = document.createElement("div");
            petCard.className = "pets__card";
            petCard.innerHTML = `
                <div class="card__img">
                    <img src=${petObj.img || ""} alt=${petObj.name || ""} class="image">
                </div>
                <p class="card__name">${petObj.name || ""}</p>
                <button class="button btn__clear">Learn more</button>
            `;
            petCard.addEventListener('click', createPopup);
            container.append(petCard);
        }
    }


    let initialSlide = getRandomIndex(SLIDE_ACTIVE);
    SLIDE_ACTIVE.innerHTML = '';
    createSlide(initialSlide, SLIDE_ACTIVE);
    SLIDE_LEFT.innerHTML = '';
    createSlide(getRandomIndex(SLIDE_ACTIVE), SLIDE_LEFT);
    SLIDE_RIGHT.innerHTML = '';
    createSlide(getRandomIndex(SLIDE_ACTIVE), SLIDE_RIGHT);

    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);

    SLIDER.addEventListener('animationend', (animationEvent) => {
        if(animationEvent.animationName === 'move-left') {
            // console.log(animationEvent.animationName);
            SLIDE_RIGHT.innerHTML = SLIDE_ACTIVE.innerHTML;
            SLIDE_ACTIVE.innerHTML = SLIDE_LEFT.innerHTML;
            let newPets = getRandomIndex(SLIDE_ACTIVE);
            SLIDE_LEFT.innerHTML = '';
            createSlide(newPets, SLIDE_LEFT);
            
        } else if(animationEvent.animationName === 'move-right') {
            // console.log(animationEvent.animationName);
            SLIDE_LEFT.innerHTML = SLIDE_ACTIVE.innerHTML;
            SLIDE_ACTIVE.innerHTML = SLIDE_RIGHT.innerHTML;
            let newPets = getRandomIndex(SLIDE_ACTIVE);
            SLIDE_RIGHT.innerHTML = '';
            createSlide(newPets, SLIDE_RIGHT);
        }
        SLIDER.classList.remove('transition-left');
        SLIDER.classList.remove('transition-right');
        BTN_LEFT.addEventListener('click', moveLeft);
        BTN_RIGHT.addEventListener('click', moveRight);
        document.querySelectorAll('.pets__card').forEach(card => card.addEventListener('click', createPopup));
    });
}, 500);
