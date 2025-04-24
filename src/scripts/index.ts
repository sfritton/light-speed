import { LightSpeed } from './LightSpeed';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');

const lightSpeed = new LightSpeed(canvas);

lightSpeed.init();
