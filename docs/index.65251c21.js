const $5115bcf1ae0af497$var$STAR_LENGTH_MIN = 1;
const $5115bcf1ae0af497$var$STAR_LENGTH_MAX = 20;
const $5115bcf1ae0af497$var$STAR_SIZE = 1;
const $5115bcf1ae0af497$var$COLORS = [
    "#fff",
    "#ccf",
    "#aaf",
    "#ddf"
];
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
        const randomX = Math.random() * 2 - 1;
        const randomY = Math.random() * 2 - 1;
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
        this.length = $5115bcf1ae0af497$var$randomRange($5115bcf1ae0af497$var$STAR_LENGTH_MIN, $5115bcf1ae0af497$var$STAR_LENGTH_MAX);
        this.color = $5115bcf1ae0af497$var$randomItem($5115bcf1ae0af497$var$COLORS);
    }
    move(deltaT, speed) {
        this.x += this.directionX * deltaT * speed;
        this.y += this.directionY * deltaT * speed;
    }
    draw(context, canvas, speed) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const renderX = this.x * centerX + centerX;
        const renderY = this.y * centerY + centerY;
        const distanceToOrigin = Math.sqrt(this.x * this.x + this.y * this.y);
        const x2 = this.x + this.x * Math.min((this.length + distanceToOrigin) / distanceToOrigin, 1) * speed;
        const y2 = this.y + this.y * Math.min((this.length + distanceToOrigin) / distanceToOrigin, 1) * speed;
        // console.log({ x1: this.x, y1: this.y, x2, y2 });
        if (this.x > 1 || this.x < -1 || this.y > 1 || this.y < -1) {
            this.init({
                startAtOrigin: true
            });
            return;
        }
        const renderX2 = x2 * centerX + centerX;
        const renderY2 = y2 * centerY + centerY;
        context.beginPath();
        context.moveTo(renderX, renderY);
        context.lineTo(renderX2, renderY2);
        context.strokeStyle = this.color;
        context.lineWidth = this.length * $5115bcf1ae0af497$var$STAR_SIZE * distanceToOrigin;
        context.lineCap = "round";
        context.stroke();
    }
    constructor(){
        this.init();
    }
}


const $17a7190886fee4ea$var$STAR_COUNT = 500;
const $17a7190886fee4ea$var$SPEED = 0.0008;
const $17a7190886fee4ea$var$ACCELERATION = 0.4;
class $17a7190886fee4ea$export$a4ab8c6fce437889 {
    init() {
        this.stars = Array.from({
            length: $17a7190886fee4ea$var$STAR_COUNT
        }).map(()=>new (0, $5115bcf1ae0af497$export$1644ba17714857f1)());
        requestAnimationFrame(this.update.bind(this));
    }
    update(currMS) {
        if (this.prevMS === 0) this.prevMS = currMS;
        const deltaT = currMS - this.prevMS;
        this.prevMS = currMS;
        // Time in seconds
        this.elapsedT += deltaT / 1000;
        this.speed = -Math.cos(this.elapsedT * $17a7190886fee4ea$var$ACCELERATION) + 1;
        this.stars.forEach((star)=>star.move(deltaT, $17a7190886fee4ea$var$SPEED * this.speed));
        this.draw();
        if (this.elapsedT > 5 && this.speed <= 0.001) return;
        requestAnimationFrame(this.update.bind(this));
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars.forEach((star)=>star.draw(this.context, this.canvas, this.speed));
    }
    constructor(canvas){
        this.stars = [];
        this.prevMS = 0;
        this.speed = 0;
        this.elapsedT = 0;
        if (!canvas) throw new Error("Canvas cannot be null");
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context cannot be null or undefined");
        this.context = context;
    }
}


// DOM elements
const $35d6c5b58b8fcd66$var$canvas = document.querySelector("canvas.cave-generator");
const $35d6c5b58b8fcd66$var$lightSpeed = new (0, $17a7190886fee4ea$export$a4ab8c6fce437889)($35d6c5b58b8fcd66$var$canvas);
$35d6c5b58b8fcd66$var$lightSpeed.init();


//# sourceMappingURL=index.65251c21.js.map
