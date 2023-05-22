// MENU MOBILE

let headerButton = document.getElementById('header-button');
let menuItems = document.getElementById('menu-items');
let menuImage1 = document.getElementById('menu_img_1');
let menuImage2 = document.getElementById('menu_img_2');


function viewMenu() {
    if (menuItems.style.display === "block") {
        menuItems.style.display = "none";
    } else {
        menuItems.style.display = "block";
    }
}

const changeImage = () => {
    if (menuImage1.style.display !== "none") {
        menuImage1.style.display = "none";
        menuImage2.style.display = "block";
    } else {
        menuImage1.style.display = "block";
        menuImage2.style.display = "none";
    }
}

headerButton.addEventListener("click", viewMenu);
headerButton.addEventListener('click', changeImage);

window.addEventListener('resize', function() {
    if (window.innerWidth > 999) {
        menuItems.removeAttribute('style');
    }
});

//BUTTON RETURN TO THE TOP

let returnTop = document.getElementById('return-top');

window.addEventListener('scroll', function() {
    returnTop.style.display = (window.scrollY > 20) ? 'block' : 'none';
});

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

returnTop.addEventListener('click', () => {
    setTimeout(scrollToTop, 200);
});




