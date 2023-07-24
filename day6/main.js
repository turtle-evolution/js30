const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint)
.then(blod => blod.json())
.then(data => cities.push(...data));

function findCities(wordToMatch) {

	const checkWord = wordToMatch.replace(/\\/g, "\\\\");
	return cities.filter(place => {
		// here we need to figure out if the city or state matches what was searched
		const regex = new RegExp(checkWord, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	});
}

function numberWithCommas(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function htmlCities(arrCities, inputSearch) {
	const html = arrCities.map(place => {

		// const stringPlace = `${place.city}, ${place.state}`.toLowerCase();
		// const arrString = stringPlace.split(inputSearch) ;

		// const hightlight = arrString.map(item => {
		// 	let pStr = item;
		// 	if(item === '') pStr = `<span class="hl">${inputSearch}</span>`
		// 	return pStr;
		// }).join("");

		const regex = new RegExp(inputSearch, 'gi');
		const cityName = place.city.replace(regex, `<span class="hl">${inputSearch}</span>`);
		const stateName = place.state.replace(regex, `<span class="hl">${inputSearch}</span>`);

		return `
			<li> 
			  <span class="city"> ${cityName}, ${stateName}</span>
			  <span class="population">${numberWithCommas(place.population)}</span>
			</li>
		`;
	}).join("");	

	return html;
}

function displayContents() {

	const inputSearch = this.value.toLowerCase();
	const rsCities = findCities(inputSearch);

	
	rsCities.sort((placeA, placeB) => {
		return (Number(placeA.population) > Number(placeB.population)) ? 1 : -1; // 1 ASC, -1 DESC
	});

	suggestions.innerHTML = rsCities.length > 0 ? htmlCities(rsCities, inputSearch) : `<li>City not found</li>`;	
	
}

searchInput.addEventListener('keyup', displayContents);