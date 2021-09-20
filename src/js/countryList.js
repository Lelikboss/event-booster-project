const refs = {
    datalist: document.querySelector('#countries'),
    input: document.querySelector('.header__input-js'),
};

window.addEventListener('click', e => {  
    if (!e.target.closest('#countries') && (!e.target.closest('.header__input-js'))) { // при кліку будь де, крім списку країн та інпута
        closeDatalist();
        removeBorderRadius()
        onPreviousPolygonSvg();
    }
})
refs.input.addEventListener('click', onReversePolygonSvg);
refs.datalist.addEventListener('click', onPreviousPolygonSvg);
  

function removeBorderRadius() {     // вертаємо попередній вигляд інпута
    refs.input.classList.remove('change-top-border');
}

function closeDatalist() {   // ховаємо список країн
    refs.datalist.style.display = "none";
}

function onReversePolygonSvg() {  // міняємо стрілку на зворотню
    refs.input.classList.remove('header__input-countries');
    refs.input.classList.add('header__input-countries--reverse');
}

function onPreviousPolygonSvg() {   // вертаємо стрілку у вихідне положення
    refs.input.classList.remove('header__input-countries--reverse');
    refs.input.classList.add('header__input-countries');
}