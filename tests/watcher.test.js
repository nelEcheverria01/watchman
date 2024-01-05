import { describe, it, before, after } from 'node:test'
import assert from 'node:assert/strict'
import watcher from '../lib/watcher.js'
import { writeFile, unlink } from 'node:fs/promises'

const sampleFile = { filename: 'index.js', content: 'console.log(\'hello from index.js\')', dir: './' }
const expected = { filename: sampleFile.filename, dir: sampleFile.dir }

describe('watcher', _ => {
  describe('listening to \'watching\' event', _ => {
    before(async _ => {
      await writeFile(sampleFile.filename, sampleFile.content)
    })

    after(async _ => {
      await unlink(sampleFile.filename)

      // explicitly exit the process, to complete
      // the test since the watcher remains actively running
      setImmediate(_ => process.exit())
    })

    it(`should return an object, with the properties "watchedDir" and
        "runningFile", which should match the file passed by parameter`, _ => {
      watcher(sampleFile.filename).on('watching', ({ watchedDir, runningFile }) => {
        assert.equal(watchedDir, expected.dir)
        assert.equal(runningFile, expected.filename)
      })
    })
  })

  describe('watching a nonexistent file', _ => {
    it('should return an error, with a message similar to \'<filename> does not exist\'', _ => {
      assert.throws(_ => watcher('blablabla.js'), /^Error: blablabla.js does not exists$/)
    })
  })
})
