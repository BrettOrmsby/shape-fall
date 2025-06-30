import { Bodies } from "matter-js";
import { render } from "./setup";
import { INTERACTABLE, SQUARE_SIZE } from "./constants";

export function writeText(
  text: string,
  x: number,
  y: number,
  size: number,
  colour: string
) {
  const ctx = render.context;
  ctx.save();
  ctx.font = `${size}px sans-serif`;
  ctx.fillStyle = colour;
  ctx.textAlign = "center";
  ctx.fillText(text, x, y);
  ctx.restore();
}

export function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
}

export function createButton(
  x: number,
  y: number,
  colour: string,
  options?: Partial<{ width: number; height: number }>
) {
  return Bodies.rectangle(
    x,
    y,
    options?.width ?? SQUARE_SIZE,
    options?.height ?? SQUARE_SIZE,
    {
      isStatic: true,
      render: {
        fillStyle: colour,
        strokeStyle: "black",
        lineWidth: 2,
      },
      label: "button",
      chamfer: { radius: 5 },
      collisionFilter: { category: INTERACTABLE },
    }
  );
}
