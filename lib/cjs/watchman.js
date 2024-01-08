'use strict'
const watcher = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./watcher.js'))
const { watchmanLog } = require('./helpers.js')
const chalk = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('chalk'))

function watchman (filename, options) {
  try {
    watcher(filename, options)
      .on('watching', ({ watchedDir, runningFile }) => watchmanLog(watchedDir, runningFile))
  } catch ({ message }) {
    console.log(chalk.yellowBright(`watchman has an error: ${message}`))
  }
}
Object.defineProperty(exports, '__esModule', { value: true }).default = watchman
