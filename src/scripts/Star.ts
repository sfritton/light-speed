import {
  MIN_SPEED,
  STAR_LENGTH_MIN,
  STAR_LENGTH_MAX,
  STAR_SIZE,
  MAX_STAR_RESPAWN_DELAY,
} from './constants';

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
  color: CanvasGradient;
  isRespawning = false;

  constructor(gradients: CanvasGradient[]) {
    this.color = randomItem(gradients);
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
  }

  get isOutOfBounds() {
    return this.x > 1.1 || this.x < -1.1 || this.y > 1.1 || this.y < -1.1;
  }

  get distanceToOrigin() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  move(deltaT: number, speed: number) {
    // Skip if respawning
    if (this.isRespawning) return;

    // Calcuate once, then use it for both x and y
    const magnitude = deltaT * speed * Math.pow(this.distanceToOrigin + 1, 3);

    this.x += this.directionX * magnitude;
    this.y += this.directionY * magnitude;

    if (this.isOutOfBounds) {
      this.isRespawning = true;

      const delay = Math.floor(Math.random() * MAX_STAR_RESPAWN_DELAY * speed);

      // Respawn at origin after a random delay
      setTimeout(() => {
        this.isRespawning = false;
        this.init({ startAtOrigin: true });
      }, delay);
    }
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
