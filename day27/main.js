const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;
const inputNumber = document.querySelector('input');

function itemSlider(e) {
    const number = inputNumber.value || 1;

    if(!isDown) return; //stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * number;

    slider.scrollLeft = scrollLeft - walk;
}

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
})

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
})

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
})

slider.addEventListener('mousemove', itemSlider);
