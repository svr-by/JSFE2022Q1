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
    let name = event.target.previousElementSibling.textContent;
    let pet = PETS.find(obj => obj.name === name);
    console.log(pet.name);

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
                <li><h5><b>Age:</b> ${pet.age}</h5></li>
                <li><h5><b>Inoculations:</b> ${pet.inoculations.join(", ")}</h5></li>
                <li><h5><b>Diseases:</b> ${pet.diseases.join(", ")}</h5></li>
                <li><h5><b>Parasites:</b> ${pet.parasites.join(", ")}</h5></li>
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
    if (!event.target.classList.contains('btn__remove')) return;
    let popup = document.querySelector('.popup');
    popup.remove();
    document.body.classList.remove('noscroll');
};

petCards.forEach(card => card.querySelector('.button').addEventListener('click', createPopup));

//Slider

let sliderBtn = document.querySelectorAll('.slider__btn');
let sliderContainer = document.querySelector('.slider__container');
let currentSlideIndex = [4, 0, 2];

sliderBtn.forEach(btn => btn.addEventListener('click', showNextSlide));

function showNextSlide() {
	sliderContainer.innerHTML = '';
	let nextSlideIndex = randimizeCard();
	createSlide(nextSlideIndex, sliderContainer);
}

function randimizeCard() {
    let nextArr = [];
    while (nextArr.length < currentSlideIndex.length) {
        let randomIndex = Math.floor(Math.random() * 8);
        if (!currentSlideIndex.includes(randomIndex) && !nextArr.includes(randomIndex)) {
            nextArr.push(randomIndex)
        }
    }
    currentSlideIndex = [...nextArr];
	return nextArr;
};

function createSlide(arr, container){

	for(let i=0; i < arr.length; i++){
		let petObj = PETS[arr[i]];
        console.log(arr[i], petObj.name);
		let petCard = document.createElement("div");
		petCard.className = "pets__card";
		petCard.innerHTML = `
			<div class="card__img">
				<img src=${petObj.img || ""} alt=${petObj.name || ""} class="image">
			</div>
			<p class="card__name">${petObj.name || ""}</p>
			<button class="button btn__clear">Learn more</button>
		`;
        petCard.querySelector('.button').addEventListener('click', createPopup);
		container.append(petCard);
	}
}