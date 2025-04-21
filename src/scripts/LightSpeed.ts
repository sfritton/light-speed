import { Star } from './Star';
import { STAR_COUNT, SPEED, MIN_SPEED } from './constants';

function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export class LightSpeed {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  stars: Star[] = [];
  prevMS = 0;
  elapsedT = 0;

  constructor(canvas: HTMLCanvasElement | null) {
    if (!canvas) throw new Error('Canvas cannot be null');

    this.canvas = canvas;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Canvas context cannot be null or undefined');

    this.context = context;
  }

  init() {
    this.stars = Array.from({ length: STAR_COUNT }).map(() => new Star());

    requestAnimationFrame(this.update.bind(this));
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

  update(currMS: number) {
    if (this.prevMS === 0) {
      this.prevMS = currMS;
    }

    const deltaT = currMS - this.prevMS;
    this.prevMS = currMS;

    // Time in seconds
    this.elapsedT += deltaT / 1000;

    this.stars.forEach((star) => star.move(deltaT, SPEED * this.speed));

    this.draw();

    requestAnimationFrame(this.update.bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach((star) => star.draw(this.context, this.canvas, this.speed));
  }
}
