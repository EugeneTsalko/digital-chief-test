const burger = document.getElementById('burger');
const closeBtn = document.getElementById('close');
const nav = document.getElementById('menu');
const overlay = document.getElementById('overlay');

const toggleBurger = () => {
  // burger.classList.toggle('overlay_active');
  nav.classList.toggle('nav__wrapper_active');
  overlay.classList.toggle('overlay_active');
};

const closeBurger = (event) => {
  if (
    event.target.classList.contains('nav__link') ||
    event.target.classList.contains('overlay') ||
    event.target.classList.contains('close-btn')
  ) {
    nav.classList.remove('nav__wrapper_active');
    overlay.classList.remove('overlay_active');
  }
};

burger.addEventListener('click', toggleBurger);
nav.addEventListener('click', closeBurger);
overlay.addEventListener('click', closeBurger);
