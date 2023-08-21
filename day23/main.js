const msg = new SpeechSynthesisUtterance();
let listVoices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

msg.text = document.querySelector('[name="text"]').value;

function polulateVoices() {
    listVoices = this.getVoices(); 

    voicesDropdown.innerHTML = listVoices
    .filter(voice => voice.lang.includes("en"))
    .map(voice => `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`).join('');
}

function setVoice() {
    msg.voice = listVoices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver)
        speechSynthesis.speak(msg);
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}


speechSynthesis.addEventListener('voiceschanged', polulateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle.bind(null, false));
