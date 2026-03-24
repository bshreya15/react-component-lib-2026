import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import packageJson from "./package.json" with { type: "json" };

const sharedPlugins = (declarationOptions = {}) => [
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    skip: ["react", "react-dom"],
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json",
    exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
    ...declarationOptions,
  }),
  postcss({ extensions: [".css"], inject: true, extract: false }),
];

export default [
  // CJS build — declarations disabled to avoid declarationDir path conflict
  {
    input: "src/index.ts",
    output: { file: packageJson.main, format: "cjs", sourcemap: true },
    plugins: sharedPlugins({ declaration: false, declarationMap: false }),
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  // ESM build — declarations emitted to dist/esm/types
  {
    input: "src/index.ts",
    output: { file: packageJson.module, format: "esm", sourcemap: true },
    plugins: sharedPlugins({ declarationDir: "dist/esm/types" }),
    external: ["react", "react-dom", "react/jsx-runtime"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];