// profile menu

const profileBlock = document.getElementById('header-profile');
const profileMenu = document.getElementById('header-profile-menu');

if(profileBlock && profileMenu)
{
    profileBlock.onmouseover = function(event) {
        profileMenu.classList += ' page__profile-menu--visible';
    }
    profileBlock.onmouseout = function(event) {
        profileMenu.classList.remove('page__profile-menu--visible');
    }
}




document.addEventListener('DOMContentLoaded', function() {

    // edit form

    const edits = document.getElementsByClassName('create-block__clear-input');

    for (let i=0; i < edits.length; i++) {
        edits[i].addEventListener('click', function(event) {
            this.previousElementSibling.value = '';
        });
    }

    // open cashiers in shops

    const mores = document.getElementsByClassName('main-blocks__link--more');
    const shopBlock = document.getElementById('shop-blocks');

    for (let i=0; i < mores.length; i++) {
        mores[i].addEventListener('click', function(event) {
            event.stopPropagation();
            const itemBlock = this.parentElement.parentElement;
            itemBlock.classList.add('main-blocks__item--opened');
            itemBlock.style.height = itemBlock.offsetHeight + 'px';
            itemBlock.firstElementChild.classList.add('main-blocks__item-absolute--active');
            this.classList.add('main-blocks__link--hidden');
            this.nextElementSibling.classList.add('more-cashiers--visible');
            shopBlock.classList.add('main-blocks--opened_item');
        });
    }

    document.getElementsByTagName('body')[0].addEventListener('click', function() {
        if (shopBlock) {
            shopBlock.classList.remove('main-blocks--opened_item');
            document.getElementsByClassName('more-cashiers--visible')[0].classList.remove('more-cashiers--visible');
            document.getElementsByClassName('main-blocks__link--hidden')[0].classList.remove('main-blocks__link--hidden');
            document.getElementsByClassName('main-blocks__item--opened')[0].classList.remove('main-blocks__item--opened');
        }
    });
});