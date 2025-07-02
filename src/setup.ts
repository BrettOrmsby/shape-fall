import {
  Engine,
  Render,
  Runner,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { WIDTH, HEIGHT, INTERACTABLE } from "./constants";

export let engine: Engine;
export let render: Render;
export let runner: Runner;
export let mouse: Mouse;
export let mouseConstraint: MouseConstraint;

export function initSetup(element: HTMLElement) {
  engine = Engine.create();
  engine.timing.timeScale = 0.5;

  render = Render.create({
    element: element,
    engine: engine,
    options: {
      width: WIDTH,
      height: HEIGHT,
      background: "#fdf0d5",
      wireframes: false,
      showAngleIndicator: false,
      showCollisions: false,
      showVelocity: false,
    },
  });

  Render.run(render);
  runner = Runner.create();
  Runner.run(runner, engine);

  mouse = Mouse.create(render.canvas);
  render.mouse = mouse;

  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { render: { visible: false } },
    collisionFilter: { mask: INTERACTABLE },
  });
  Composite.add(engine.world, mouseConstraint);
}
