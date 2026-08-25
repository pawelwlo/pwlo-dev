export const SEQUENCE_FRAME_COUNT = 40;
export const SEQUENCE_BASE_PATH = "/sequence";

export function getSequenceFramePath(index: number): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `${SEQUENCE_BASE_PATH}/frame_${frameNumber}.jpg`;
}

function imageFromCanvas(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to materialize soft background frame"));
    image.src = canvas.toDataURL("image/jpeg", 0.84);
  });
}

function paintSoftColorBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
) {
  const warmShift = progress * 0.18;
  const coolShift = (1 - progress) * 0.16;

  const base = context.createLinearGradient(0, 0, width * 0.2, height);
  base.addColorStop(0, `rgb(${14 + warmShift * 20}, ${30 + coolShift * 20}, ${56})`);
  base.addColorStop(0.32, `rgb(${22 + warmShift * 24}, ${43 + coolShift * 16}, ${80})`);
  base.addColorStop(0.68, `rgb(${74 + warmShift * 18}, ${33}, ${65})`);
  base.addColorStop(1, `rgb(${92 + warmShift * 16}, ${44 + warmShift * 8}, ${58})`);
  context.fillStyle = base;
  context.fillRect(0, 0, width, height);

  const sunX = width * (0.52 + progress * 0.06);
  const sunY = height * (0.2 - progress * 0.03);
  const sun = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, width * 0.38);
  sun.addColorStop(0, "rgba(255, 214, 170, 0.34)");
  sun.addColorStop(0.5, "rgba(210, 150, 180, 0.12)");
  sun.addColorStop(1, "rgba(210, 150, 180, 0)");
  context.fillStyle = sun;
  context.fillRect(0, 0, width, height);

  const blueX = width * (0.16 - progress * 0.03);
  const blueY = height * (0.68 + progress * 0.04);
  const blue = context.createRadialGradient(blueX, blueY, 0, blueX, blueY, width * 0.48);
  blue.addColorStop(0, "rgba(90, 140, 230, 0.32)");
  blue.addColorStop(1, "rgba(90, 140, 230, 0)");
  context.fillStyle = blue;
  context.fillRect(0, 0, width, height);

  const pinkX = width * (0.84 + progress * 0.02);
  const pinkY = height * (0.52 - progress * 0.05);
  const pink = context.createRadialGradient(pinkX, pinkY, 0, pinkX, pinkY, width * 0.36);
  pink.addColorStop(0, "rgba(180, 110, 170, 0.28)");
  pink.addColorStop(1, "rgba(180, 110, 170, 0)");
  context.fillStyle = pink;
  context.fillRect(0, 0, width, height);
}

async function synthesizeSequenceFrames(): Promise<HTMLImageElement[]> {
  const width = 1920;
  const height = 1080;
  const frames: HTMLImageElement[] = [];

  for (let index = 0; index < SEQUENCE_FRAME_COUNT; index += 1) {
    const progress = index / (SEQUENCE_FRAME_COUNT - 1);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas 2D context unavailable");
    }

    paintSoftColorBackground(context, width, height, progress);
    frames.push(await imageFromCanvas(canvas));
  }

  return frames;
}

export async function loadSequenceFrames(): Promise<HTMLImageElement[]> {
  // Always use soft app-matching gradients — never load the old photo sequence.
  return synthesizeSequenceFrames();
}

export function getFrameIndexForProgress(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(SEQUENCE_FRAME_COUNT - 1, Math.floor(clamped * (SEQUENCE_FRAME_COUNT - 1)));
}
