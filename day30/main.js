const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('.btn-group .btn-start');
const btnStop = document.querySelector('.btn-group .btn-stop');
const elementTimeInput = document.querySelector('[name="timeStart"]');
const elementTimeUp = document.querySelector('.time-up');
const elementError = document.querySelector('.error-message span');
let lastHole;
let timeUp = false;
let score = 0;
let countdown;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if(hole === lastHole) {
    console.log("the same hole");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;

}


function peep() {
  const hole = randomHole(holes);
  const time = randomTime(200, 1000);

  setTimeout(() => {
    hole.classList.remove('up');
    if(!timeUp) peep();
  },time);


  hole.classList.add('up');
}

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds); // init display


  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  elementTimeUp.textContent = display;

}

function startGame() {
 
  let timeInput = elementTimeInput?.value || 10;

  if(timeInput > 3540) {
    elementError.textContent = 'Please input a number that is less than 3540';
    return;
  }
  

  elementError.textContent = '';
  btnStart.textContent = 'Playing...';
  elementTimeInput.setAttribute("disabled", "");
  btnStart.setAttribute("disabled", "");

  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();

  timer(timeInput);

  setTimeout(() => {
    stopGame();
  }, Number(timeInput) * 1000); // stop game
}

function stopGame() {
  timeUp = true;
  elementTimeInput.removeAttribute("disabled", "");
  btnStart.removeAttribute("disabled", "");
  btnStart.textContent = 'Start!';
  elementTimeUp.textContent = '00:00';
  timer(0);
}

function countPoint(e) {
  if(!e.isTrusted) return;
  score++;

  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', countPoint))