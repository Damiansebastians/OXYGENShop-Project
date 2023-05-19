// Menu Mobile

let headerButton = document.getElementById('header-button');
let menuItems = document.getElementById('menu-items');
let menuImage1 = document.getElementById('menu_image1');
let menuImage2 = document.getElementById('menu_image2');


function viewMenu() {
    if (menuItems.style.display === "block") {
        menuItems.style.display = "none";
        menuImage1.style.display = 'none';
        menuImage2.style.display = 'block';
    } else {
        menuItems.style.display = "block";
        menuImage1.style.display = 'none';
        menuImage2.style.display = 'block';
    }
}

headerButton.addEventListener("click", viewMenu);

