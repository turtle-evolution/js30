const pressed = [];
const secretCode = 'turtle';

window.addEventListener('keyup', function(e) {

    pressed.push(e.key);

    pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);

    if(pressed.join('').includes(secretCode)) {
        console.log("DING DONG");
        cornify_add();
    }

})