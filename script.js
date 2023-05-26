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

//--------------------CURRENCY EXCHANGE---------------------------------------------

const currencySelect = document.getElementById('currency-select');
const costBasic = document.getElementById('cost-basic');
const costProfessional = document.getElementById('cost-professional');
const costPremium = document.getElementById('cost-premium');

let eur_eur, eur_usd, eur_gbp;

//OBTENEMOS LOS VALORES DE LAS MONEDAS
const exchange = async () => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`);
        const data = await response.json();

        eur_eur = data.eur.eur;
        eur_usd = data.eur.usd;
        eur_gbp = data.eur.gbp;

        updatePlan();

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
};

 //ACTUALIZAMOS PLANES

    const updatePlan = async () => {
        const selectedCurrency = currencySelect.value;

    if (selectedCurrency === 'EUR') {
        costBasic.innerHTML = `${(0 * eur_eur).toFixed(0)} ${selectedCurrency}`;
        costProfessional.innerHTML = `${(25 * eur_eur).toFixed(0)} ${selectedCurrency}`;
        costPremium.innerHTML = `${(60 * eur_eur).toFixed(0)} ${selectedCurrency}`;

        } else if (selectedCurrency === 'USD') {
            costBasic.innerHTML = `${(0 * eur_usd).toFixed(0)} ${selectedCurrency}`;
            costProfessional.innerHTML = `${(25 * eur_usd).toFixed(0)} ${selectedCurrency}`;
            costPremium.innerHTML = `${(60 * eur_usd).toFixed(0)} ${selectedCurrency}`;
            
            } else if (selectedCurrency === 'GBP') {
                costBasic.innerHTML = `${(0 * eur_gbp).toFixed(0)} ${selectedCurrency}`;
                costProfessional.innerHTML = `${(25 * eur_gbp).toFixed(0)} ${selectedCurrency}`;
                costPremium.innerHTML = `${(60 * eur_gbp).toFixed(0)} ${selectedCurrency}`;
            }
};

currencySelect.addEventListener('change', updatePlan);
exchange();

//--------------------SLIDER----------------------------

class Slider {
    constructor(id) {
        this.slider = document.getElementById(id);
        this.slides = Array.from(this.slider.getElementsByTagName('img'));
        this.totalSlides = this.slides.length;
        this.currentSlide = 0;
        this.intervalId = null;
        this.showSlide(this.currentSlide);
        this.addEventListeners();
        this.autoSlide();
    }

//MOSTRAR Y OCULTAR IMAGENES
    showSlide(i) {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        });
        this.slides[i].style.display = 'block';
    }

    nextSlide() {
        this.currentSlide++;
        if (this.currentSlide === this.totalSlides) {
            this.currentSlide = 0;
        }
        this.showSlide(this.currentSlide);
        this.activePoints();
    }

    prevSlide() {
        this.currentSlide--;
        if (this.currentSlide < 0) {
        this.currentSlide = this.totalSlides - 1;
    }
        this.showSlide(this.currentSlide);
        this.activePoints();
    }

//PUNTOS
        activePoints() {
            const points = this.slider.querySelectorAll('.points');

            points.forEach((points, i) => {
            if (i === this.currentSlide) {
                points.classList.add('active');
            } else {
            points.classList.remove('active');
            }
        });
    }

    addEventListeners() {
        const prevBtn = this.slider.querySelector('.prev-btn');
        prevBtn.addEventListener('click', () => this.prevSlide());

        const nextBtn = this.slider.querySelector('.next-btn');
        nextBtn.addEventListener('click', () => this.nextSlide());

        const dots = Array.from(this.slider.getElementsByClassName('dot'));
        dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            this.currentSlide = i;
            this.showSlide(this.currentSlide);
            this.activePoints();
        });
    });
    }

//AVANCE AUTOMATICO
    autoSlide() {
        setInterval(() => {
        this.nextSlide();
        }, 5000);
    }
}

const slider = new Slider('slider');
