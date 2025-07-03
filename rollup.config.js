import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    external: ["matter-js"],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      terser(),
    ],
    output: {
      file: "dist/shape-fall.umd.min.js",
      format: "umd",
      name: "ShapeFall",
      globals: {
        "matter-js": "Matter",
      },
    },
  },
];
