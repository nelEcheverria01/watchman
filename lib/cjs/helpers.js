'use strict'
const { execFile } = require('node:child_process')
const { basename } = require('node:path')
const chalk = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('chalk'))

function runFile (path, ee) {
  execFile('node', [path], (_err, stdout, stderr) => {
    ee.emit('running', { stdout, stderr })
  })

  return ee
}
exports.runFile = runFile

/**
 * @param {string} watchedDir directory that is being watched port watchman
 * @param {string} filename file running by watchman
 */
function watchmanLog (watchedDir, filename) {
  console.log(chalk.redBright(`watchman is watching inside of: ${watchedDir}`))
  console.log(chalk.redBright(`watchman running: ${basename(filename)}`))
  console.log('\n')
}
exports.watchmanLog = watchmanLog
