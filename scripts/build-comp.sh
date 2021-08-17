###
 # @Author: jvb
 # @LastEditors: jvb
 # @email: tusktalk@163.com
 # @github: https://github.com/tusktalk
 # @Date: 2021-08-17 14:27:25
 # @LastEditTime: 2021-08-17 14:27:55
 # @motto: Hi Virtual Mode
 # @Description: Modify here please
 # @FilePath: \Development\UI\joint-ui-icons\scripts\build-comp.sh
### 
#! /usr/bin/bash

# finding all file under `packages/components`
# piping to rollup to config.
echo "build components"
find src/components -type f -name '*.vue' -print0 | \
xargs -P4 -0 -I {} node configs/rollup.comp.js {}

yarn build:entry
# after components build finished, build icon.ts as well.
echo "generate type files"
yarn gen-dts