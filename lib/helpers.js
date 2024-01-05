import { execFile } from 'node:child_process'

export function runFile (path, ee) {
  execFile('node', [path], (_err, stdout, stderr) => {
    ee.emit('running', { stdout, stderr })
  })

  return ee
}
