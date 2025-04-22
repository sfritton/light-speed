import { LightSpeed } from './LightSpeed';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');

const setCanvasSize = () => {
  if (canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
};

setCanvasSize();

const lightSpeed = new LightSpeed(canvas);

lightSpeed.init();

// Keep canvas size in sync with window size
window.addEventListener('resize', setCanvasSize);
