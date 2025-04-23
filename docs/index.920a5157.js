const $cbc4508c509700da$export$56d196d2844d1ca1 = [
    "255,255,255",
    "204,204,255",
    "170,170,255",
    "221,221,255"
];
const $cbc4508c509700da$export$4cd1d083c92690a2 = 0;
const $cbc4508c509700da$export$4e0790bf022c0809 = 0.01;
const $cbc4508c509700da$export$cc060c12b7723909 = 0.0005;
const $cbc4508c509700da$export$fc6599c381dbc8c3 = 100000; // Math.max(100, Math.min(window.innerWidth - 300, 500));
const $cbc4508c509700da$export$a4f7a4738f71c8f = 60;
const $cbc4508c509700da$export$3598e87e137c187d = 10;
const $cbc4508c509700da$export$63fda4b46ea7a696 = 0.04;
const $cbc4508c509700da$export$5c94342e0ba805ef = 1;
const $cbc4508c509700da$export$90ae584466fb6a1b = 0.002;
const $cbc4508c509700da$export$b8cd16f34ed5d06a = 2000;
const $cbc4508c509700da$export$e887007d13f573bf = 1000 / $cbc4508c509700da$export$cc060c12b7723909; // ms


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
        this.length = $5115bcf1ae0af497$var$randomRange((0, $cbc4508c509700da$export$3598e87e137c187d), (0, $cbc4508c509700da$export$a4f7a4738f71c8f));
    }
    get isOutOfBounds() {
        return this.x > 1.1 || this.x < -1.1 || this.y > 1.1 || this.y < -1.1;
    }
    get distanceToOrigin() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    move(deltaT, speed) {
        // Skip if respawning
        if (this.isRespawning) return;
        // Calcuate once, then use it for both x and y
        const magnitude = deltaT * speed * Math.pow(this.distanceToOrigin + 1, 3);
        this.x += this.directionX * magnitude;
        this.y += this.directionY * magnitude;
        if (this.isOutOfBounds) {
            this.isRespawning = true;
            const delay = Math.floor(Math.random() * (0, $cbc4508c509700da$export$e887007d13f573bf) * speed);
            // Respawn at origin after a random delay
            setTimeout(()=>{
                this.isRespawning = false;
                this.init({
                    startAtOrigin: true
                });
            }, delay);
        }
    }
    draw(context, speed, centerX, centerY) {
        // Don't draw if off-screen
        if (this.isOutOfBounds) return;
        // Calculate once, then use for both x and y
        const currentLength = Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) * (speed - (0, $cbc4508c509700da$export$4e0790bf022c0809));
        const x2 = this.x + this.x * currentLength;
        const y2 = this.y + this.y * currentLength;
        const renderX = this.x * centerX + centerX;
        const renderY = this.y * centerY + centerY;
        const renderX2 = x2 * centerX + centerX;
        const renderY2 = y2 * centerY + centerY;
        context.moveTo(renderX, renderY);
        context.lineTo(renderX2, renderY2);
    }
    constructor(gradients){
        this.isRespawning = false;
        this.color = $5115bcf1ae0af497$var$randomItem(gradients);
        this.init();
    }
}



function $17a7190886fee4ea$var$easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
class $17a7190886fee4ea$export$a4ab8c6fce437889 {
    init() {
        this.stars = Array.from({
            length: this.starCount
        }).map(()=>new (0, $5115bcf1ae0af497$export$1644ba17714857f1)(this.gradients));
        // Bind the update method once instead of on every frame
        this.boundUpdate = this.update.bind(this);
        requestAnimationFrame(this.boundUpdate);
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
    get fps() {
        if (this.elapsedT <= 0) return 0;
        return Math.round(this.frames / this.elapsedT);
    }
    update(currMS) {
        if (this.prevMS === 0) this.prevMS = currMS;
        const deltaT = currMS - this.prevMS;
        this.prevMS = currMS;
        // Time in seconds
        this.elapsedT += deltaT / 1000;
        this.frames++;
        for(let i = 0; i < this.stars.length; i++)this.stars[i].move(deltaT, (0, $cbc4508c509700da$export$cc060c12b7723909) * this.speed);
        this.draw();
        requestAnimationFrame(this.boundUpdate);
    }
    draw() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.globalCompositeOperation = "color-dodge";
        this.context.lineCap = "round";
        for(let i = 0; i < this.gradients.length; i++){
            this.context.beginPath();
            this.context.strokeStyle = this.gradients[i];
            const mobileFactor = this.canvas.width < 668 ? 0.5 : 1;
            this.context.lineWidth = (0, $cbc4508c509700da$export$5c94342e0ba805ef) * (i + 1) * mobileFactor;
            for(let j = i; j < this.stars.length; j += this.gradients.length)this.stars[j].draw(this.context, this.speed, centerX, centerY);
            this.context.stroke();
        }
        if (!this.isDebugMode) return;
        this.context.globalCompositeOperation = "source-over";
        this.context.fillStyle = "#000d";
        this.context.beginPath();
        this.context.rect(0, 0, 300, 70);
        this.context.fill();
        this.context.font = "20px monospace";
        this.context.fillStyle = "#fff";
        this.context.fillText(`${this.starCount} stars at ${this.fps} fps`, 20, 40);
    }
    constructor(canvas){
        this.stars = [];
        this.prevMS = 0;
        this.elapsedT = 0;
        this.frames = 0;
        this.isDebugMode = false;
        if (!canvas) throw new Error("Canvas cannot be null");
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Canvas context cannot be null or undefined");
        this.context = context;
        this.starCount = Math.max(Math.floor(this.canvas.width * this.canvas.height * (0, $cbc4508c509700da$export$90ae584466fb6a1b)), (0, $cbc4508c509700da$export$b8cd16f34ed5d06a));
        const radius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        this.gradients = (0, $cbc4508c509700da$export$56d196d2844d1ca1).map((color)=>{
            const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, radius);
            gradient.addColorStop(0.01, `rgba(${color}, ${(0, $cbc4508c509700da$export$4cd1d083c92690a2)})`);
            gradient.addColorStop(0.4, `rgba(${color}, 1)`);
            return gradient;
        });
        this.isDebugMode = location.search.includes("debug");
    }
}


const $35d6c5b58b8fcd66$var$canvas = document.querySelector("canvas");
const $35d6c5b58b8fcd66$var$setCanvasSize = ()=>{
    if ($35d6c5b58b8fcd66$var$canvas) {
        $35d6c5b58b8fcd66$var$canvas.width = $35d6c5b58b8fcd66$var$canvas.clientWidth;
        $35d6c5b58b8fcd66$var$canvas.height = $35d6c5b58b8fcd66$var$canvas.clientHeight;
    }
};
$35d6c5b58b8fcd66$var$setCanvasSize();
const $35d6c5b58b8fcd66$var$lightSpeed = new (0, $17a7190886fee4ea$export$a4ab8c6fce437889)($35d6c5b58b8fcd66$var$canvas);
$35d6c5b58b8fcd66$var$lightSpeed.init();
// Keep canvas size in sync with window size
window.addEventListener("resize", $35d6c5b58b8fcd66$var$setCanvasSize);


//# sourceMappingURL=index.920a5157.js.map
