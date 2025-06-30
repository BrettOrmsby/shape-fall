import { Composite } from "matter-js";
import { endGame } from "./gameOverPage";
import { HEIGHT, WIDTH } from "./constants";
import store from "./store";
import { levels } from "./levels";
import { engine, render, mouseConstraint } from "./setup";
import { createButton, writeText, roundedRect } from "./utils";

let settledFrameCount = 0;

export function setGravity() {
  Composite.allBodies(engine.world).forEach((body) => {
    if (body.plugin.direction !== "down") {
      // Cancel the global gravity effect
      body.force.y += -0.001 * body.mass;

      // Apply alternate gravity
      if (body.plugin.direction === "up") {
        body.force.y -= 0.001 * body.mass;
      } else if (body.plugin.direction === "left") {
        body.force.x -= 0.001 * body.mass;
      } else if (body.plugin.direction === "right") {
        body.force.x += 0.001 * body.mass;
      }
    }
  });
}

export function createTriangles() {
  // All game bodies that are not stationary have a direction associated with them. The triangle shows this direction.
  const ctx = render.context;
  ctx.save();
  ctx.fillStyle = "#222";

  Composite.allBodies(engine.world).forEach((body) => {
    const { x, y } = body.position;
    const size = 5;

    ctx.beginPath();
    if (
      !body.label.toLowerCase().includes("stationary") &&
      body.label !== "button" &&
      body.render.visible
    ) {
      if (body.plugin.direction === "up") {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x + size, y + size);
      } else if (body.plugin.direction === "down") {
        ctx.moveTo(x, y + size);
        ctx.lineTo(x - size, y - size);
        ctx.lineTo(x + size, y - size);
      } else if (body.plugin.direction === "left") {
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x + size, y - size);
      } else {
        ctx.moveTo(x + size, y);
        ctx.lineTo(x - size, y + size);
        ctx.lineTo(x - size, y - size);
      }
    }
    ctx.closePath();
    ctx.fill();
  });

  ctx.restore();
}

export function addBorders() {
  const ctx = render.context;
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#222";

  const bodies = Composite.allBodies(engine.world);

  for (const body of bodies) {
    if (!body.render.visible) continue;
    ctx.beginPath();
    const vertices = body.vertices;

    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let j = 1; j < vertices.length; j++) {
      ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();
}

export function clearOutOfBounds() {
  const bodies = Composite.allBodies(engine.world);

  const offScreenBodies = bodies.filter((body) => {
    const { min, max } = body.bounds;
    return max.x < 0 || min.x > WIDTH || max.y < 0 || min.y > HEIGHT;
  });

  offScreenBodies.forEach((body) => {
    if (body.label !== "good") {
      Composite.remove(engine.world, body);
    } else {
      endGame(false);
    }
  });
}

export function checkStopCondition() {
  if (store.state !== "game") return;
  const allBodies = Composite.allBodies(engine.world);
  const badExists = allBodies.some((body) => body.label.includes("bad"));
  if (badExists) return;

  const stillMoving = allBodies.some(
    (body) => body.speed > 0.01 || body.angularSpeed > 0.01
  );
  if (stillMoving) {
    settledFrameCount = 0;
  } else {
    settledFrameCount += 1;
    if (settledFrameCount >= 30) {
      endGame(true);
    }
  }
}

export function loadLevel(index: number) {
  store.state = "game";
  settledFrameCount = 0;
  store.currentLevel = index;
  Composite.clear(engine.world, false);
  Composite.add(engine.world, mouseConstraint);
  const { blocks, help, title } = levels[index]();
  Composite.add(engine.world, blocks);
  store.levelHelp = help;
  store.levelName = title;

  // The restart button has to be draw with the canvas overtop of all matter.js elements so borders or triangles don't fall through it
  const restartButton = createButton(270, 480, "gray", { height: 20 });
  restartButton.plugin.onclick = () => loadLevel(index);
  restartButton.isSensor = true;
  restartButton.render.visible = false;
  restartButton.plugin.draw = (ctx: CanvasRenderingContext2D) => {
    const { x, y } = restartButton.position;

    ctx.beginPath();
    roundedRect(ctx, x - 40 / 2, y - 20 / 2, 40, 20, 5);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    writeText("Restart", x, y + 4, 10, "black");
  };
  Composite.add(engine.world, restartButton);
}

export function addChecking() {
  if (settledFrameCount > 5 && store.state === "game") {
    writeText("checking...", 40, 490, 10, "black");
  }
}

export function addLevelText() {
  writeText(store.levelName, WIDTH / 2, 30, 20, "black");
  if (store.levelHelp) {
    writeText(store.levelHelp, WIDTH / 2, 50, 15, "black");
  }
}
