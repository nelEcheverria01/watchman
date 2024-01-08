'use strict'
const { watch, existsSync } = require('node:fs')
const { resolve, dirname, relative } = require('node:path')
const { EventEmitter } = require('node:events')
const { runFile, watchmanLog } = require('./helpers.js')
const chalk = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('chalk'))

/* eslint-disable camelcase */
const ascii_title = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('./ascii-title.js'))

const ee = new EventEmitter()
exports.ee = ee

function watcher (filename, options = { enableWatchmanLogs: true }) {
  const path = resolve(filename)
  if (!existsSync(path)) throw new Error(`${filename} does not exists`)

  const dir = dirname(path)
  const watchedDir = relative(process.cwd(), dir) ? relative(process.cwd(), dir) + '/' : '.'

  // runFile() function callback
  const cb = ({ stdout, stderr }) => {
    console.log(stdout || stderr)
    ee.removeAllListeners('running')
  }

  if (options.enableWatchmanLogs) {
    console.clear()
    console.log(chalk.cyanBright(ascii_title))
    watchmanLog(watchedDir, filename)
  }

  runFile(path, ee).once('running', cb)

  watch(dir, (eventType, filename) => {
    if (eventType === 'change') {
      runFile(path, ee).on('running', cb)
      ee.emit('watching', { watchedDir, runningFile: filename })
    }
  })

  return ee
}

Object.defineProperty(exports, '__esModule', { value: true }).default = watcher
