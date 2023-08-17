const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList = 'highlight';
document.body.append(highlight);

function highlightLink() {
    
    linkCoords = this.getBoundingClientRect();
    
    highlight.style.width = `${linkCoords.width}px`;
    highlight.style.height = `${linkCoords.height}px`;
    highlight.style.transform = `translate(${linkCoords.left + window.scrollX}px, ${linkCoords.top + window.scrollY}px)`;

}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));