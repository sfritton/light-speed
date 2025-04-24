import { Star } from './Star';
import { SPEED, MIN_SPEED, COLORS, STAR_SIZE_PX, STARS_PER_PX, MIN_STARS } from './constants';

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
  centerX: number;
  centerY: number;
  userPrefersReducedMotion;

  constructor(canvas: HTMLCanvasElement | null, userPrefersReducedMotion: boolean) {
    if (!canvas) throw new Error('Canvas cannot be null');

    this.canvas = canvas;
    const context = canvas.getContext('2d');

    if (!context) throw new Error('Canvas context cannot be null or undefined');

    this.context = context;
    this.userPrefersReducedMotion = userPrefersReducedMotion;

    // Initialize canvas size
    this.onInitOrResize();

    // Keep canvas size in sync with window size
    window.addEventListener('resize', this.onInitOrResize.bind(this));

    // Initial star count is based on canvas size,
    // but this won't change on resize to avoid stars jumping around
    this.starCount = Math.max(
      Math.floor(this.canvas.width * this.canvas.height * STARS_PER_PX),
      MIN_STARS,
    );

    this.isDebugMode = location.search.includes('debug');
  }

  init() {
    this.stars = Array.from({ length: this.starCount }).map(() => new Star());

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

    this.gradients = COLORS.map((color) => {
      const gradient = this.context.createRadialGradient(
        this.centerX,
        this.centerY,
        0,
        this.centerX,
        this.centerY,
        radius,
      );
      gradient.addColorStop(0.02, `rgba(${color}, 0)`);
      gradient.addColorStop(0.45, `rgba(${color}, 1)`);

      return gradient;
    });
  }

  get speed() {
    if (this.userPrefersReducedMotion) return MIN_SPEED;

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
    this.elapsedT = currMS / 1000;
    this.frames++;

    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i].move(deltaT, SPEED * this.speed);
    }

    this.draw();

    requestAnimationFrame(this.boundUpdate);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.globalCompositeOperation = 'color-dodge';
    this.context.lineCap = 'round';

    for (let i = 0; i < this.gradients.length; i++) {
      this.context.beginPath();
      this.context.strokeStyle = this.gradients[i];
      const mobileFactor = this.canvas.width < 668 ? 0.5 : 1;
      this.context.lineWidth = STAR_SIZE_PX * (i + 1) * mobileFactor;

      for (let j = i; j < this.stars.length; j += this.gradients.length) {
        this.stars[j].draw(this.context, this.speed, this.centerX, this.centerY);
      }
      this.context.stroke();
    }

    if (!this.isDebugMode) return;

    this.context.globalCompositeOperation = 'source-over';
    this.context.fillStyle = '#000d';
    this.context.beginPath();
    this.context.rect(0, 0, 260, 36);
    this.context.fill();

    this.context.font = '16px monospace';
    this.context.fillStyle = '#fff';
    this.context.fillText(`${this.starCount} stars at ${this.fps} fps`, 16, 24);
  }
}
