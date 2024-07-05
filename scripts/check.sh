#!/bin/bash

echo "🙌 Hi! Let's check your setup…"

if [[ "$OSTYPE" == "win32" ]];
then
    echo "🚩 Looks like you are using Windows. WSL and with Ubuntu image are required then."
fi

echo "Checking NVM and Node version…"

# load and verify nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

nvm -v &> /dev/null
if [ $? == 0 ];
then
    echo "✅ Nvm is installed";
else
    echo "🚩 Need to nvm to manage Node versions — https://github.com/nvm-sh/nvm"
    echo "👷 Installing nvm…"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

node_version=$(cat .nvmrc)

if [[ $(node -v) == $node_version ]];
then
    echo "✅ Node version is correct: $node_version";
else
    echo "👷 Setting correct Node version with nvm…"
    nvm use
    echo "Done!"
fi

# echo "👷 Enabling corepack for node/yarn integration (resolves some issues)"
# corepack enable

# Extract the yarn version from .yarnrc.yml
yarn_version=$(grep "yarnPath" .yarnrc.yml | awk -F'-' '{print $2}' | awk -F'.' '{print $1"."$2"."$3}')

# Compare with the desired version
current_version=$(yarn -v)
if [ "$current_version" != "$yarn_version" ]; then
    echo "Current yarn version is $current_version"
    echo "🚩 Yarn version is different from $yarn_version"
    echo "👷 Getting Yarn $yarn_version…"
    npm install -g yarn
    mkdir -p .yarn/releases
    curl https://raw.githubusercontent.com/yarnpkg/berry/%40yarnpkg/cli/$yarn_version/packages/yarnpkg-cli/bin/yarn.js > .yarn/releases/yarn-$yarn_version.cjs
else
    echo "✅ Yarn version is correct: $yarn_version"
fi