let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
const buttonsTime = document.querySelectorAll('[data-time]');

function timer(seconds) {

    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds *1000;

    displayTimeLeft(seconds); // init time show
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);
        if(secondLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondLeft);
    },1000);


}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

    document.title = display;
    timerDisplay.textContent = display;

    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    const endTime = new Date(timestamp);

    const minutes = endTime.getMinutes();
    const hours = endTime.getHours();
    const adjustedHour = hours > 12 ? hours - 12 : hours; // ex: 15 => 3

    endTimeDisplay.textContent = `Be back at ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTime() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttonsTime.forEach((button) => button.addEventListener('click', startTime));

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const minutes = e.target.minutes.value;
    timer(minutes * 60);
    e.target.reset();

});