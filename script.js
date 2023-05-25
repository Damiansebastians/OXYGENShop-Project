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




//CURRENCY EXCHANGE

const currencySelect = document.getElementById('currency-select');
const costBasic = document.getElementById('cost-basic');
const costProfessional = document.getElementById('cost-professional');
const costPremium = document.getElementById('cost-premium');

const fetchExchangeRates = async () => {
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`);
        const data = await response.json();

        const eur_eur = data.eur.eur;
        const eur_usd = data.eur.usd;
        const eur_gbp = data.eur.gbp;

      // Mostrar los datos en la consola
        console.log(eur_eur);
        console.log(eur_usd);
        console.log(eur_gbp);

    } catch (error) {
        console.error('Error fetching exchange rates:', error);
    }
};

 //Función para actualizar los precios de los planes según la moneda seleccionada

    const updatePlanPrices = async () => {
        const selectedCurrency = currencySelect.value;

    if (selectedCurrency === 'USD') {
        costBasic.textContent = `${selectedCurrency} ${(0 * eur_usd).toFixed(2)}`;
        costProfessional.innerHTML = `${selectedCurrency} ${(25 * eur_usd).toFixed(2)}`;
        costPremium.innerHTML = `${selectedCurrency} ${(60 * eur_usd).toFixed(2)}`;
        
    } if (selectedCurrency === 'GBP') {
        costBasic.textContent = `${selectedCurrency} ${(0 * eur_gbp).toFixed(2)}`;
        costProfessional.innerHTML = `${selectedCurrency} ${(25 * eur_gbp).toFixed(2)}`;
        costPremium.innerHTML = `${selectedCurrency} ${(60 * eur_gbp).toFixed(2)}`;

        } else {
            costBasic.textContent = `${selectedCurrency} ${(0 * eur_eur).toFixed(2)}`;
            costProfessional.textContent = `${selectedCurrency} ${(25 * eur_eur).toFixed(2)}`;
            costPremium.textContent = `${selectedCurrency} ${(60 * eur_eur).toFixed(2)}`;
        }
    };

// Agregar evento de cambio al select de moneda
currencySelect.addEventListener('change', updatePlanPrices);

// Actualizar los precios de los planes al cargar la página
updatePlanPrices()


