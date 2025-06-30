import {
  Engine,
  Render,
  Runner,
  Composite,
  Mouse,
  MouseConstraint,
} from "matter-js";
import { WIDTH, HEIGHT, INTERACTABLE } from "./constants";

export const engine = Engine.create();
engine.timing.timeScale = 0.5;

export const render = Render.create({
  element: document.querySelector("#app") as HTMLElement,
  engine: engine,
  options: {
    width: WIDTH,
    height: HEIGHT,
    background: "#eee",
    wireframes: false,
    showAngleIndicator: false,
    showCollisions: false,
    showVelocity: false,
  },
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

export const mouse = Mouse.create(render.canvas);
render.mouse = mouse;

export const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { render: { visible: false } },
  collisionFilter: { mask: INTERACTABLE },
});
Composite.add(engine.world, mouseConstraint);
