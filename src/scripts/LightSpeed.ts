import { Star } from './Star';
import {
  STAR_COUNT,
  SPEED,
  MIN_SPEED,
  COLORS,
  MIN_OPACITY,
  STAR_SIZE,
  STAR_SIZE_PX,
  STARS_PER_PX,
  MIN_STARS,
} from './constants';

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export class LightSpeed {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  stars: Star[] = [];
  prevMS = 0;
  elapsedT = 0;
  gradients: CanvasGradient[];
  frames = 0;
  isDebugMode = false;
  boundUpdate: (currMS: number) => void;
  starCount: number;

  constructor(canvas: HTMLCanvasElement | null) {
    if (!canvas) throw new Error('Canvas cannot be null');

    this.canvas = canvas;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Canvas context cannot be null or undefined');

    this.context = context;
    this.starCount = Math.max(
      Math.floor(this.canvas.width * this.canvas.height * STARS_PER_PX),
      MIN_STARS,
    );

    const radius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
    this.gradients = COLORS.map((color) => {
      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        radius,
      );
      gradient.addColorStop(0.01, `rgba(${color}, ${MIN_OPACITY})`);
      gradient.addColorStop(0.4, `rgba(${color}, 1)`);

      return gradient;
    });

    this.isDebugMode = location.search.includes('debug');
  }

  init() {
    this.stars = Array.from({ length: this.starCount }).map(() => new Star(this.gradients));

    // Bind the update method once instead of on every frame
    this.boundUpdate = this.update.bind(this);

    requestAnimationFrame(this.boundUpdate);
  }

  get speed() {
    let relativeT = this.elapsedT;

    // Wait 500ms before starting the animation
    if (relativeT < 0.5) return MIN_SPEED;

    relativeT -= 0.5;

    // 3s of acceleration
    if (relativeT < 3) return MIN_SPEED + easeInOutQuad(relativeT / 3);

    relativeT -= 3;

    // 2s of top speed
    if (relativeT < 3) return 1 + MIN_SPEED;

    relativeT -= 3;

    // 3s of deceleration
    if (relativeT < 3) return 1 + MIN_SPEED - easeInOutQuad(relativeT / 3);

    // Stop
    return MIN_SPEED;
  }

  get fps() {
    if (this.elapsedT <= 0) return 0;

    return Math.round(this.frames / this.elapsedT);
  }

  update(currMS: number) {
    if (this.prevMS === 0) {
      this.prevMS = currMS;
    }

    const deltaT = currMS - this.prevMS;
    this.prevMS = currMS;

    // Time in seconds
    this.elapsedT += deltaT / 1000;
    this.frames++;

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].move(deltaT, SPEED * this.speed);
    }

    this.draw();

    requestAnimationFrame(this.boundUpdate);
  }

  draw() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'color-dodge';
    this.context.lineCap = 'round';
    this.context.lineWidth = STAR_SIZE_PX;

    for (let i = 0; i < this.gradients.length; i++) {
      this.context.beginPath();
      this.context.strokeStyle = this.gradients[i];

      for (let j = i; j < this.stars.length; j += this.gradients.length) {
        this.stars[j].draw(this.context, this.speed, centerX, centerY);
      }
      this.context.stroke();
    }

    if (!this.isDebugMode) return;

    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = '#000d';
    this.context.beginPath();
    this.context.rect(0, 0, 300, 70);
    this.context.fill();

    this.context.font = '20px monospace';
    this.context.fillStyle = '#fff';
    this.context.fillText(`${this.starCount} stars at ${this.fps} fps`, 20, 40);
  }
}
