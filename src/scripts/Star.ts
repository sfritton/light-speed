import { MIN_SPEED, STAR_LENGTH_MIN, STAR_LENGTH_MAX, ORIGIN_RADIUS } from './constants';

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
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

    const radius = startAtOrigin ? ORIGIN_RADIUS : 1;

    this.x = randomX * radius;
    this.y = randomY * radius;

    // Try again if we started out of bounds
    if (this.isOutOfBounds) return this.init({ startAtOrigin });

    this.length = randomRange(STAR_LENGTH_MIN, STAR_LENGTH_MAX);
  }

  get isOutOfBounds() {
    return this.x > 1.1 || this.x < -1.1 || this.y > 1.1 || this.y < -1.1;
  }

  get distanceToOrigin() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  move(deltaT: number, speed: number) {
    // Calcuate once, then use it for both x and y
    const magnitude = deltaT * speed * Math.pow(this.distanceToOrigin + 1, 3);

    this.x += this.directionX * magnitude;
    this.y += this.directionY * magnitude;

    // If we're out of bounds, restart at the origin
    if (this.isOutOfBounds) this.init({ startAtOrigin: true });
  }

  draw(context: CanvasRenderingContext2D, speed: number, centerX: number, centerY: number) {
    // Don't draw if off-screen
    if (this.isOutOfBounds) return;

    // Calculate once, then use for both x and y
    const currentLength =
      Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) *
      (speed - MIN_SPEED);

    const x2 = this.x + this.x * currentLength;
    const y2 = this.y + this.y * currentLength;

    const renderX = this.x * centerX + centerX;
    const renderY = this.y * centerY + centerY;

    const renderX2 = x2 * centerX + centerX;
    const renderY2 = y2 * centerY + centerY;

    context.moveTo(renderX, renderY);
    context.lineTo(renderX2, renderY2);
  }
}
