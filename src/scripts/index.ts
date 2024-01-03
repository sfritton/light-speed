import { CaveGenerator, GenerationAlgorithm } from './CaveGenerator';

// DOM elements
const canvas = document.querySelector<HTMLCanvasElement>('canvas.wfc');
const context = canvas?.getContext('2d');
const regenerateButton = document.getElementById('regenerate') as HTMLButtonElement | null;
const algorithmSelector = document.getElementById('algorithm') as HTMLSelectElement | null;
const seedInput = document.getElementById('seed') as HTMLInputElement | null;
const showGridCheckbox = document.getElementById('show-grid') as HTMLInputElement | null;

const caveGenerator = new CaveGenerator(context);

const generateCave = async () => {
  if (regenerateButton) regenerateButton.disabled = true;

  caveGenerator.algorithm =
    (algorithmSelector?.value as GenerationAlgorithm | null) ?? 'cellular-automata';
  caveGenerator.seed = seedInput?.value || undefined;

  await caveGenerator.generate();

  if (regenerateButton) regenerateButton.disabled = false;
};

generateCave();

// Event listeners
regenerateButton?.addEventListener('click', () => {
  generateCave();
});

showGridCheckbox?.addEventListener('change', (e) => {
  const target = e.target as HTMLInputElement | null;
  if (!target) return;
  caveGenerator.showGrid = target.checked;
});
