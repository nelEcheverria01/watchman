import { watch, existsSync } from 'node:fs'
import { resolve, dirname, relative } from 'node:path'
import { EventEmitter } from 'node:events'
import { execFile } from 'node:child_process'

const ee = new EventEmitter()

function runFile (path) {
  execFile('node', [path], (_err, stdout, stderr) => {
    ee.emit('running', { stdout, stderr })
  })

  return ee
}

function watcher (filename) {
  const path = resolve(filename)
  if (!existsSync(path)) throw new Error(`${filename} does not exists`)

  const dir = dirname(path)

  // runFile() function callback
  const cb = ({ stdout, stderr }) => {
    console.log(stdout || stderr)
    ee.removeAllListeners('running')
  }

  runFile(path).once('running', cb)

  watch(dir, (eventType, filename) => {
    if (eventType === 'change') {
      const watchedDir = relative(process.cwd(), dir) || './'
      const runningFile = filename

      runFile(path).on('running', cb)

      ee.emit('watching', { watchedDir, runningFile })
    }
  })

  return ee
}

export default watcher
