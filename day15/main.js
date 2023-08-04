const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items =  JSON.parse(localStorage.getItem('foods')) || [];

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: true
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('foods', JSON.stringify(items));
    this.reset();
    console.table(items);
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((item, idx) => {
        return `
            <li>
                <input id="item${idx}" type="checkbox" data-index="${idx}" ${item.done ? 'checked' : ''} />
                <label for="item${idx}">${item.text}</label>
            </li>
        `;
    }).join('');
}

populateList(items, itemsList);


const checkboxes = document.querySelectorAll('input[type=checkbox]');

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem('foods', JSON.stringify(items));
        populateList(items, itemsList);
    })
})


addItems.addEventListener('submit', addItem)