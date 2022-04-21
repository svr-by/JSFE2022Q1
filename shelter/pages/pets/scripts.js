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




