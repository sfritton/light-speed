const STAR_LENGTH_MIN = 1;
const STAR_LENGTH_MAX = 20;
const STAR_SIZE = 1;
const COLORS = ['#fff', '#ccf', '#aaf', '#ddf'];

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
    const randomX = Math.random() * 2 - 1;
    const randomY = Math.random() * 2 - 1;

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

    this.length = randomRange(STAR_LENGTH_MIN, STAR_LENGTH_MAX);
    this.color = randomItem(COLORS);
  }

  move(deltaT: number, speed: number) {
    this.x += this.directionX * deltaT * speed;
    this.y += this.directionY * deltaT * speed;
  }

  draw(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, speed: number) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const renderX = this.x * centerX + centerX;
    const renderY = this.y * centerY + centerY;

    const distanceToOrigin = Math.sqrt(this.x * this.x + this.y * this.y);

    const x2 =
      this.x + this.x * Math.min((this.length + distanceToOrigin) / distanceToOrigin, 1) * speed;
    const y2 =
      this.y + this.y * Math.min((this.length + distanceToOrigin) / distanceToOrigin, 1) * speed;

    // console.log({ x1: this.x, y1: this.y, x2, y2 });

    if (this.x > 1 || this.x < -1 || this.y > 1 || this.y < -1) {
      this.init({ startAtOrigin: true });
      return;
    }

    const renderX2 = x2 * centerX + centerX;
    const renderY2 = y2 * centerY + centerY;

    context.beginPath();
    context.moveTo(renderX, renderY);
    context.lineTo(renderX2, renderY2);
    context.strokeStyle = this.color;
    context.lineWidth = this.length * STAR_SIZE * distanceToOrigin;
    context.lineCap = 'round';
    context.stroke();
  }
}
