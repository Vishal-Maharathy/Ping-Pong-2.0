import Ball from './Ball.js';
import Paddle from './paddle.js';

const ball = new Ball(document.getElementById('ball'))
const playerPaddle = new Paddle(document.getElementById('player-paddle'))
const computerPaddle = new Paddle(document.getElementById('computer-paddle'))
const playerScore = document.getElementById('player-score')
const computerScore = document.getElementById('computer-score')

console.log(ball);
console.log(document.getElementById('ball'));
//This getComputedStyle(document.getElementById('ball')) will give you all the css 
// properties of the element 'ball' created in .css file. Code Below commented
// console.log(getComputedStyle(document.getElementById('ball')).getPropertyValue('specify which value'));

let lastTime;
function update(time){
    if(lastTime!=null){
        const delta = time - lastTime;
        ball.update(delta, playerPaddle.rect(), computerPaddle.rect());

        computerPaddle.update(delta, ball.y)

        if(isLose()){
            handleLose();
        }
    }
    lastTime = time;
    window.requestAnimationFrame(update)
}
//comment below code to pause game
window.requestAnimationFrame(update)

//MOVE PADDLE WITH Up-Down
document.addEventListener('keydown', function(key_press){
    // console.log(key_press, "bruh")
    console.log('keyPressed')
    if(key_press.key==='ArrowUp'){
        if(playerPaddle.rect().top<=0){
            playerPaddle.position +=0;

        }else{
            playerPaddle.position -=10;
            console.log('up')
        }
        
    }
    if(key_press.key==='ArrowDown'){
        if(playerPaddle.rect().bottom>=window.innerHeight){
            playerPaddle.position +=0;

        }else{
            playerPaddle.position +=10;
        }
        
    }
})
//MOVE PADDLE WITH MOUSE
var mousePrev=null;
document.addEventListener('mousemove', function(mouseMove){
    playerPaddle.position = (mouseMove.clientY/window.innerHeight)*100
})


function isLose(){
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <=0;
}

function handleLose(){
    const rect = ball.rect();
    if(rect.right>=window.innerWidth){
        playerScore.textContent = parseInt(playerScore.textContent)+1;
    }
    if(rect.left<=0){
        computerScore.textContent = parseInt(computerScore.textContent)+1;
    }
    computerPaddle.reset();
    ball.reset();
}