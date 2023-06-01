
//POPUP - MODAL
let isModalClosed = localStorage.getItem('modalClosed') === 'true';
let isModalShown = false;

document.addEventListener('DOMContentLoaded', () => {
    let modal = document.getElementById('modal');
    let modalText = document.getElementById('modal-text');
    let closeBtn = document.getElementById('close-btn');
    let emailInput = document.getElementById('email-input');
    let subscribeBtn = document.getElementById('subscribe-btn');
    let subscriptionMessage = document.getElementById('subscriptionMessage');

    //MOSTRAMOS EL MODAL
    const showModal = () => {
        modal.style.display = 'block';
        isModalShown = true;
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

    //CERRAR EL MODAL
    const closeModal = () => {
        hideModal();
        isModalClosed = true;
        localStorage.setItem('modalClosed', 'true');
    };

    //LAS 3 FORMAS DE CERRAR EL MODAL
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    //MENSAJE DE SUSCRIPCIÓN
    const showSuccessMessageAndCloseModal = () => {
        subscriptionMessage.style.display = 'block';
        modalText.style.display = 'none';
        emailInput.style.display = 'none';
        subscribeBtn.style.display = 'none';

        // Guardar la suscripción en el localStorage
        localStorage.setItem('subscribed', 'true');

        setTimeout(() => {
            hideModal();
        }, 2000);
    };

    //SUSCRIPCIÓN
    subscribeBtn.addEventListener('click', async () => {
        //VALIDACIÓN
        const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        const email = emailInput.value;
        let isValid = true;

        if (!emailRegex.test(email)) {
            emailInput.style.borderColor = "red";
            isValid = false;
        }

        //ENVIO DE DATOS
        if (isValid) {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    showSuccessMessageAndCloseModal();
                }

            } catch (error) {
                console.error("Error sending the form:", error);
            }
        }
    });
});
