import { LightSpeed } from './LightSpeed';

// DOM elements
const canvas = document.querySelector<HTMLCanvasElement>('canvas');

const lightSpeed = new LightSpeed(canvas);

lightSpeed.init();
