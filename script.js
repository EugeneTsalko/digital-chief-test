// burger menu

const burger = document.getElementById('burger');
const closeBtn = document.getElementById('close');
const nav = document.getElementById('menu');
const overlay = document.getElementById('overlay');

const toggleBurger = () => {
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

// form validation

const form = document.getElementById('form');
const { name, email, message } = form;
const inputs = [name, email, message];

const errors = {
  name: 'Введите имя',
  email: 'Введите адрес эл. почты',
  message: 'Введите сообщение',
  emailNotValid: 'Неверный адрес эл. почты',
};

const borders = {
  red: '2px solid red',
  green: '2px solid green',
  main: '1px solid black',
};

const isEmailValid = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

const validate = (elem) => {
  const error = elem.nextElementSibling;
  error.innerText = '';
  elem.style.border = borders.green;

  let isValid = true;

  if (!elem.value.trim()) {
    error.innerText = errors[elem.id];
    elem.style.border = borders.red;

    isValid = false;
  }

  if (!!elem.value.trim() && elem.type === 'email') {
    if (!isEmailValid(elem.value)) {
      error.innerText = errors.emailNotValid;
      elem.style.border = borders.red;

      isValid = false;
    }
  }

  return isValid;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const isValid = inputs.map((el) => validate(el)).every((item) => !!item);

  if (isValid) {
    setTimeout(() => {
      inputs.forEach((elem) => {
        elem.style.border = borders.main;
      });
    }, 1500);

    const data = inputs.reduce((acc, curr) => ((acc[curr.id] = curr.value), acc), {});

    console.log('Здесь может быть запрос на сервер с данными формы:', data);

    form.reset();
  }
});

inputs.forEach((elem) =>
  elem.addEventListener('change', (event) => {
    const error = event.target.nextElementSibling;

    error.innerText = '';
    elem.style.border = borders.main;
  }),
);

// пример запроса для отправки данных ня сервер

async function submit(url, data) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (err) {
    console.error('Ошибка', err);
  }
}
