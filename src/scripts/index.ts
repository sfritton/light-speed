import { LightSpeed } from './LightSpeed';

// DOM elements
const canvas = document.querySelector<HTMLCanvasElement>('canvas.cave-generator');

const lightSpeed = new LightSpeed(canvas);

lightSpeed.init();
