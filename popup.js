//POPUP - MODAL

let isModalClosed = localStorage.getItem('modalClosed') === 'true';
let isModalShown = false;

document.addEventListener('DOMContentLoaded', () => {
    let modal = document.getElementById('modal');
    let closeBtn = document.getElementById('close-btn');
    let emailInput = document.getElementById('email-input');
    let subscribeBtn = document.getElementById('subscribe-btn');

//MOSTRAMOS EL MODAL
const showModal = () => {
    modal.style.display = 'block';
    };

//OCULTAMOS EL MODAL
const hideModal = () => {
    modal.style.display = 'none';
    };

//MOSTRAR EL MODAL AL CABO DE 5 SEGUNDOS
const showModalWithDelay = () => {
    if (isModalClosed !== true && isModalShown !== true) {
        setTimeout(showModal, 5000);
    }
};


//MOSTRAR EL MODAL CUANDO SE BAJA UN 25% DE SCROLL
const showModalOnScroll = () => {
    let scrollPosition = window.innerHeight + window.pageYOffset;
    let scrollPercentage = (scrollPosition / document.documentElement.scrollHeight) * 100;
    
    if (scrollPercentage >= 25 && isModalClosed !== true && isModalShown !== true) {
            showModal();
            window.removeEventListener('scroll', showModalOnScroll);
    }
};

showModalWithDelay();
window.addEventListener('scroll', showModalOnScroll);





    let subscribe = () => {
      //let email = emailInput.value;

      // Validar la dirección de correo (puedes usar una expresión regular o una API)

      // Enviar el email al servidor (puedes usar AJAX o Fetch API)

      // Ocultar el modal y guardar la información en localStorage
      hideModal();
      localStorage.setItem('subscribed', 'true');
    };
  
    closeBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        hideModal();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        hideModal();
      }
    });
    subscribeBtn.addEventListener('click', subscribe);


});