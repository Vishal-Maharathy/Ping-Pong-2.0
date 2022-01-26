const INITIAL_VELOCITY = .025;
const VELOCITY_INCREASE = 0.000001

const homeBox = document.getElementById('box');
const homeBoxDimensions = homeBox.getBoundingClientRect();

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }

    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    get x() {
        //here we are taking the css property "--x" and returning it
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x'));
    }
    set x(value) {
        this.ballElem.style.setProperty('--x', value);
    }
    get y() {
        //here we are taking the css property "--x" and returning it
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y'));
    }
    set y(value) {
        this.ballElem.style.setProperty('--y', value);
    }

    //to give horizontal direction to the ball, if the launch angle is more towards vertical, then the ball will hit the paddle with lesser frequency
    reset() {
        this.x = 74;
        this.y = 73;
        this.direction = { k: 0 }
        while (Math.abs(this.direction.k) <= 0.4 || Math.abs(this.direction.k) >= 0.8) {
            const heading = randomNumber(0, 2 * Math.PI);
            this.direction = { k: Math.cos(heading), y: Math.sin(heading) }
        }
        this.velocity = INITIAL_VELOCITY;
    }
    
    update(delta) {
        this.x += this.direction.k * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        this.velocity += VELOCITY_INCREASE * delta;
        const rect = this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1;
        }
        if (rect.right >= window.innerWidth || rect.left <= 0) {
            this.direction.k *= -1;
        }
        if (rect.top <= homeBoxDimensions.bottom && rect.left >= homeBoxDimensions.left && rect.right <= homeBoxDimensions.right) {
            this.direction.y *= -1;
        }
        if (rect.bottom <= homeBoxDimensions.top && rect.left >= homeBoxDimensions.left && rect.right <= homeBoxDimensions.right) {
            this.direction.y *= -1;
        }
        if (rect.left <= homeBoxDimensions.right && rect.bottom < homeBoxDimensions.bottom && rect.top > homeBoxDimensions.top && rect.right && rect.right>=homeBoxDimensions.right) {
            this.direction.k *= -1;
        }
        if (rect.right >= homeBoxDimensions.left && rect.bottom < homeBoxDimensions.bottom && rect.top > homeBoxDimensions.top && rect.right<=homeBoxDimensions.right) {
            this.direction.k *= -1;
        }
    }
}
function randomNumber(min, max) {
    return Math.random() * (max - min);
}