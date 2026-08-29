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

const WALLPAPER_COLOR = "#04060A";

function paintSoftColorBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.fillStyle = WALLPAPER_COLOR;
  context.fillRect(0, 0, width, height);
}

async function synthesizeSequenceFrames(): Promise<HTMLImageElement[]> {
  const width = 1920;
  const height = 1080;
  const frames: HTMLImageElement[] = [];

  for (let index = 0; index < SEQUENCE_FRAME_COUNT; index += 1) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas 2D context unavailable");
    }

    paintSoftColorBackground(context, width, height);
    frames.push(await imageFromCanvas(canvas));
  }

  return frames;
}

export async function loadSequenceFrames(): Promise<HTMLImageElement[]> {
  // Always use a flat app background — never load the old photo sequence.
  return synthesizeSequenceFrames();
}

export function getFrameIndexForProgress(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(SEQUENCE_FRAME_COUNT - 1, Math.floor(clamped * (SEQUENCE_FRAME_COUNT - 1)));
}
