import { CaveGenerator } from './CaveGenerator';
// @ts-expect-error -- TS doesn't understand Parcel's ability to import image files
import caveTiles from '../img/cave_tiles.png';

// DOM elements
const caveTilesImg = document.getElementById('cave_tiles') as HTMLImageElement | null;
const canvas = document.querySelector<HTMLCanvasElement>('canvas.cave-generator');
const context = canvas?.getContext('2d');

const showGridCheckbox = document.getElementById('show-grid') as HTMLInputElement | null;
const sizeSelector = document.getElementById('size') as HTMLSelectElement | null;

const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement | null;
const downloadButton = document.getElementById('download') as HTMLButtonElement | null;

const caveGenerator = new CaveGenerator(context, caveTilesImg);

if (caveTilesImg) {
  caveTilesImg.onload = () => {
    caveGenerator.generate();
  };
  caveTilesImg.src = caveTiles;
} else {
  throw new Error("Couldn't find tileset img");
}

// Event listeners
showGridCheckbox?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;

  caveGenerator.showGrid = target.checked;
});

sizeSelector?.addEventListener('change', (e) => {
  const target = e.target as HTMLSelectElement | null;
  if (!target) return;

  caveGenerator.cellSize = target.value;
});

regenerateButton?.addEventListener('click', () => {
  const params = new URLSearchParams(window.location.search);

  if (params.size) {
    // Remove seed when regenerating
    window.history.pushState({}, document.title, document.location.pathname);
  }

  caveGenerator.generate();
});

downloadButton?.addEventListener('click', () => {
  if (!canvas) return;

  const link = document.createElement('a');

  link.download = 'cave.png';
  link.href = canvas.toDataURL();

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
