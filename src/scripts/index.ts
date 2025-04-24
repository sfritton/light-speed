import { LightSpeed } from './LightSpeed';

const canvas = document.querySelector<HTMLCanvasElement>('canvas');

const userPrefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

const lightSpeed = new LightSpeed(canvas, userPrefersReducedMotion);

lightSpeed.init();
