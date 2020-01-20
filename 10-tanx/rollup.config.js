import typescript from "rollup-plugin-typescript2"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import sourceMaps from "rollup-plugin-sourcemaps"

export default {
  input: "src/sketch.ts",
  output: {
    name: "bundle",
    file: "build/sketch.js",
    format: "iife",
    sourcemaps: true,
  },
  plugins: [
    typescript({
      objectHashIgnoreUnknownHack: true
    }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
};
