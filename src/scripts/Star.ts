import {
  MIN_SPEED,
  STAR_LENGTH_MIN,
  STAR_LENGTH_MAX,
  ORIGIN_DEPTH,
  ORIGIN_DEPTH_VARIANCE,
  PERSPECTIVE,
  ORIGIN_RADIUS_VARIANCE,
} from './constants';

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export class Star {
  angle: number;
  z: number;
  length: number;
  radius: number;

  constructor() {
    this.init();
  }

  init({ startAtOrigin = false } = {}) {
    this.z = startAtOrigin
      ? randomRange(ORIGIN_DEPTH, ORIGIN_DEPTH + ORIGIN_DEPTH_VARIANCE)
      : randomRange(0, ORIGIN_DEPTH);

    // Try again if we started out of bounds
    if (this.isOutOfBounds) return this.init({ startAtOrigin });

    this.angle = randomRange(0, Math.PI * 2);
    this.length = randomRange(STAR_LENGTH_MIN, STAR_LENGTH_MAX);
    this.radius = randomRange(1, 1 + ORIGIN_RADIUS_VARIANCE);
  }

  get x() {
    return (Math.cos(this.angle) * this.radius) / this.z;
  }

  get y() {
    return (Math.sin(this.angle) * this.radius) / this.z;
  }

  get isOutOfBounds() {
    return this.z < 0.01;
  }

  get distanceToOrigin() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  move(deltaT: number, speed: number) {
    this.z -= deltaT * speed;

    // If we're out of bounds, restart at the origin
    if (this.isOutOfBounds) this.init({ startAtOrigin: true });
  }

  draw(context: CanvasRenderingContext2D, speed: number, centerX: number, centerY: number) {
    // Don't draw if off-screen
    if (this.isOutOfBounds) return;

    const currentLength =
      Math.min((this.length + this.distanceToOrigin) / this.distanceToOrigin, 1) *
      (speed - MIN_SPEED);

    const z2 = this.z + currentLength;

    const renderX = (this.x / this.z) * PERSPECTIVE + centerX;
    const renderY = (this.y / this.z) * PERSPECTIVE + centerY;

    const renderX2 = (this.x / z2) * PERSPECTIVE + centerX;
    const renderY2 = (this.y / z2) * PERSPECTIVE + centerY;

    context.moveTo(renderX, renderY);
    context.lineTo(renderX2, renderY2);
  }
}
