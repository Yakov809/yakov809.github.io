//Мой первый js файл
'use strict';
console.log('Привет мир!');

// ******************мобильное меню***********************
const headerNav = document.querySelector(".header-nav"); //выбрать блок меню
const headerMenu = document.querySelector(".header-menu"); //выбрать кнопку меню с чашкой
const menuItems = document.querySelectorAll(".menuItem"); //выбрать все ссылки
const hamburger= document.querySelector(".header-menu-mobile"); //блок кнопки закрыть/открыть
const closeIconTop= document.querySelector(".header-menu-mobile-circle-line-1"); //кнопка закрыть меню
const closeIconDown= document.querySelector(".header-menu-mobile-circle-line-2");
const menuIcon = document.querySelector(".menuIcon");  //кнопка открыть меню


function toggleMenu() {
  if (headerNav.classList.contains("showMenu")&&headerMenu.classList.contains("showMenu")) {
    headerNav.classList.remove("showMenu");
    headerMenu.classList.remove("showMenu");

    closeIconTop.classList.remove("open");
    closeIconDown.classList.remove("open");
  
  } else {
    headerNav.classList.add("showMenu");
    headerMenu.classList.add("showMenu");
   
    // headerNav.style.display = "block";
    closeIconTop.classList.add("open");
    closeIconDown.classList.add("open");
  //  menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);
menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
)

//****************** Слайдер **********************************

let sliderCounter = 1; //Инициализация счетчика
const slider = document.querySelector('.fav-coffee-container'); //блок слайдера
const slideElement = document.querySelectorAll('.fav-coffee-slider'); //элемент слайдера
const buttons = document.querySelectorAll('.fav-coffee-button'); //кнопки переключения слайдера
const controls = document.querySelectorAll('.control__item'); //кнопка анимации слайдера

let sliderWidth = slider.offsetWidth;
//console.log(sliderWidth);

//листать слайдер вправо
function nextSlide() {
  if (sliderCounter == 3) {
    sliderCounter = 1;
    moveSlide();
    toogleClass(sliderCounter - 1);
  } else {
    sliderCounter++;
    moveSlide();
    toogleClass(sliderCounter - 1);
  }
}
//листать слайдер влево
function previousSlide() {
  if (sliderCounter == 1) {
    sliderCounter = 3;
    moveSlide();
    toogleClass(sliderCounter - 1);
  } else {
    sliderCounter--;
    moveSlide();
    toogleClass(sliderCounter - 1);
  }
}

function scroll() {
  if (sliderCounter < 3) {
    sliderCounter++;
    moveSlide();
    toogleClass(sliderCounter - 1);
  } else {
    sliderCounter = 1;
    moveSlide();
    toogleClass(sliderCounter - 1);
  }
}

//передвигаем слайдер
function moveSlide() {
  if (sliderCounter == 1) {
    slider.style.left = 0;
  } else if (sliderCounter == 2) {
    slider.style.left = -(100 + sliderWidth) + 'px';
  } else if (sliderCounter == 3) {
    slider.style.left = -(200 + sliderWidth * 2) + 'px';
  }
}

function toogleClass(index) {
  controls.forEach((control) => {
    control.classList.remove('active');
  });

  controls[index].classList.add('active');
  sliderCounter = index + 1;
}

buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    if (i == 0) {
      previousSlide();
    } else if (i == 1) {
      nextSlide();
    }
  });
});

controls.forEach((control, i) => {
  control.addEventListener('click', () => {
    toogleClass(i);
    moveSlide();
  });

  control.addEventListener('animationend', () => {
    scroll();
  });
});


//события мыши при наведении на картинку
let xCoordinate;
let xDifference;

slideElement.forEach((slide, i) => {
  slide.addEventListener('mouseover', (e) => {
    controls[i].style.webkitAnimationPlayState = 'paused';
  });

  slide.addEventListener('mouseout', () => {
    controls[i].style.webkitAnimationPlayState = 'running';
  });

  slide.addEventListener('touchstart', (e) => {
    e.preventDefault();
    xCoordinate = e.touches[0].clientX;
    controls[i].style.webkitAnimationPlayState = 'paused';
  });

  slide.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let touchArray = e.touches[0];
    xDifference = xCoordinate - touchArray.clientX;
  });

  slide.addEventListener('touchend', () => {
    if (xDifference > 0) {
      nextSlide();
      xDifference = 0;
    } else if (xDifference < 0) {
      xDifference = 0;
      previousSlide();
    }
    controls[i].style.webkitAnimationPlayState = 'running';
  });
});
