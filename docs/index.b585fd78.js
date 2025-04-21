const $cbc4508c509700da$export$fc6599c381dbc8c3 = 500;
const $cbc4508c509700da$export$cc060c12b7723909 = 0.0005;
const $cbc4508c509700da$export$4e0790bf022c0809 = 0.02;


const $5115bcf1ae0af497$var$MIN_OPACITY = 0.2;
const $5115bcf1ae0af497$var$STAR_LENGTH_MIN = 10;
const $5115bcf1ae0af497$var$STAR_LENGTH_MAX = 60;
const $5115bcf1ae0af497$var$STAR_SIZE = 0.4;
const $5115bcf1ae0af497$var$COLORS = [
    "255,255,255",
    "204,204,255",
    "170,170,255",
    "221,221,255"
];
const $5115bcf1ae0af497$var$lerp = (value, min, max)=>min + value * (max - min);
const $5115bcf1ae0af497$var$randomRange = (min, max)=>Math.random() * (max - min) + min;
const $5115bcf1ae0af497$var$randomItem = (arr)=>arr[Math.floor(Math.random() * arr.length)];
const $5115bcf1ae0af497$var$normalize = (x, y)=>{
    const distanceToOrigin = Math.sqrt(x * x + y * y);
    return {
        x: x / distanceToOrigin,
        y: y / distanceToOrigin
    };
};
class $5115bcf1ae0af497$export$1644ba17714857f1 {
    init({ startAtOrigin: startAtOrigin = false } = {}) {
        const randomRadius = Math.random() * Math.sqrt(2);
        const randomAngle = Math.random() * Math.PI * 2;
        const randomX = randomRadius * Math.cos(randomAngle);
        const randomY = randomRadius * Math.sin(randomAngle);
        const { x: normX, y: normY } = $5115bcf1ae0af497$var$normalize(randomX, randomY);
        this.directionX = normX;
        this.directionY = normY;
        // Position from -1 to 1
        if (startAtOrigin) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = randomX;
            this.y = randomY;
        }
        // Try again if we started out of bounds
        if (this.isOutOfBounds) return this.init({
            startAtOrigin: startAtOrigin
        });
        this.length = $5115bcf1ae0af497$var$randomRange($5115bcf1ae0af497$var$STAR_LENGTH_MIN, $5115bcf1ae0af497$var$STAR_LENGTH_MAX);
        this.color = $5115bcf1ae0af497$var$randomItem($5115bcf1ae0af497$var$COLORS);
    }
    get isOutOfBounds() {
        return this.x > 1.1 || this.x < -1.1 || this.y > 1.1 || this.y < -1.1;
    }
    get distanceToOrigin() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    move(deltaT, speed) {
        this.x += this.directionX * deltaT * speed * Math.pow(this.distanceToOrigin + 1, 2);
        this.y += this.directionY * deltaT * speed * Math.pow(this.distanceToOrigin + 1, 2);
    }
    draw(context, canvas, speed) {
        const x2 = this.x + this.x * Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) * (speed - (0, $cbc4508c509700da$export$4e0790bf022c0809));
        const y2 = this.y + this.y * Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) * (speed - (0, $cbc4508c509700da$export$4e0790bf022c0809));
        if (this.isOutOfBounds) {
            this.init({
                startAtOrigin: true
            });
            return;
        }
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const renderX = this.x * centerX + centerX;
        const renderY = this.y * centerY + centerY;
        const renderX2 = x2 * centerX + centerX;
        const renderY2 = y2 * centerY + centerY;
        const alpha = $5115bcf1ae0af497$var$lerp(this.distanceToOrigin, $5115bcf1ae0af497$var$MIN_OPACITY, 1);
        const alpha2 = $5115bcf1ae0af497$var$lerp(Math.sqrt(x2 * x2 + y2 * y2), $5115bcf1ae0af497$var$MIN_OPACITY, 1);
        const gradient = context.createLinearGradient(renderX, renderY, renderX2, renderY2);
        gradient.addColorStop(0, `rgba(${this.color},${alpha})`);
        gradient.addColorStop(1, `rgba(${this.color},${alpha2})`);
        const isMoving = speed > (0, $cbc4508c509700da$export$4e0790bf022c0809);
        context.beginPath();
        context.moveTo(renderX, renderY);
        context.lineTo(renderX2, renderY2);
        context.strokeStyle = isMoving ? gradient : `rgba(${this.color},${alpha})`;
        context.lineWidth = this.length * $5115bcf1ae0af497$var$STAR_SIZE * this.distanceToOrigin;
        context.lineCap = "round";
        context.stroke();
    }
    constructor(){
        this.init();
    }
}



function $17a7190886fee4ea$var$easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
class $17a7190886fee4ea$export$a4ab8c6fce437889 {
    init() {
        this.stars = Array.from({
            length: (0, $cbc4508c509700da$export$fc6599c381dbc8c3)
        }).map(()=>new (0, $5115bcf1ae0af497$export$1644ba17714857f1)());
        requestAnimationFrame(this.update.bind(this));
    }
    get speed() {
        let relativeT = this.elapsedT;
        // Wait 500ms before starting the animation
        if (relativeT < 0.5) return 0, $cbc4508c509700da$export$4e0790bf022c0809;
        relativeT -= 0.5;
        // 3s of acceleration
        if (relativeT < 3) return (0, $cbc4508c509700da$export$4e0790bf022c0809) + $17a7190886fee4ea$var$easeInOutQuad(relativeT / 3);
        relativeT -= 3;
        // 2s of top speed
        if (relativeT < 3) return 1 + (0, $cbc4508c509700da$export$4e0790bf022c0809);
        relativeT -= 3;
        // 3s of deceleration
        if (relativeT < 3) return 1 + (0, $cbc4508c509700da$export$4e0790bf022c0809) - $17a7190886fee4ea$var$easeInOutQuad(relativeT / 3);
        // Stop
        return 0, $cbc4508c509700da$export$4e0790bf022c0809;
    }
    update(currMS) {
        if (this.prevMS === 0) this.prevMS = currMS;
        const deltaT = currMS - this.prevMS;
        this.prevMS = currMS;
        // Time in seconds
        this.elapsedT += deltaT / 1000;
        this.stars.forEach((star)=>star.move(deltaT, (0, $cbc4508c509700da$export$cc060c12b7723909) * this.speed));
        this.draw();
        requestAnimationFrame(this.update.bind(this));
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars.forEach((star)=>star.draw(this.context, this.canvas, this.speed));
    }
    constructor(canvas){
        this.stars = [];
        this.prevMS = 0;
        this.elapsedT = 0;
        if (!canvas) throw new Error("Canvas cannot be null");
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context cannot be null or undefined");
        this.context = context;
    }
}


// DOM elements
const $35d6c5b58b8fcd66$var$canvas = document.querySelector("canvas");
const $35d6c5b58b8fcd66$var$lightSpeed = new (0, $17a7190886fee4ea$export$a4ab8c6fce437889)($35d6c5b58b8fcd66$var$canvas);
$35d6c5b58b8fcd66$var$lightSpeed.init();


//# sourceMappingURL=index.b585fd78.js.map
