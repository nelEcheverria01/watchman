import { watch, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { EventEmitter } from 'node:events'
import { runFile, watchmanLog } from './helpers.js'

export const ee = new EventEmitter()

// TODO: implement logs app (watchman)
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
    console.log('watchman 🕵️‍♂️')
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
