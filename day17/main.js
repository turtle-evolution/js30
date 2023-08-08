const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'We Came as Romans', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here'];

function trip(text) {
    return text.replace(/^(a |an |the )/i, '').trim();
}

const sortBands = bands.sort((a,b) => trip(a) > trip(b) ? 1 : -1);

const htmlBands = document.querySelector('#bands');

htmlBands.innerHTML = sortBands.map((item) => `<li>${item}</li>`).join('');

