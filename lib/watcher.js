import { watch, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { EventEmitter } from 'node:events'
import { runFile } from './helpers.js'

export const ee = new EventEmitter()

function watcher (filename) {
  const path = resolve(filename)
  if (!existsSync(path)) throw new Error(`${filename} does not exists`)

  const dir = dirname(path)

  // runFile() function callback
  const cb = ({ stdout, stderr }) => {
    console.log(stdout || stderr)
    ee.removeAllListeners('running')
  }

  runFile(path, ee).once('running', cb)

  watch(dir, (eventType, filename) => {
    if (eventType === 'change') {
      const watchedDir = relative(process.cwd(), dir) || './'
      const runningFile = filename

      runFile(path, ee).on('running', cb)

      ee.emit('watching', { watchedDir, runningFile })
    }
  })

  return ee
}

export default watcher
