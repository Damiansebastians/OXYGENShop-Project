
const percentage = document.getElementById('percentage-scroller');

const update = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrolled = (scrollTop / (fullHeight - windowHeight)) * 100;

    percentage.style.width = `${scrolled}%`;

    if (scrolled >= 100) {
        percentage.classList.add('completed');
    } else {
        percentage.classList.remove('completed');
    }
};

window.addEventListener('scroll', update);
