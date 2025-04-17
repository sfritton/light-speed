import { Star } from './Star';

const STAR_COUNT = 500;
const SPEED = 0.0008;
const ACCELERATION = 0.4;

export class LightSpeed {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  stars: Star[] = [];
  prevMS = 0;
  speed = 0;
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

  update(currMS: number) {
    if (this.prevMS === 0) {
      this.prevMS = currMS;
    }

    const deltaT = currMS - this.prevMS;
    this.prevMS = currMS;

    // Time in seconds
    this.elapsedT += deltaT / 1000;
    this.speed = -Math.cos(this.elapsedT * ACCELERATION) + 1;

    this.stars.forEach((star) => star.move(deltaT, SPEED * this.speed));

    this.draw();

    if (this.elapsedT > 5 && this.speed <= 0.001) return;
    requestAnimationFrame(this.update.bind(this));
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.stars.forEach((star) => star.draw(this.context, this.canvas, this.speed));
  }
}
