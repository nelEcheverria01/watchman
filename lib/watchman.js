import watcher from './watcher.js'
import { watchmanLog } from './helpers.js'
import chalk from 'chalk'

export default function watchman (filename, options) {
  try {
    watcher(filename, options)
      .on('watching', ({ watchedDir, runningFile }) => watchmanLog(watchedDir, runningFile))
  } catch ({ message }) {
    console.log(chalk.yellowBright(`watchman has an error: ${message}`))
  }
}
