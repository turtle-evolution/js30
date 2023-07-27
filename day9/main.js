const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
  const p = document.querySelector('p');
  p.style.color = '#BADA55';
  p.style.fontSize = '50px';
}

// Regular
console.log("Hello");

// Interpolated
console.log("I am a Frontend %s", "Developer");

// Styled
console.log("%cI am a Frontend Developer!!!", "color: #f00; font-size: 30px");

// warning!
console.warn("I am a Frontend Developer!!!!");

// Error :|
console.error("I am a Backend Developer!!!");

// Info
console.info("I am a Frontend Developer");

// Testing
const p = document.querySelector('p');
console.assert(p.classList.contains('ouch'), "This is wrong");

// clearing
console.clear();

// Viewing DOM Elements
console.dir(p);

// Grouping together
dogs.forEach((dog, index) => {
  // console.group(`${dog.name}`); // Auto open group
  console.groupCollapsed(`${dog.name}`); // Auto close group
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} ${index} is ${dog.age} years old`);
  console.log(`${dog.name} ${index + 1} is ${dog.age * 7} years old`);
  console.groupEnd(`${dog.name}`);
});

// counting
[...Array(10).keys()].forEach(item => console.count("Counting"));

// timing

console.time("Fetch Data");
fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        console.timeEnd("Fetch Data"); // should be "Fetch Data" same console.time above
      });

