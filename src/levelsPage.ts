import { Composite } from "matter-js";
import { HEIGHT, SQUARE_SIZE, WIDTH } from "./constants";
import store from "./store";
import { engine, mouseConstraint } from "./setup";
import { createButton, writeText } from "./utils";
import { levels } from "./levels";
import { loadLevel } from "./gameUtils";

const space = 10;
const columns = Math.floor((WIDTH - space) / (SQUARE_SIZE + 10));
const rows = Math.floor((HEIGHT - space - 20) / (SQUARE_SIZE + 10)); // give the height a 20 top space at least

export function goToLevels() {
  store.state = "levels";
  Composite.clear(engine.world, false);
  Composite.add(engine.world, mouseConstraint);

  const xOffset = (WIDTH - columns * SQUARE_SIZE - (columns + 1) * space) / 2;
  const yOffset =
    (HEIGHT - 20 - rows * SQUARE_SIZE - (rows + 1) * space) / 2 + 20;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const levelNumber = i * columns + j + 1;
      if (levelNumber > levels.length) {
        return;
      }
      let colour = "gray";
      if (levelNumber - 1 === store.unlockedLevels) {
        // current level
        colour = "blue";
      } else if (levelNumber - 1 < store.unlockedLevels) {
        // beat levels
        colour = "green";
      }
      const x = xOffset + SQUARE_SIZE * j + space * (j + 1) + SQUARE_SIZE / 2;
      const y = yOffset + SQUARE_SIZE * i + space * (i + 1) + SQUARE_SIZE / 2;
      const button = createButton(x, y, colour);
      button.plugin.onclick = () => {
        if (colour === "gray") return;
        loadLevel(levelNumber - 1);
      };
      button.plugin.draw = () => {
        const { x, y } = button.position;
        writeText(levelNumber.toString(), x, y + 8, 20, "black");
      };
      Composite.add(engine.world, button);
    }
  }
}
