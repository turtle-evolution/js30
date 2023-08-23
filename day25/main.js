function LogDiv(e) {
    console.log(this.classList.value);
    e.stopPropagation();
}

const divs = document.querySelectorAll('div');
const button = document.querySelector('button');

divs.forEach(div => div.addEventListener('click', LogDiv, {
    capture: false
}));

button.addEventListener('click', () => {
    console.log("button")
}, {
    once: false // false count each click, true only click
})
