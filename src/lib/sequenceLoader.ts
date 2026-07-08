export const SEQUENCE_FRAME_COUNT = 40;
export const SEQUENCE_BASE_PATH = "/sequence";
export const SEQUENCE_FALLBACK_IMAGE = "/1729D9FB-8203-4A75-88A6-19E41EBA8995_1_201_a.jpeg";

export function getSequenceFramePath(index: number): string {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `${SEQUENCE_BASE_PATH}/frame_${frameNumber}.jpg`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Failed to load sequence frame: ${src}`));
    image.src = src;
  });
}

function imageFromCanvas(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to materialize synthesized frame"));
    image.src = canvas.toDataURL("image/jpeg", 0.84);
  });
}

async function synthesizeSequenceFrames(): Promise<HTMLImageElement[]> {
  const base = await loadImage(SEQUENCE_FALLBACK_IMAGE);
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

    const blur = 92 - progress * 68;
    const brightness = 0.42 + progress * 0.34;
    const saturation = 0.52 + progress * 0.28;
    const hueRotate = progress * 10 - 5;
    const offsetX = (progress - 0.5) * 36;
    const offsetY = (progress - 0.5) * 22;
    const scale = 1.22 - progress * 0.1;

    context.filter = `blur(${blur}px) brightness(${brightness}) saturate(${saturation}) hue-rotate(${hueRotate}deg)`;
    context.drawImage(
      base,
      offsetX - ((scale - 1) * width) / 2,
      offsetY - ((scale - 1) * height) / 2,
      width * scale,
      height * scale,
    );

    frames.push(await imageFromCanvas(canvas));
  }

  return frames;
}

export async function loadSequenceFrames(): Promise<HTMLImageElement[]> {
  const loadedFrames = await Promise.allSettled(
    Array.from({ length: SEQUENCE_FRAME_COUNT }, (_, index) => loadImage(getSequenceFramePath(index))),
  );

  const resolvedFrames = loadedFrames
    .filter((result): result is PromiseFulfilledResult<HTMLImageElement> => result.status === "fulfilled")
    .map((result) => result.value);

  if (resolvedFrames.length === SEQUENCE_FRAME_COUNT) {
    return resolvedFrames;
  }

  return synthesizeSequenceFrames();
}

export function getFrameIndexForProgress(progress: number): number {
  const clamped = Math.min(1, Math.max(0, progress));
  return Math.min(SEQUENCE_FRAME_COUNT - 1, Math.floor(clamped * (SEQUENCE_FRAME_COUNT - 1)));
}
