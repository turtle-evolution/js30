const timeNodes = Array.from(document.querySelectorAll('li')); // convert NodeList to Array
const ulElement = document.querySelector('ul');
const totalTime = document.createElement('div');
totalTime.classList.add('total-times');


ulElement.insertAdjacentElement('afterend', totalTime);


document.querySelectorAll('li').forEach(item => item.innerHTML = `${item.textContent} - ${item.dataset.time}`);

const totalSeconds = timeNodes.map(item => item.dataset.time)
                        .map(timeSecond => {
                            const [mins, second] = timeSecond.split(':').map(parseFloat);
                            return (mins* 60) + second;
                        }).reduce((total, videoSecond) => total + videoSecond); // total seconds

// Caculator times of video

const hours = Math.floor(totalSeconds / 3600);
const remainHours = totalSeconds % 3600;

const minutes = Math.floor(remainHours / 60);
const remainMinutes = remainHours % 60;

const seconds = Math.floor(remainMinutes / 60);


totalTime.textContent = `Total times: ${hours} : ${minutes} : ${seconds > 10 ? seconds : `0${seconds}`}`;
