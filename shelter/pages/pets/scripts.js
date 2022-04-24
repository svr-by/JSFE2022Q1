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
    if (!event.target.classList.contains('btn__remove')) return;
    let popup = document.querySelector('.popup');
    popup.remove();
    document.body.classList.remove('noscroll');
};

petCards.forEach(card => card.addEventListener('click', createPopup));

//Pagination

let btnLastLeft = document.querySelector('.btn__round--dbab-left');
let btnLeft = document.querySelector('.btn__round--ab-left');
let btnLastRight = document.querySelector('.btn__round--dbab-right');
let btnRight = document.querySelector('.btn__round--ab-right');
let btnPage = document.querySelector('.btn__round--active');
let pageContainer = document.querySelector('.pets__page');


let defaultPageIndex = [4, 0, 2, 1, 5, 7, 3, 6];
let pageIndex = randimizeIndex(48);

let page = 1;
let displayWidth = document.body.clientWidth;
let pageSize = (displayWidth < 768) ? 3 : (displayWidth < 1280) ? 6 : 8;
let pages = Math.ceil(pageIndex.length / pageSize);



function randimizeIndex(num) {
    let arrIndex = [...defaultPageIndex];
    for(let i = 0; i < num-defaultPageIndex.length; i++){
        let uniqueArr = arrIndex.slice(-6);
        while (true) {
            let randomIndex = Math.floor(Math.random() * 8);
            if (!uniqueArr.includes(randomIndex)) {
                arrIndex.push(randomIndex);
                break;
            }
        }
    }
	return arrIndex;
};


function currentPageIndex() {
    return pageIndex.slice((page - 1)*pageSize, page*pageSize);
}

function createPage(arr, container){

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

function showNextPage() {
    if(page < pages) {
        page++;
        btnPage.innerHTML = page;
        pageContainer.innerHTML = '';

        console.log(`${page} of ${pages}`);
        // console.log(currentPageIndex());

        createPage(currentPageIndex(), pageContainer);

        if (page === pages) {
            console.log('page = pages');
            btnRight.classList.add('btn__round--last');
            btnLastRight.classList.add('btn__round--last');
        }
        if (page > 1) {
            btnLeft.classList.remove('btn__round--last');
            btnLastLeft.classList.remove('btn__round--last');
        }
    }
}

function showPreviousPage() {
    if(page > 1) {
        page--;
        btnPage.innerHTML = page;
        pageContainer.innerHTML = '';

        console.log(`${page} of ${pages}`);
        // console.log(currentPageIndex());

        createPage(currentPageIndex(), pageContainer);

        if (page < pages) {
            btnRight.classList.remove('btn__round--last');
            btnLastRight.classList.remove('btn__round--last');
        }
        if (page === 1) {
            console.log('page === 1');
            btnLeft.classList.add('btn__round--last');
            btnLastLeft.classList.add('btn__round--last');
        }
    }
}

function showFirstPage() {
    if (page === pages) {
        btnRight.classList.remove('btn__round--last');
        btnLastRight.classList.remove('btn__round--last');
    }
    btnLeft.classList.add('btn__round--last');
    btnLastLeft.classList.add('btn__round--last');

    page = 1;
    btnPage.innerHTML = page;
    pageContainer.innerHTML = '';
    createPage(currentPageIndex(), pageContainer);

    console.log(`${page} of ${pages}`);
    // console.log(currentPageIndex());
}

function showLastPage() {
    if (page === 1) {
        btnLeft.classList.remove('btn__round--last');
        btnLastLeft.classList.remove('btn__round--last');
    }
    btnRight.classList.add('btn__round--last');
    btnLastRight.classList.add('btn__round--last');

    page = pages;
    btnPage.innerHTML = page;
    pageContainer.innerHTML = '';
    createPage(currentPageIndex(), pageContainer);

    console.log(`${page} of ${pages}`);
    // console.log(currentPageIndex());
}

btnRight.addEventListener('click', showNextPage);
btnLeft.addEventListener('click', showPreviousPage);
btnLastLeft.addEventListener('click', showFirstPage);
btnLastRight.addEventListener('click', showLastPage);





