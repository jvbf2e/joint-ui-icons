/*
 * @Author: jvb
 * @LastEditors: jvb
 * @email: tusktalk@163.com
 * @github: https://github.com/tusktalk
 * @Date: 2021-08-17 14:30:52
 * @LastEditTime: 2021-08-17 14:31:05
 * @motto: Hi Virtual Mode
 * @Description: Modify here please
 * @FilePath: \Development\UI\joint-ui-icons\configs\rollup.comp.js
 */
const path = require("path");
const rollup = require("rollup");
const esbuild = require("rollup-plugin-esbuild");
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const vue = require('rollup-plugin-vue')

const p = process.argv[2]; // node this.js compName
const exportName = `${p.split("/").pop().split(".").shift()}.js`;

const root = path.resolve(__dirname, "..");

const esm = {
  file: path.resolve(root, "es", exportName),
  format: "esm",
  sourcemap: false,
};

const cjs = {
  file: path.resolve(root, "lib", exportName),
  format: "cjs",
  exports: "named",
  sourcemap: false,
};

const rollupConfig = {
  input: path.resolve(root, p),
  plugins: [
    nodeResolve(),
    vue(),
    esbuild({
      // target: "browser",
    }),
  ],
  external: ["vue"],
}

rollup
  .rollup(rollupConfig)
  .then(async (bundle) => {
    await Promise.all([bundle.write(esm), bundle.write(cjs)]);
    console.log(" \u001b[32m", exportName, "done");
  });