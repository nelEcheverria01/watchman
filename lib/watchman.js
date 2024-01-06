import watcher from './watcher.js'
import { watchmanLog } from './helpers.js'

export default function watchman (filename, options) {
  try {
    watcher(filename, options).on('watching', ({ watchedDir, runningFile }) => watchmanLog(watchedDir, runningFile))
  } catch (err) {
    console.log('watchman has an error:', err.message)
  }
}
