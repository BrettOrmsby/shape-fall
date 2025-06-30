const store = {
  state: "game" as "game" | "win" | "lose" | "levels",
  levelName: "",
  levelHelp: "",
  currentLevel: 0,
  unlockedLevels: 0,
};
export default store;
