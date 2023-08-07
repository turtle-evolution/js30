const hero = document.querySelector('.hero');
const title = document.querySelector('h1');
const move = 200; // 200px


function addShadow(e) {

    const { offsetWidth: width, offsetHeight: height } = hero; // width of screen

    let { offsetX: x, offsetY: y } = e; // position where your cursor.

    if (this !== e.target) {
        x = x + e.target.offsetLeft; // offsetLeft position element on the left
        y = y + e.target.offsetTop; // offsetTop position element on the top
    }

    const xMove = Math.round((x / width * move) - (move / 2));
    const yMove = Math.round((y / height * move) - (move / 2));

    title.style.textShadow = `
    ${xMove}px ${yMove}px 0 red,
    ${xMove * -1}px ${yMove}px 0 green,
    ${yMove}px ${xMove * -1}px 0 yellow,
    ${yMove * -1}px ${xMove}px 0 gray`;

}

hero.addEventListener('mousemove', addShadow);