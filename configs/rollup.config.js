/*
 * @Author: jvb
 * @LastEditors: jvb
 * @email: tusktalk@163.com
 * @github: https://github.com/tusktalk
 * @Date: 2021-08-17 14:31:14
 * @LastEditTime: 2021-08-17 14:31:24
 * @motto: Hi Virtual Mode
 * @Description: Modify here please
 * @FilePath: \Development\UI\joint-ui-icons\configs\rollup.config.js
 */
const path = require("path");
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const esbuild = require("rollup-plugin-esbuild");

const root = path.resolve(__dirname, "..");
const replacePath = (p) => {
  return ['./', p.replace('.vue', '.js').split('/').pop()].join('')
}

module.exports = {
  input: path.resolve(__dirname, '../src/components/index.ts'),
  output: [{
    file: path.resolve(root, "./es/index.js"),
    format: "esm",
    name: "icons",
    sourcemap: false,
    paths: replacePath,
  }, {
    file: path.resolve(root, "./lib/index.js"),
    format: "cjs",
    exports: "named",
    sourcemap: false,
    paths: replacePath,
  }],
  plugins: [
    nodeResolve(),
    esbuild({
      // target: "browser",
    }),
  ],
  external(id) {
    return /\.vue$/.test(id)
  }
}