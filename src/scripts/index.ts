import { CaveGenerator, GenerationAlgorithm } from './CaveGenerator';

// DOM elements
const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');

const showGridCheckbox = document.getElementById('show-grid') as HTMLInputElement | null;
const algorithmSelector = document.getElementById('algorithm') as HTMLSelectElement | null;
const seedInput = document.getElementById('seed') as HTMLInputElement | null;
const sizeSelector = document.getElementById('size') as HTMLSelectElement | null;

const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement | null;
const downloadButton = document.getElementById('download') as HTMLButtonElement | null;

const caveGenerator = new CaveGenerator(context);

const generateCave = async () => {
  if (regenerateButton) regenerateButton.disabled = true;
  if (downloadButton) downloadButton.disabled = true;

  caveGenerator.algorithm =
    (algorithmSelector?.value as GenerationAlgorithm | null) ?? 'cellular-automata';
  caveGenerator.seed = seedInput?.value || undefined;
  caveGenerator.cellSize = sizeSelector?.value;

  await caveGenerator.generate();

  if (regenerateButton) regenerateButton.disabled = false;
  if (downloadButton) downloadButton.disabled = false;
};

generateCave();

// Event listeners
showGridCheckbox?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;
  caveGenerator.showGrid = target.checked;
});

regenerateButton?.addEventListener('click', () => {
  generateCave();
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
