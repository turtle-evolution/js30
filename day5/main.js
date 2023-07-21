const panels = document.querySelectorAll('.panel');

function toggleOpen(event) {
	const isOpen = event.target.closest('.panel').classList.contains('open');
	const open = document.querySelector('.open');
	
	if(!isOpen) {
		if(open){
		    open.classList.remove('open', 'open-active');
		}
		this.classList.add('open');
	}
	else {
		open.classList.remove('open', 'open-active');
	}
}

function toggleActive(e) {
	const open = this.classList.contains('open');
	if(e.propertyName.includes('flex') && open) {
		this.classList.add('open-active');
	}

}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));