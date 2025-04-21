import { MIN_SPEED } from './constants';

const MIN_OPACITY = 0.2;
const STAR_LENGTH_MIN = 10;
const STAR_LENGTH_MAX = 60;
const STAR_SIZE = 0.4;
const COLORS = ['255,255,255', '204,204,255', '170,170,255', '221,221,255'];

const lerp = (value: number, min: number, max: number) => min + value * (max - min);
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const normalize = (x: number, y: number) => {
  const distanceToOrigin = Math.sqrt(x * x + y * y);

  return {
    x: x / distanceToOrigin,
    y: y / distanceToOrigin,
  };
};

export class Star {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  length: number;
  color: string;

  constructor() {
    this.init();
  }

  init({ startAtOrigin = false } = {}) {
    const randomRadius = Math.random() * Math.sqrt(2);
    const randomAngle = Math.random() * Math.PI * 2;
    const randomX = randomRadius * Math.cos(randomAngle);
    const randomY = randomRadius * Math.sin(randomAngle);

    const { x: normX, y: normY } = normalize(randomX, randomY);

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
    if (this.isOutOfBounds) return this.init({ startAtOrigin });

    this.length = randomRange(STAR_LENGTH_MIN, STAR_LENGTH_MAX);
    this.color = randomItem(COLORS);
  }

  get isOutOfBounds() {
    return this.x > 1.1 || this.x < -1.1 || this.y > 1.1 || this.y < -1.1;
  }

  get distanceToOrigin() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  move(deltaT: number, speed: number) {
    this.x += this.directionX * deltaT * speed * Math.pow(this.distanceToOrigin + 1, 2);
    this.y += this.directionY * deltaT * speed * Math.pow(this.distanceToOrigin + 1, 2);
  }

  draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, speed: number) {
    const x2 =
      this.x +
      this.x *
        Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) *
        (speed - MIN_SPEED);
    const y2 =
      this.y +
      this.y *
        Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) *
        (speed - MIN_SPEED);

    if (this.isOutOfBounds) {
      this.init({ startAtOrigin: true });
      return;
    }

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const renderX = this.x * centerX + centerX;
    const renderY = this.y * centerY + centerY;

    const renderX2 = x2 * centerX + centerX;
    const renderY2 = y2 * centerY + centerY;

    const alpha = lerp(this.distanceToOrigin, MIN_OPACITY, 1);

    context.beginPath();
    context.moveTo(renderX, renderY);
    context.lineTo(renderX2, renderY2);
    context.strokeStyle = `rgba(${this.color},${alpha})`;
    context.lineWidth = this.length * STAR_SIZE * this.distanceToOrigin;
    context.lineCap = 'round';
    context.stroke();
  }
}
