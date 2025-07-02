import { Composite } from "matter-js";
import { engine, mouseConstraint } from "./setup";
import { WIDTH, HEIGHT } from "./constants";
import store from "./store";
import { loadLevel } from "./gameUtils";
import { goToLevels } from "./levelsPage";
import { levels } from "./levels";
import { createButton } from "./utils";

export function endGame(isWin: boolean) {
  if (isWin && store.currentLevel === store.unlockedLevels) {
    store.unlockedLevels += 1;
  }
  store.state = isWin ? "win" : "lose";
  Composite.clear(engine.world, false);
  Composite.add(engine.world, mouseConstraint);

  const hasNextButton = isWin && store.currentLevel < levels.length - 1;

  const levelSelectButton = createButton(
    WIDTH / 2 - (hasNextButton ? 50 : 25),
    HEIGHT / 2,
    "#1976d2"
  );
  levelSelectButton.plugin.onclick = goToLevels;
  levelSelectButton.plugin.draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#222";
    const { x, y } = levelSelectButton.position;
    ctx.translate(x - 12, y - 12);
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    const paths = [
      "M3 12h.01",
      "M3 18h.01",
      "M3 6h.01",
      "M8 12h13",
      "M8 18h13",
      "M8 6h13",
    ];
    paths.forEach((path) => {
      ctx.stroke(new Path2D(path));
    });
  };

  const restartButton = createButton(
    WIDTH / 2 + (hasNextButton ? 0 : 25),
    HEIGHT / 2,
    "#E63946"
  );
  restartButton.plugin.onclick = () => loadLevel(store.currentLevel);
  restartButton.plugin.draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#222";
    const { x, y } = restartButton.position;
    ctx.translate(x - 12, y - 12);
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    const path = new Path2D(
      "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
    );
    const path2 = new Path2D("M3 3v5h5");
    ctx.stroke(path);
    ctx.stroke(path2);
  };

  const nextLevelButton = createButton(WIDTH / 2 + 50, HEIGHT / 2, "#23B573");
  nextLevelButton.plugin.onclick = () => {
    loadLevel(store.currentLevel + 1);
  };
  nextLevelButton.plugin.draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#222";
    const { x, y } = nextLevelButton.position;
    ctx.translate(x - 12, y - 12);
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    const path = new Path2D("M5 12h14");
    const path2 = new Path2D("m12 5 7 7-7 7");
    ctx.stroke(path);
    ctx.stroke(path2);
  };

  Composite.add(engine.world, [levelSelectButton, restartButton]);
  if (hasNextButton) {
    Composite.add(engine.world, nextLevelButton);
  }
}
