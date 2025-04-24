const $cbc4508c509700da$export$4e0790bf022c0809 = 0.01;
const $cbc4508c509700da$export$cc060c12b7723909 = 0.005;
const $cbc4508c509700da$export$56d196d2844d1ca1 = [
    "255,255,255",
    "204,204,255",
    "170,170,255",
    "221,221,255"
];
const $cbc4508c509700da$export$a4f7a4738f71c8f = 60;
const $cbc4508c509700da$export$3598e87e137c187d = 10;
const $cbc4508c509700da$export$5c94342e0ba805ef = 1;
const $cbc4508c509700da$export$90ae584466fb6a1b = 0.002;
const $cbc4508c509700da$export$b8cd16f34ed5d06a = 2000;
const $cbc4508c509700da$export$bb9d82560b5a45d1 = 10;
const $cbc4508c509700da$export$7bdd7d63613005f6 = 2;
const $cbc4508c509700da$export$ef3f3db0dc60daf2 = 1000;


const $5115bcf1ae0af497$var$randomRange = (min, max)=>Math.random() * (max - min) + min;
class $5115bcf1ae0af497$export$1644ba17714857f1 {
    init({ startAtOrigin: startAtOrigin = false } = {}) {
        this.angle = $5115bcf1ae0af497$var$randomRange(0, Math.PI * 2);
        if (startAtOrigin) this.z = $5115bcf1ae0af497$var$randomRange((0, $cbc4508c509700da$export$bb9d82560b5a45d1), (0, $cbc4508c509700da$export$bb9d82560b5a45d1) + (0, $cbc4508c509700da$export$7bdd7d63613005f6));
        else this.z = $5115bcf1ae0af497$var$randomRange(0, (0, $cbc4508c509700da$export$bb9d82560b5a45d1));
        // Try again if we started out of bounds
        if (this.isOutOfBounds) return this.init({
            startAtOrigin: startAtOrigin
        });
        this.length = $5115bcf1ae0af497$var$randomRange((0, $cbc4508c509700da$export$3598e87e137c187d), (0, $cbc4508c509700da$export$a4f7a4738f71c8f));
    }
    get x() {
        return Math.cos(this.angle) / this.z;
    }
    get y() {
        return Math.sin(this.angle) / this.z;
    }
    get isOutOfBounds() {
        return this.z < 0.01;
    }
    get distanceToOrigin() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    move(deltaT, speed) {
        this.z -= deltaT * speed;
        // If we're out of bounds, restart at the origin
        if (this.isOutOfBounds) this.init({
            startAtOrigin: true
        });
    }
    draw(context, speed, centerX, centerY) {
        // Don't draw if off-screen
        if (this.isOutOfBounds) return;
        const currentLength = Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) * (speed - (0, $cbc4508c509700da$export$4e0790bf022c0809));
        const z2 = this.z + currentLength;
        const renderX = this.x / this.z * (0, $cbc4508c509700da$export$ef3f3db0dc60daf2) + centerX;
        const renderY = this.y / this.z * (0, $cbc4508c509700da$export$ef3f3db0dc60daf2) + centerY;
        const renderX2 = this.x / z2 * (0, $cbc4508c509700da$export$ef3f3db0dc60daf2) + centerX;
        const renderY2 = this.y / z2 * (0, $cbc4508c509700da$export$ef3f3db0dc60daf2) + centerY;
        context.moveTo(renderX, renderY);
        context.lineTo(renderX2, renderY2);
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
            length: this.starCount
        }).map(()=>new (0, $5115bcf1ae0af497$export$1644ba17714857f1)());
        // Bind the update method once instead of on every frame
        this.boundUpdate = this.update.bind(this);
        requestAnimationFrame(this.boundUpdate);
    }
    onInitOrResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;
        this.centerX = width / 2;
        this.centerY = height / 2;
        const radius = Math.sqrt(this.centerX * this.centerX + this.centerY * this.centerY);
        this.canvas.width = width;
        this.canvas.height = height;
        this.gradients = (0, $cbc4508c509700da$export$56d196d2844d1ca1).map((color)=>{
            const gradient = this.context.createRadialGradient(this.centerX, this.centerY, 0, this.centerX, this.centerY, radius);
            gradient.addColorStop(0.02, `rgba(${color}, 0)`);
            gradient.addColorStop(0.45, `rgba(${color}, 1)`);
            return gradient;
        });
    }
    get speed() {
        if (this.userPrefersReducedMotion) return 0, $cbc4508c509700da$export$4e0790bf022c0809;
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
        this.elapsedT = currMS / 1000;
        this.frames++;
        for(let i = 0; i < this.stars.length; i++)this.stars[i].move(deltaT, (0, $cbc4508c509700da$export$cc060c12b7723909) * this.speed);
        this.draw();
        requestAnimationFrame(this.boundUpdate);
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.globalCompositeOperation = "color-dodge";
        this.context.lineCap = "round";
        for(let i = 0; i < this.gradients.length; i++){
            this.context.beginPath();
            this.context.strokeStyle = this.gradients[i];
            const mobileFactor = this.canvas.width < 668 ? 0.5 : 1;
            this.context.lineWidth = (0, $cbc4508c509700da$export$5c94342e0ba805ef) * (i + 1) * mobileFactor;
            for(let j = i; j < this.stars.length; j += this.gradients.length)this.stars[j].draw(this.context, this.speed, this.centerX, this.centerY);
            this.context.stroke();
        }
        if (!this.isDebugMode) return;
        this.context.globalCompositeOperation = "source-over";
        this.context.fillStyle = "#000d";
        this.context.beginPath();
        this.context.rect(0, 0, 260, 36);
        this.context.fill();
        this.context.font = "16px monospace";
        this.context.fillStyle = "#fff";
        this.context.fillText(`${this.starCount} stars at ${this.fps} fps`, 16, 24);
    }
    constructor(canvas, userPrefersReducedMotion){
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
        this.userPrefersReducedMotion = userPrefersReducedMotion;
        // Initialize canvas size
        this.onInitOrResize();
        // Keep canvas size in sync with window size
        window.addEventListener("resize", this.onInitOrResize.bind(this));
        // Initial star count is based on canvas size,
        // but this won't change on resize to avoid stars jumping around
        this.starCount = Math.max(Math.floor(this.canvas.width * this.canvas.height * (0, $cbc4508c509700da$export$90ae584466fb6a1b)), (0, $cbc4508c509700da$export$b8cd16f34ed5d06a));
        this.isDebugMode = location.search.includes("debug");
    }
}


const $35d6c5b58b8fcd66$var$canvas = document.querySelector("canvas");
const $35d6c5b58b8fcd66$var$userPrefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
const $35d6c5b58b8fcd66$var$lightSpeed = new (0, $17a7190886fee4ea$export$a4ab8c6fce437889)($35d6c5b58b8fcd66$var$canvas, $35d6c5b58b8fcd66$var$userPrefersReducedMotion);
$35d6c5b58b8fcd66$var$lightSpeed.init();


//# sourceMappingURL=index.827104ce.js.map
