import { Composite, Bodies, Body } from "matter-js";
import { engine } from "./setup";
import { SQUARE_SIZE, INTERACTABLE, STATIC } from "./constants";

type BlockKind =
  | "bad"
  | "good"
  | "stationary"
  | "ok"
  | "okStationary"
  | "badStationary"
  | "badProtection"
  | "goodStationary";
type Direction = "up" | "down" | "left" | "right";
const blockSettings = {
  bad: {
    colour: "red",
    isStatic: false,
    canTap: true,
  },
  badStationary: {
    colour: "#ff5252",
    isStatic: true,
    canTap: true,
  },
  badProtection: {
    colour: "#911d1d",
    isStatic: false,
    canTap: false,
  },
  good: {
    colour: "green",
    isStatic: false,
    canTap: false,
  },
  goodStationary: {
    colour: "#8dd98d",
    isStatic: true,
    canTap: false,
  },
  stationary: {
    colour: "gray",
    isStatic: true,
    canTap: false,
  },
  ok: {
    colour: "blue",
    isStatic: false,
    canTap: true,
  },
  okStationary: {
    colour: "#786ce6",
    isStatic: true,
    canTap: true,
  },
};

export const levels: (() => { blocks: Body[]; title: string; help: string })[] =
  [
    () => ({
      blocks: [
        createBlock([150, 400, 100, 10], "badStationary"),
        createBlock([50, 300, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([250, 300, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([110, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([190, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([130, 335, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([170, 335, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([150, 295, SQUARE_SIZE, SQUARE_SIZE], "bad"),
      ],
      title: "Red Shapes",
      help: "Tap Red shapes to remove them",
    }),
    () => ({
      blocks: [
        createBlock([150, 400, 80, 10], "badStationary"),
        createBlock([50, 400, 40, 10], "badStationary"),
        createBlock([250, 400, 40, 10], "badStationary"),

        createBlock([50, 375, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([130, 375, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([170, 375, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([250, 375, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([70, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([110, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([190, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([230, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([90, 295, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([210, 295, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
      ],
      title: "Dark Red",
      help: "Dark Red shapes can't be clicked",
    }),
    () => ({
      blocks: [
        createBlock([150, 400, 200, 10], "goodStationary"),
        createBlock([150, 375, 60, SQUARE_SIZE], "bad"),
        createBlock([80, 375, 60, SQUARE_SIZE], "bad"),
        createBlock([220, 375, 60, SQUARE_SIZE], "bad"),
        createBlock([115, 335, 60, SQUARE_SIZE], "good"),
        createBlock([185, 335, 60, SQUARE_SIZE], "good"),
      ],
      title: "Green",
      help: "Keep Green shapes",
    }),
    () => ({
      blocks: [
        createBlock([55, 400, 90, 10], "badStationary"),
        createBlock([30, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([80, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 335, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 295, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 255, SQUARE_SIZE, SQUARE_SIZE], "bad"),

        createBlock([55, 215, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 175, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([250, 400, 60, 10], "goodStationary"),
        createBlock([285, 370, 10, 70], "goodStationary"),
      ],
      title: "Timber",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([55, 400, SQUARE_SIZE, 10], "badStationary"),
        createBlock([165, 400, SQUARE_SIZE, 10], "badStationary"),

        createBlock([55, 295, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 335, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([55, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([165, 295, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([165, 375, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([165, 335, SQUARE_SIZE, SQUARE_SIZE], "bad"),

        createBlock([110, 270, 150, 10], "bad"),
        createBlock([110, 200, SQUARE_SIZE, 10], "badStationary"),
        createBlock([110, 180, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([240, 400, 100, 10], "goodStationary"),
      ],
      title: "Table",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([45, 400, 10, 10], "okStationary"),
        createBlock([145, 400, 10, 10], "okStationary"),
        createBlock([245, 400, 10, 10], "okStationary"),

        createBlock([95, 375, 100, SQUARE_SIZE], "ok"),
        createBlock([195, 375, 100, SQUARE_SIZE], "ok"),

        createBlock([70, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([120, 335, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([95, 295, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([170, 335, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([220, 335, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([195, 295, SQUARE_SIZE, SQUARE_SIZE], "good"),
      ],
      title: "Blue Shapes",
      help: "Blue shapes can stay or go",
    }),
    () => ({
      blocks: [
        createBlock([10, 400, 10, 10], "okStationary"),
        createBlock([100, 400, 10, 10], "okStationary"),
        createBlock([200, 400, 10, 10], "okStationary"),
        createBlock([290, 400, 10, 10], "okStationary"),

        createBlock([50, 390, 120, 10], "ok"),
        createBlock([150, 380, 120, 10], "ok"),
        createBlock([250, 390, 120, 10], "ok"),

        createBlock([150, 315, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([130, 355, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([170, 355, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([50, 270, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([50, 225, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([250, 270, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([250, 225, SQUARE_SIZE, SQUARE_SIZE], "good"),
      ],
      title: "Everything Together",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([20, 220, SQUARE_SIZE / 4], "good"),
        createBlock([45, 250, 80, 10], "okStationary", { rotation: 10 }),
        createBlock([125, 262, 80, 10], "okStationary", { rotation: 5 }),
        createBlock([205, 270, 80, 10], "okStationary", { rotation: 5 }),

        createBlock([210, 220, SQUARE_SIZE, 10], "okStationary"),
        createBlock([210, 200, SQUARE_SIZE, SQUARE_SIZE], "ok"),
      ],
      title: "Circle",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([60, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([240, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([150, 350, 240, 10], "ok"),
        createBlock([80, 300, 140, 10], "ok"),
        createBlock([220, 300, 140, 10], "ok"),

        createBlock([60, 375, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([60, 325, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([60, 275, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([240, 375, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([240, 325, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([240, 275, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([150, 325, SQUARE_SIZE, SQUARE_SIZE], "ok"),

        createBlock([150, 200, SQUARE_SIZE, 10], "okStationary"),
        createBlock([150, 175, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
      ],
      title: "Drop It",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([130, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([270, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([200, 375, 180, 10], "ok"),

        createBlock([220, 350, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([170, 350, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([30, 350, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([100, 325, 180, 10], "ok"),

        createBlock([30, 300, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([80, 300, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([30, 275, 60, 10], "ok"),

        createBlock([30, 250, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([30, 210, SQUARE_SIZE, SQUARE_SIZE], "good"),
      ],
      title: "What First?",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([150, 210, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 170, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 130, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([150, 290, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([150, 330, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([150, 370, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),

        createBlock([190, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),
        createBlock([230, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),
        createBlock([270, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),

        createBlock([110, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([70, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([30, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
      ],
      title: "Directions",
      help: "Triangles show the direction a shape falls",
    }),

    () => ({
      blocks: [
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([110, 250, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([190, 250, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([150, 210, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([150, 290, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([110, 210, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([110, 290, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([190, 210, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "down",
        }),
        createBlock([190, 290, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
      ],
      title: "Gravity",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([100, 400, SQUARE_SIZE, SQUARE_SIZE], "goodStationary"),

        createBlock([100, 360, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([100, 320, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([100, 280, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([200, 250, 250, 20], "okStationary", { rotation: 105 }),
        createBlock([250, 150, SQUARE_SIZE / 2], "ok", { direction: "left" }),
      ],
      title: "Wreaking Ball",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 100, 200, 10], "okStationary", { rotation: 10 }),
        createBlock([150, 400, 200, 10], "okStationary", { rotation: 10 }),
        createBlock([40, 250, 10, 300], "okStationary"),
        createBlock([260, 250, 10, 300], "okStationary"),

        createBlock([80, 160, SQUARE_SIZE / 2], "ok"),
        createBlock([110, 160, SQUARE_SIZE / 2], "ok"),
        createBlock([140, 160, SQUARE_SIZE / 2], "ok"),
        createBlock([170, 160, SQUARE_SIZE / 2], "ok"),
        createBlock([200, 160, SQUARE_SIZE / 2], "ok"),
        createBlock([230, 160, SQUARE_SIZE / 2], "ok"),

        createBlock([70, 130, SQUARE_SIZE / 2], "good"),
        createBlock([100, 130, SQUARE_SIZE / 2], "good"),
        createBlock([130, 130, SQUARE_SIZE / 2], "good"),
        createBlock([160, 130, SQUARE_SIZE / 2], "good"),
        createBlock([190, 130, SQUARE_SIZE / 2], "good"),

        createBlock([80, 300, SQUARE_SIZE / 2], "badProtection", { direction: "up" }),
        createBlock([110, 300, SQUARE_SIZE / 2], "badProtection", { direction: "up" }),
        createBlock([140, 300, SQUARE_SIZE / 2], "badProtection", { direction: "up" }),
        createBlock([170, 300, SQUARE_SIZE / 2], "badProtection", { direction: "up" }),
        createBlock([200, 300, SQUARE_SIZE / 2], "badProtection", { direction: "up" }),
      ],
      title: "Diffusion",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 400, 150, SQUARE_SIZE], "goodStationary"),
        createBlock([150, 120, 150, 10], "badStationary"),
        createBlock([150, 100, 150, SQUARE_SIZE], "good"),

        createBlock([150, 300, 200, 10], "badStationary"),
        createBlock([30, 303, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([270, 297, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
      ],
      title: "Sandwich",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([60, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([60, 360, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([200, 360, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([240, 360, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),

        createBlock([250, 200, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([250, 240, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([210, 240, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "right",
        }),
      ],
      title: "Saboteur",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([50, 100, 100, 10], "goodStationary", { rotation: 20 }),
        createBlock([15, 50, SQUARE_SIZE / 2], "badProtection"),
        createBlock([35, 75, 10, 10], "okStationary"),

        createBlock([180, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([220, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([230, 200, 10, SQUARE_SIZE], "okStationary"),
        createBlock([255, 200, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "left",
        }),
      ],
      title: "Redirect",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "goodStationary"),
        createBlock([150, 100, SQUARE_SIZE, 10], "okStationary"),
        createBlock([150, 75, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([150, 425, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),

        createBlock([250, 210, 10, SQUARE_SIZE], "okStationary"),
        createBlock([275, 210, SQUARE_SIZE / 2], "badProtection", {
          direction: "left",
        }),
        createBlock([50, 290, 10, SQUARE_SIZE], "okStationary"),
        createBlock([25, 290, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),
      ],
      title: "Knockout",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([260, 100, SQUARE_SIZE / 4], "good"),
        createBlock([200, 150, 160, 10], "goodStationary", { rotation: -17 }),

        createBlock([150, 350, 180, 10], "goodStationary", { rotation: 5 }),
        createBlock([35, 350, SQUARE_SIZE, 10], "okStationary"),
        createBlock([35, 375, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),

        createBlock([220, 300, SQUARE_SIZE, 10], "okStationary"),
        createBlock([220, 275, SQUARE_SIZE, SQUARE_SIZE], "ok"),
      ],
      title: "Block It",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 385, SQUARE_SIZE / 4], "good"),
        createBlock([70, 250, 120, 10], "goodStationary"),
        createBlock([230, 250, 120, 10], "goodStationary", { rotation: 5 }),
        createBlock([290, 180, 10, 120], "goodStationary", { rotation: 3 }),

        createBlock([150, 400, SQUARE_SIZE * 2, 10], "badStationary"),
        createBlock([150, 445, SQUARE_SIZE * 2, SQUARE_SIZE * 2], "bad", {
          direction: "up",
        }),
        createBlock([65, 200, 10, SQUARE_SIZE], "badStationary"),
        createBlock([40, 200, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
      ],
      title: "Pop Up",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([70, 200, 10, SQUARE_SIZE * 2], "badStationary"),
        createBlock([30, 200, SQUARE_SIZE * 2, SQUARE_SIZE * 2], "bad", {
          direction: "right",
        }),
        createBlock([85, 200, SQUARE_SIZE / 2, SQUARE_SIZE / 2], "good", {
          direction: "left",
        }),

        createBlock([70, 350, 10, SQUARE_SIZE * 2], "badStationary"),
        createBlock([30, 350, SQUARE_SIZE * 2, SQUARE_SIZE * 2], "bad", {
          direction: "right",
        }),
        createBlock([85, 350, SQUARE_SIZE / 2, SQUARE_SIZE / 2], "good", {
          direction: "left",
        }),

        createBlock([210, 130, 10, 80], "okStationary"),
        createBlock([200, 275, 10, 90], "okStationary"),
        createBlock([200, 420, 10, 80], "okStationary"),

        createBlock([225, 165, 20, 10], "okStationary"),
        createBlock([215, 235, 20, 10], "okStationary"),
        createBlock([215, 315, 20, 10], "okStationary"),
        createBlock([215, 385, 20, 10], "okStationary"),

        createBlock([220, 125, 10, 70], "ok"),
        createBlock([210, 270, 10, 70], "ok"),
      ],
      title: "Close the Windows",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 400, SQUARE_SIZE, SQUARE_SIZE], "goodStationary"),
        createBlock([150, 320, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 240, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),

        createBlock([30, 320, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([90, 321, 80, 10], "ok", { direction: "right" }),
        createBlock([270, 320, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([210, 320, 80, 10], "ok", { direction: "left" }),

        createBlock([30, 240, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([90, 240, 80, 10], "ok", { direction: "right" }),
        createBlock([270, 240, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([210, 240, 80, 10], "ok", { direction: "left" }),

        createBlock([150, 80, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([150, 160, 10, 120], "ok"),
      ],
      title: "Poles",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([105, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([195, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([150, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([150, 360, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 320, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 280, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 240, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 200, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([110, 200, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([190, 200, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([150, 160, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([110, 160, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([190, 160, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([45, 280, SQUARE_SIZE * 2, 300], "ok", {
          direction: "right",
        }),
        createBlock([250, 280, SQUARE_SIZE * 2, 300], "ok", {
          direction: "left",
        }),

        createBlock([230, 120, 10, 10], "okStationary"),
        createBlock([70, 120, 10, 10], "okStationary"),
        createBlock([230, 440, 10, 10], "okStationary"),
        createBlock([70, 440, 10, 10], "okStationary"),
      ],
      title: "Pinch & Slide",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 250, 150, 10], "goodStationary", { rotation: 95 }),
        createBlock([200, 190, SQUARE_SIZE / 2], "badProtection", {
          direction: "left",
        }),
        createBlock([100, 310, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),

        createBlock([50, 100, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([51, 140, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
        createBlock([49, 180, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
        createBlock([51, 220, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
        createBlock([49, 260, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
        createBlock([51, 300, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
        createBlock([50, 340, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),
        createBlock([50, 380, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),
        createBlock([50, 420, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),

        createBlock([249, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([251, 360, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([249, 320, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([251, 280, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([249, 240, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([251, 200, SQUARE_SIZE, SQUARE_SIZE], "ok"),
        createBlock([250, 160, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([250, 120, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([250, 80, SQUARE_SIZE, SQUARE_SIZE], "good"),
      ],
      title: "Quick",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([110, 70, 200, SQUARE_SIZE * 2], "ok"),
        createBlock([110, 115, 200, 10], "okStationary"),
        createBlock([110, 140, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),
        createBlock([110, 180, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([15, 180, 10, 10], "okStationary"),
        createBlock([205, 180, 10, 10], "okStationary"),

        createBlock([110, 430, 200, SQUARE_SIZE * 2], "ok", {
          direction: "up",
        }),
        createBlock([110, 385, 200, 10], "okStationary"),
        createBlock([110, 360, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "down",
        }),
        createBlock([110, 320, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "down",
        }),
        createBlock([15, 320, 10, 10], "okStationary"),
        createBlock([205, 320, 10, 10], "okStationary"),

        createBlock([190, 250, 10, SQUARE_SIZE], "okStationary"),
        createBlock([215, 250, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "left",
        }),
        createBlock([240, 250, 10, SQUARE_SIZE], "okStationary"),
        createBlock([265, 250, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "left",
        }),
      ],
      title: "Clear Off",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([90, 190, 160, 10], "okStationary", { rotation: 10 }),
        createBlock([30, 155, SQUARE_SIZE / 2], "badProtection"),

        createBlock([35, 400, 10, SQUARE_SIZE], "goodStationary"),
        createBlock([60, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([100, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([265, 400, 10, SQUARE_SIZE], "goodStationary"),
        createBlock([240, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([200, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
      ],
      title: "Through the Gap",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 240, 10, 10], "goodStationary"),
        createBlock([150, 230, 160, 10], "good"),

        createBlock([230, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([230, 425, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),

        createBlock([100, 400, SQUARE_SIZE, SQUARE_SIZE], "goodStationary", {
          direction: "up",
        }),

        createBlock([100, 90, SQUARE_SIZE * 2, 10], "okStationary"),
        createBlock([100, 65, SQUARE_SIZE * 2, SQUARE_SIZE], "ok"),
      ],
      title: "Pin",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 300, 250, 10], "okStationary"),
        createBlock([60, 255, 10, 80], "ok"),
        createBlock([110, 255, 10, 80], "ok"),
        createBlock([160, 255, 10, 80], "ok"),
        createBlock([210, 255, 10, 80], "ok"),

        createBlock([30, 210, 10, 20], "okStationary"),
        createBlock([15, 210, 20, 20], "ok", { direction: "right" }),

        createBlock([220, 350, 10, 10], "okStationary"),
        createBlock([290, 350, 10, 10], "okStationary"),

        createBlock([250, 120, SQUARE_SIZE, 10], "badStationary"),
        createBlock([250, 95, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([180, 120, SQUARE_SIZE, 10], "okStationary"),
        createBlock([180, 95, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([110, 120, SQUARE_SIZE, 10], "okStationary"),
        createBlock([110, 95, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([40, 120, SQUARE_SIZE, 10], "okStationary"),
        createBlock([40, 95, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
      ],
      title: "Dominos",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([170, 200, SQUARE_SIZE / 2], "badProtection"),
        createBlock([210, 200, SQUARE_SIZE / 2], "badProtection"),
        createBlock([130, 200, SQUARE_SIZE / 2], "ok"),
        createBlock([250, 200, SQUARE_SIZE / 2], "ok"),

        createBlock([190, 165, SQUARE_SIZE / 2], "badProtection"),
        createBlock([150, 165, SQUARE_SIZE / 2], "good"),
        createBlock([230, 165, SQUARE_SIZE / 2], "good"),

        createBlock([210, 130, SQUARE_SIZE / 2], "ok"),
        createBlock([170, 130, SQUARE_SIZE / 2], "ok"),
        createBlock([190, 95, SQUARE_SIZE / 2], "ok"),

        createBlock([110, 215, 5], "okStationary"),
        createBlock([150, 215, 5], "okStationary"),
        createBlock([190, 215, 5], "okStationary"),
        createBlock([230, 215, 5], "okStationary"),
        createBlock([270, 215, 5], "okStationary"),

        createBlock([95, 275, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),
        createBlock([95, 315, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),
        createBlock([95, 235, SQUARE_SIZE / 2], "ok", { direction: "right" }),
        createBlock([95, 355, SQUARE_SIZE / 2], "ok", { direction: "right" }),

        createBlock([60, 255, SQUARE_SIZE / 2], "good", { direction: "right" }),
        createBlock([60, 295, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),
        createBlock([60, 335, SQUARE_SIZE / 2], "good", { direction: "right" }),

        createBlock([25, 275, SQUARE_SIZE / 2], "ok", { direction: "right" }),
        createBlock([25, 315, SQUARE_SIZE / 2], "ok", { direction: "right" }),
        createBlock([-10, 295, SQUARE_SIZE / 2], "ok", { direction: "right" }),

        createBlock([110, 255, 5], "okStationary"),
        createBlock([110, 295, 5], "okStationary"),
        createBlock([110, 335, 5], "okStationary"),
        createBlock([110, 375, 5], "okStationary"),

        createBlock([190, 300, 60, 10], "okStationary"),
        createBlock([190, 355, 60, 100], "ok", { direction: "up" }),

        createBlock([230, 295, 10, 60], "okStationary"),
        createBlock([285, 295, 100, 60], "ok", { direction: "left" }),
      ],
      title: "Pyramids",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([120, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([120, 345, SQUARE_SIZE, 100], "ok"),
        createBlock([120, 245, SQUARE_SIZE, 100], "good"),

        createBlock([230, 350, 10, SQUARE_SIZE], "okStationary"),
        createBlock([255, 350, 25], "badProtection", { direction: "left" }),
      ],
      title: "Quick Combo",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([17, 412, 5], "okStationary"),
        createBlock([41, 412, 5], "okStationary"),
        createBlock([65, 412, 5], "okStationary"),
        createBlock([89, 412, 5], "okStationary"),
        createBlock([113, 412, 5], "okStationary"),
        createBlock([137, 412, 5], "okStationary"),
        createBlock([163, 412, 5], "okStationary"),
        createBlock([189, 412, 5], "okStationary"),
        createBlock([211, 412, 5], "okStationary"),
        createBlock([235, 412, 5], "okStationary"),
        createBlock([259, 412, 5], "okStationary"),
        createBlock([283, 412, 5], "okStationary"),

        createBlock([30, 400, 12], "ok"),
        createBlock([54, 400, 12], "ok"),
        createBlock([78, 400, 12], "ok"),
        createBlock([102, 400, 12], "ok"),
        createBlock([126, 400, 12], "ok"),
        createBlock([150, 400, 12], "ok"),
        createBlock([174, 400, 12], "ok"),
        createBlock([198, 400, 12], "ok"),
        createBlock([222, 400, 12], "ok"),
        createBlock([246, 400, 12], "ok"),
        createBlock([270, 400, 12], "ok"),

        createBlock([41, 379, 12], "ok"),
        createBlock([65, 379, 12], "ok"),
        createBlock([89, 379, 12], "ok"),
        createBlock([113, 379, 12], "ok"),
        createBlock([137, 379, 12], "ok"),
        createBlock([161, 379, 12], "ok"),
        createBlock([185, 379, 12], "ok"),
        createBlock([209, 379, 12], "ok"),
        createBlock([233, 379, 12], "ok"),
        createBlock([257, 379, 12], "ok"),

        createBlock([53, 358, 12], "good"),
        createBlock([99, 358, 12], "badProtection"),
        createBlock([123, 358, 12], "badProtection"),
        createBlock([147, 358, 12], "good"),
        createBlock([171, 358, 12], "badProtection"),
        createBlock([195, 358, 12], "badProtection"),
        createBlock([243, 358, 12], "good"),

        createBlock([114, 340, 12], "badProtection"),
        createBlock([138, 340, 12], "badProtection"),
        createBlock([162, 340, 12], "badProtection"),
        createBlock([186, 340, 12], "badProtection"),

        createBlock([126, 322, 12], "badProtection"),
        createBlock([150, 322, 12], "badProtection"),
        createBlock([174, 322, 12], "badProtection"),

        createBlock([138, 304, 12], "badProtection"),
        createBlock([162, 304, 12], "badProtection"),
        createBlock([150, 282, 12], "badProtection"),
      ],
      title: "Too Many Balls",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([60, 300, 10, 150], "okStationary", { rotation: 10 }),
        createBlock([30, 350, SQUARE_SIZE / 2], "badProtection", {
          direction: "right",
        }),
        createBlock([90, 355, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([30, 320, 10, 10], "okStationary"),
        Bodies.circle(50, 375, 2, {
          isStatic: true,
          render: { visible: false },
        }),
        createBlock([120, 100, SQUARE_SIZE, 10], "okStationary"),
        createBlock([120, 75, SQUARE_SIZE, SQUARE_SIZE], "ok"),

        createBlock([240, 200, 10, 150], "okStationary", { rotation: 10 }),
        createBlock([270, 150, SQUARE_SIZE / 2], "badProtection", {
          direction: "left",
        }),
        createBlock([210, 145, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([270, 180, 10, 10], "okStationary"),
        Bodies.circle(250, 125, 2, {
          isStatic: true,
          render: { visible: false },
        }),
        createBlock([180, 400, SQUARE_SIZE, 10], "okStationary"),
        createBlock([180, 425, SQUARE_SIZE, SQUARE_SIZE], "ok", {
          direction: "up",
        }),
      ],
      title: "Directors",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 200, SQUARE_SIZE], "badProtection"),
        createBlock([105, 265, SQUARE_SIZE, 80], "ok", { rotation: 35 }),
        createBlock([195, 265, SQUARE_SIZE, 80], "ok", { rotation: -35 }),
        createBlock([70, 180, 80, SQUARE_SIZE], "ok", {
          rotation: 10,
          direction: "right",
        }),
        createBlock([230, 180, 80, SQUARE_SIZE], "ok", {
          rotation: -10,
          direction: "left",
        }),
        createBlock([150, 120, SQUARE_SIZE * 2, SQUARE_SIZE * 2], "good"),

        createBlock([150, 315, 200, 10], "okStationary"),
      ],
      title: "Unstable Personality",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([0, 160, 100, 20], "ok", {
          direction: "right",
          rotation: 10,
        }),
        createBlock([60, 170, 20, 20], "okStationary", {
          direction: "right",
          rotation: 10,
        }),

        createBlock([100, 400, 100, 10], "badStationary"),
        createBlock([100, 445, 100, 80], "badProtection", { direction: "up" }),
        createBlock([100, 385, 10], "good"),
        createBlock([60, 200, 10], "badStationary"),
        createBlock([140, 200, 10], "badStationary"),

        createBlock([250, 300, 60, 10], "goodStationary", { rotation: 10 }),
        createBlock([280, 270, 10, 60], "goodStationary", { rotation: -10 }),
      ],
      title: "Timing",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 80, 170, 10], "okStationary"),
        createBlock([150, 55, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([150, 140, 170, 10], "okStationary"),
        createBlock([45, 141, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([255, 140, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),

        createBlock([150, 201, 170, 10], "okStationary"),
        createBlock([45, 200, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([255, 200, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),

        createBlock([150, 261, 170, 10], "okStationary"),
        createBlock([45, 260, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([255, 260, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),

        createBlock([150, 320, 170, 10], "okStationary"),

        createBlock([150, 380, 170, 10], "okStationary"),
        createBlock([45, 380, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([255, 380, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([150, 440, 170, 10], "okStationary"),
        createBlock([45, 440, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([255, 440, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
      ],
      title: "Train Tracks",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([150, 210, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([150, 170, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 130, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),
        createBlock([150, 90, SQUARE_SIZE, SQUARE_SIZE], "badProtection"),

        createBlock([150, 290, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([150, 330, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([150, 370, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),
        createBlock([150, 410, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "up",
        }),

        createBlock([110, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([70, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([30, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),
        createBlock([-10, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "right",
        }),

        createBlock([190, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),
        createBlock([230, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),
        createBlock([270, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),
        createBlock([310, 250, SQUARE_SIZE, SQUARE_SIZE], "badProtection", {
          direction: "left",
        }),

        createBlock([250, 120, SQUARE_SIZE, 10], "okStationary"),
        createBlock([250, 75, SQUARE_SIZE / 2], "ok"),

        createBlock([190, 290, 10], "okStationary"),
        createBlock([190, 210, 10], "okStationary"),
        createBlock([110, 290, 10], "okStationary"),
        createBlock([110, 210, 10], "okStationary"),
      ],
      title: "Swirl",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([80, 400, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([40, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),

        createBlock([220, 400, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([260, 400, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([25, 220, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([25, 180, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([110, 180, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([110, 220, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),

        createBlock([180, 220, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([220, 220, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([110, 290, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([110, 330, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),

        createBlock([220, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([260, 290, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),

        createBlock([110, 110, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([70, 110, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),

        createBlock([220, 150, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([220, 110, SQUARE_SIZE, SQUARE_SIZE], "good"),
      ],
      title: "Orderly",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([110, 130, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([150, 130, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([190, 130, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([230, 130, SQUARE_SIZE, SQUARE_SIZE], "good"),

        createBlock([110, 170, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 170, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([190, 170, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([230, 170, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),

        createBlock([30, 210, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([70, 210, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([110, 210, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 210, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([190, 210, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([230, 210, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),

        createBlock([30, 250, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([70, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([110, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([190, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([230, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([270, 250, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([30, 290, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([70, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([110, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([190, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([230, 290, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([270, 290, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([30, 330, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([70, 330, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([110, 330, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 330, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([190, 330, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([270, 330, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),

        createBlock([150, 370, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([190, 370, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([230, 370, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
        createBlock([270, 370, SQUARE_SIZE, SQUARE_SIZE], "okStationary"),
      ],
      title: "Gridlock",
      help: "",
    }),
    () => ({
      blocks: [
        createBlock([10, 250, 10, 400], "goodStationary"),
        createBlock([150, 455, 290, 10], "goodStationary"),
        createBlock([290, 225, 10, 350], "goodStationary"),

        createBlock([265, 10, SQUARE_SIZE, 100], "good"),
        createBlock([265, 250, SQUARE_SIZE, 100], "good", {
          direction: "right",
        }),

        createBlock([50, 430, SQUARE_SIZE, 10], "okStationary", {
          rotation: 45,
        }),
        createBlock([50, 300, SQUARE_SIZE, 10], "okStationary"),
        createBlock([50, 285, 10], "badProtection"),
        createBlock([50, 200, SQUARE_SIZE, 10], "okStationary"),
        createBlock([50, 185, 10], "badProtection"),
        createBlock([50, 100, SQUARE_SIZE, 10], "okStationary"),
        createBlock([50, 85, 10], "badProtection"),

        createBlock([120, 430, SQUARE_SIZE, 10], "okStationary", {
          rotation: 45,
        }),
        createBlock([120, 300, SQUARE_SIZE, 10], "okStationary"),
        createBlock([120, 285, 10], "badProtection"),
        createBlock([120, 200, SQUARE_SIZE, 10], "okStationary"),
        createBlock([120, 185, 10], "badProtection"),
        createBlock([120, 100, SQUARE_SIZE, 10], "okStationary"),
        createBlock([120, 85, 10], "badProtection"),

        createBlock([190, 430, SQUARE_SIZE, 10], "okStationary", {
          rotation: 45,
        }),
        createBlock([190, 300, SQUARE_SIZE, 10], "okStationary"),
        createBlock([190, 285, 10], "badProtection"),
        createBlock([190, 200, SQUARE_SIZE, 10], "okStationary"),
        createBlock([190, 185, 10], "badProtection"),
        createBlock([190, 100, SQUARE_SIZE, 10], "okStationary"),
        createBlock([190, 85, 10], "badProtection"),
      ],
      title: "Sliding Door",
      help: "",
    }),

    () => ({
      blocks: [
        createBlock([150, 250, SQUARE_SIZE, SQUARE_SIZE], "goodStationary"),

        createBlock([110, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([70, 250, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([30, 250, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "right",
        }),
        createBlock([30, 290, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([30, 330, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([30, 370, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([30, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([30, 210, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([30, 170, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([30, 130, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([30, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),

        createBlock([190, 250, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([230, 250, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),
        createBlock([270, 250, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "left",
        }),
        createBlock([270, 290, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([270, 330, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([270, 370, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([270, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([270, 210, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([270, 170, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([270, 130, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),
        createBlock([270, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "down",
        }),

        createBlock([150, 170, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 130, SQUARE_SIZE, SQUARE_SIZE], "bad"),
        createBlock([150, 90, SQUARE_SIZE, SQUARE_SIZE], "good"),
        createBlock([110, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([70, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([190, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),
        createBlock([230, 90, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),

        createBlock([150, 330, SQUARE_SIZE, SQUARE_SIZE], "badStationary"),
        createBlock([150, 370, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "up",
        }),
        createBlock([150, 410, SQUARE_SIZE, SQUARE_SIZE], "good", {
          direction: "up",
        }),
        createBlock([110, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([70, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "right",
        }),
        createBlock([190, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),
        createBlock([230, 410, SQUARE_SIZE, SQUARE_SIZE], "bad", {
          direction: "left",
        }),
      ],
      title: "Framed",
      help: "",
    }),
  ];

function createBlock(
  shapeParams: number[],
  type: BlockKind,
  options?: Partial<{ direction: Direction; rotation: number }>
) {
  const blockOptions = {
    isStatic: blockSettings[type].isStatic,
    render: {
      fillStyle: blockSettings[type].colour,
    },
    label: type,
    collisionFilter: {
      category: blockSettings[type].canTap ? INTERACTABLE : STATIC,
    },
    plugin: {
      direction: options?.direction ?? "down",
    },
  };
  let body;
  if (shapeParams.length === 4) {
    body = Bodies.rectangle(
      shapeParams[0],
      shapeParams[1],
      shapeParams[2],
      shapeParams[3],
      blockOptions
    );
  } else if (shapeParams.length === 3) {
    body = Bodies.circle(
      shapeParams[0],
      shapeParams[1],
      shapeParams[2],
      blockOptions
    );
    body.friction = 0.0005;
    body.frictionAir = 0.001;
  } else {
    // Has to return a block
    body = Bodies.circle(5, 5, 5);
  }

  if (options?.rotation) {
    Body.rotate(body, (options.rotation / 180) * Math.PI);
  }
  if (blockSettings[type].canTap) {
    body.plugin.onclick = () => {
      Composite.remove(engine.world, body);
    };
  }
  return body;
}
