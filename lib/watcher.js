import { watch, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { EventEmitter } from 'node:events'
import { runFile, watchmanLog } from './helpers.js'
import chalk from 'chalk'

/* eslint-disable camelcase */
import ascii_title from './ascii-title.js'

export const ee = new EventEmitter()

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

export default watcher
