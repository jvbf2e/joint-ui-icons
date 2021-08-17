###
 # @Author: jvb
 # @LastEditors: jvb
 # @email: tusktalk@163.com
 # @github: https://github.com/tusktalk
 # @Date: 2021-08-17 14:26:39
 # @LastEditTime: 2021-08-17 14:27:16
 # @motto: Hi Virtual Mode
 # @Description: Modify here please
 # @FilePath: \Development\UI\joint-ui-icons\scripts\publish.sh
### 
#! /usr/bin/bash

# Do not run this file without setting the environment variables, you will end up fatal error
# If you wish to run this locally, please change the env variable before running this.
# do clean job before build started
rm -rf build
# build full bundle.
node configs/rollup.js
# build individual component
sh scripts/build-comp.sh
# rule out version field from `package.json`
# replace with `env.TAG_VERSION` from Github Action
cat package.json | grep -v '"version":' | sed "s/\(\"name\": \"@joint-ui\/icons\"\)/\1,\n  \"version\": \"${TAG_VERSION}\"/g" > build/package.json
# Publish
npm publish "./build" --registry ${REGISTRY}