// profile menu

const profileBlock = document.getElementById('header-profile');
const profileMenu = document.getElementById('header-profile-menu');

// при наведении на блок ".header-profile" элементу ".header-profile-menu" добавляется класс "page__profile-menu--visible"

profileBlock.onmouseover = function(event) {
    profileMenu.classList += ' page__profile-menu--visible';
}

// при ухода курсора с блока ".header-profile" у элемента ".header-profile-menu" удаляется класс "page__profile-menu--visible"

profileBlock.onmouseout = function(event) {
    profileMenu.classList.remove('page__profile-menu--visible');
}

document.addEventListener('DOMContentLoaded', function() {

    // edit form

    // очистка инпута по клику на соответствующую ему кнопку очистки

    const edits = document.getElementsByClassName('create-block__clear-input');

    for (let i=0; i < edits.length; i++) {
        edits[i].addEventListener('click', function(event) {
            this.previousElementSibling.value = '';
        });
    }

    // open cashiers in shops

    /*
    * при клике на "Еще кассиры" (".main-blocks__link--more") в любом блоке на странице магазинов:
    * 1) тому блоку ".main-blocks__item", внутри которого кликнули на "Еще кассиры", добавляется класс "main-blocks__item--opened"
    * 2) родительскому блоку "#shop-blocks" добавляется класс "main-blocks--opened_item"
    * ну и при клике в любом другом месте страницы - обратные действия
    * */

    const mores = document.getElementsByClassName('main-blocks__link--more');
    const shopBlock = document.getElementById('shop-blocks');

    for (let i=0; i < mores.length; i++) {
        mores[i].addEventListener('click', function(event) {
            event.stopPropagation();
            const itemBlock = this.parentElement.parentElement;
            itemBlock.classList.add('main-blocks__item--opened');
            shopBlock.classList.add('main-blocks--opened_item');
        });
    }

    document.getElementsByTagName('body')[0].addEventListener('click', function() {
        if (shopBlock) {
            shopBlock.classList.remove('main-blocks--opened_item');
            document.getElementsByClassName('main-blocks__item--opened')[0].classList.remove('main-blocks__item--opened');
        }
    });
});