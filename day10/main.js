const checboxes = document.querySelectorAll('.inbox input[type="checkbox"]');

let lastChecked;

function handleChecked(e) {

    // Check if they had the shift key down
    // AND check that they are checking it
    let inBetween = false;

    if(e.shiftKey && this.checked) {
        // go ahead and do what we please
        // loop over every single checkbox
        checboxes.forEach(checkbox => {
            if(checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if(inBetween) {
                checkbox.checked = true;
            }
            
        });
    }

    lastChecked = this; // important!!!

}

checboxes.forEach(checkbox => checkbox.addEventListener('click', handleChecked));