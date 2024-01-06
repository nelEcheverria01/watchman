import { execFile } from 'node:child_process'
import { basename } from 'node:path'
import chalk from 'chalk'

export function runFile (path, ee) {
  execFile('node', [path], (_err, stdout, stderr) => {
    ee.emit('running', { stdout, stderr })
  })

  return ee
}

/**
 * @param {string} watchedDir directory that is being watched port watchman
 * @param {string} filename file running by watchman
 */
export function watchmanLog (watchedDir, filename) {
  console.log(chalk.redBright(`watchman is watching inside of: ${watchedDir}`))
  console.log(chalk.redBright(`watchman running: ${basename(filename)}`))
  console.log('\n')
}
