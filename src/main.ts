import { Events, Composite, Query } from "matter-js";
import {
  setGravity,
  checkStopCondition,
  addChecking,
  clearOutOfBounds,
  createTriangles,
  loadLevel,
  addLevelText,
  addBorders,
} from "./gameUtils";
import { engine, render, mouseConstraint, mouse } from "./setup";
import { WIDTH } from "./constants";
import store from "./store";
import { writeText } from "./utils";

Events.on(engine, "beforeUpdate", () => {
  if (store.state === "game") {
    setGravity();
    checkStopCondition();
  }
});
Events.on(render, "afterRender", () => {
  if (store.state === "game") {
    addChecking();
    clearOutOfBounds();
    createTriangles();
    addLevelText();
    addBorders();
  } else if (store.state === "levels") {
    writeText("Levels", WIDTH / 2, 25, 15, "black");
  } else {
    writeText(
      store.state === "win" ? "You Win" : "You Lost",
      WIDTH / 2,
      50,
      32,
      "black"
    );
  }
  const allBodies = Composite.allBodies(engine.world);
  allBodies.forEach((body) => {
    if (body.plugin.draw) {
      const ctx = render.context;
      ctx.save();
      body.plugin.draw(ctx);
      ctx.restore();
    }
  });
});

const clickBody = () => {
  const mousePos = mouse.position;
  const bodies = Composite.allBodies(engine.world);
  const hitBodies = Query.point(bodies, mousePos);

  hitBodies.forEach((body) => {
    if (body.plugin.onclick) {
      body.plugin.onclick();
    }
  });
};
Events.on(mouseConstraint, "mousedown", clickBody);
Events.on(mouseConstraint, "startdrag", () => {
  // Prevent dragging
  mouseConstraint.constraint.bodyB = null;
});

// Start the level
loadLevel(store.currentLevel);
