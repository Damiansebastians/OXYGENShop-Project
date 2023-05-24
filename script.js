//----------------------MENU MOBILE---------------------------

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

//-----------------BUTTON RETURN TO THE TOP--------------------------

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

// -----------------------FORM------------------------------------

document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById("myForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const checkbox = document.getElementById("consent").checked;

// VALIDACION
let isValid = true;

        if (name.length < 2 || name.length > 100) {
            document.getElementById("name").style.borderColor = "red";
            isValid = false;
            }

        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            if (!emailRegex.test(email)) {
                document.getElementById("email").style.borderColor = "red";
                isValid = false;
            }

        if (!checkbox) {
            document.getElementById("consent").style.borderColor = "red";
            isValid = false;
            }   

// ENVIO DE DATOS
if (isValid) {
    sendDataToServer({ name, email, checkbox });
}
});

const sendDataToServer = async (data) => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    body: JSON.stringify(data)
});
    if (response.ok) {
        const json = await response.json();
        console.log(json);

    // MENSAJE DE ENVIO
            form.style.display = "none";
            const message = document.getElementById("message");
            message.style.display = "block";
        } else {
            console.error("Error send the form:", response.status);
        }
    } catch (error) {
        console.error("Error send the form:", error);
    }
    };
});


