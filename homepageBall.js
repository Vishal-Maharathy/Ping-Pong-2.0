import Ball from './homepageBallClass.js';

const ball = new Ball(document.getElementById('ball'))

console.log(ball);
console.log(document.getElementById('ball'));

let lastTime;
function update(time){
    if(lastTime!=null){
        const delta = time - lastTime;
        ball.update(delta);
    }
    lastTime = time;
    window.requestAnimationFrame(update)
}
//comment below code to pause game
window.requestAnimationFrame(update)
