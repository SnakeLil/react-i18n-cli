#!/usr/bin/env node
const semver = require('semver')
const packageJson = require('../package.json')

const getChalk = async () => {
  const chalkModule = await import('chalk');
  return chalkModule.default;
}

checkNodeVersion()
process.env.PACKAGE_NAME = packageJson.name
process.env.PACKAGE_VERSION = packageJson.version
require('../dist/index')

async function checkNodeVersion() {
  const chalk = await getChalk();
  if (!semver.satisfies(process.version, packageJson.engines.node, { includePrerelease: true })) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          packageJson.name +
          ' requires Node ' +
          packageJson.engines.node +
          '.\nPlease upgrade your Node version.'
      )
    )
    process.exit(1)
  }
}
